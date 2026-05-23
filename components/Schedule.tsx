"use client"

import { useState } from "react"
import { siteConfig } from "@/config/site"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown } from "lucide-react"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function getTodayName(): string {
  return DAYS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]
}

type ScheduleEntry = { day: string; times: string[] }

function ScheduleGrid({ entries }: { entries: ScheduleEntry[] }) {
  const today = getTodayName()
  const [openDay, setOpenDay] = useState<string>(today)

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-950 text-white">
              {entries.map((e) => (
                <th
                  key={e.day}
                  className={`px-4 py-3 font-semibold text-center ${e.day === today ? "text-[#C8102E]" : ""}`}
                >
                  {e.day}
                  {e.day === today && <span className="ml-1 text-xs">(today)</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {entries.map((e) => (
                <td
                  key={e.day}
                  className={`px-4 py-4 align-top text-center border-t border-gray-100 ${
                    e.day === today ? "bg-[#C8102E]/5" : ""
                  }`}
                >
                  {e.times.length === 0 ? (
                    <span className="text-gray-300">—</span>
                  ) : (
                    <div className="flex flex-col gap-1">
                      {e.times.map((t) => (
                        <span
                          key={t}
                          className="inline-block bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile accordion */}
      <div className="md:hidden divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {entries.map((e) => (
          <div key={e.day}>
            <button
              className={`w-full flex items-center justify-between px-4 py-4 font-semibold text-left transition-colors ${
                e.day === today ? "bg-[#C8102E]/5 text-[#C8102E]" : "bg-white text-gray-900"
              }`}
              onClick={() => setOpenDay(openDay === e.day ? "" : e.day)}
              aria-expanded={openDay === e.day}
            >
              <span>
                {e.day}
                {e.day === today && <span className="ml-2 text-xs font-normal">(today)</span>}
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${openDay === e.day ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {openDay === e.day && (
              <div className="px-4 pb-4 bg-gray-50 flex flex-wrap gap-2">
                {e.times.length === 0 ? (
                  <span className="text-sm text-gray-400">No classes today</span>
                ) : (
                  e.times.map((t) => (
                    <span
                      key={t}
                      className="inline-block bg-gray-900 text-white text-sm font-bold px-3 py-1.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export function Schedule() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-black mb-4">
          Class Schedule
        </h2>
        <p className="text-center text-gray-500 text-lg mb-10 max-w-xl mx-auto">
          Classes run six days a week. Find a time that works for you.
        </p>

        <Tabs defaultValue="adults">
          <TabsList className="mx-auto flex w-fit mb-8 bg-gray-200 rounded-xl p-1">
            <TabsTrigger value="adults" className="rounded-lg px-6 py-2 font-semibold">Adults</TabsTrigger>
            <TabsTrigger value="kids" className="rounded-lg px-6 py-2 font-semibold">Kids</TabsTrigger>
            <TabsTrigger value="openmat" className="rounded-lg px-6 py-2 font-semibold">Open Mat</TabsTrigger>
          </TabsList>

          <TabsContent value="adults">
            <ScheduleGrid entries={siteConfig.schedule.adults} />
          </TabsContent>
          <TabsContent value="kids">
            <ScheduleGrid entries={siteConfig.schedule.kids} />
          </TabsContent>
          <TabsContent value="openmat">
            <ScheduleGrid entries={siteConfig.schedule.openMat} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
