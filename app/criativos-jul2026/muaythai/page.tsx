import Link from "next/link"
import type { Metadata } from "next"
import s from "../roteiro.module.css"

export const metadata: Metadata = {
  title: "Roteiro Muay Thai — Checkmat Brentwood",
}

export default function MuayThaiPage() {
  return (
    <div className={s.wrap}>
      <header className={s.header}>
        <div className={`${s.col} ${s.fade}`}>
          <Link href="/criativos-jul2026" className={s.backLink}>
            ← Todos os criativos
          </Link>
          <p className={s.eyebrow}>Checkmat Brentwood · Roteiro de criativo</p>
          <h1 className={s.h1}>
            Muay Thai
            <span className={s.sub}>Criativo 1 · Adultos · pronto pra gravar</span>
          </h1>
          <p className={s.lede}>
            Três tomadas curtas, cerca de 28 segundos. Grava cada uma separada e a gente monta.
          </p>
          <div className={s.chips}>
            <span className={s.chip}>Vertical 9:16</span>
            <span className={s.chip}>~28 segundos</span>
            <span className={s.chip}>Selfie + b-roll</span>
            <span className={s.chip}>Voz do Thiago</span>
          </div>
        </div>
      </header>

      <div className={s.col}>
        <div className={s.note}>
          Grava olhando <b>direto na lente</b>, com energia alta. Pode repetir cada tomada{" "}
          <b>2 ou 3 vezes</b> que a gente escolhe a melhor.
          <div className={s.legend}>
            <span>
              <i className={`${s.dot} ${s.dotSay}`} /> Vermelho = o que você <b>fala</b> (em
              inglês)
            </span>
            <span>
              <i className={`${s.dot} ${s.dotDo}`} /> Cinza = direção, não fala
            </span>
          </div>
        </div>

        {/* TAKES */}
        <section className={s.section}>
          <div className={s.secHead}>
            <h2>As 3 tomadas</h2>
            <span className={s.rule} />
          </div>
          <div className={s.takes}>
            <article className={s.take}>
              <div className={s.takeTop}>
                <span className={s.takeNo}>TAKE 1</span>
                <span className={s.takeRole}>Gancho + oferta · parado, tatame ao fundo</span>
              </div>
              <div className={s.takeBody}>
                <div className={s.variant}>
                  <span className={s.variantTag}>Versão A · gancho direto</span>
                  <p className={s.sayLabel}>Fala isso</p>
                  <p className={s.say}>
                    “Attention, Brentwood! Wanna learn real Muay Thai and get in the best shape of
                    your life? Your first class here at Checkmat Brentwood is{" "}
                    <span className={s.free}>completely free</span>. No credit card, and we give
                    you all the gear.”
                  </p>
                </div>
                <div className={s.variant}>
                  <span className={`${s.variantTag} ${s.variantTagB}`}>
                    Versão B · gancho de desejo (pra testar)
                  </span>
                  <p className={s.sayLabel}>Fala isso</p>
                  <p className={s.say}>
                    “This is your sign to finally start Muay Thai. Your first class at Checkmat
                    Brentwood is <span className={s.free}>completely free</span>. No credit card,
                    and we give you all the gear.”
                  </p>
                </div>
                <p className={s.doNote}>
                  <b>Direção:</b> começa já no gancho, sem “oi, tudo bem”. Os 3 primeiros segundos
                  decidem tudo.
                </p>
              </div>
            </article>

            <article className={s.take}>
              <div className={s.takeTop}>
                <span className={s.takeNo}>TAKE 2</span>
                <span className={s.takeRole}>
                  Tira o medo do iniciante · pode andar pela academia
                </span>
              </div>
              <div className={s.takeBody}>
                <p className={s.sayLabel}>Fala isso</p>
                <p className={s.say}>
                  “Never trained before? Perfect. That&apos;s exactly who this is for. You&apos;ll
                  learn real striking, burn stress, and build confidence, in a safe and
                  professional environment. No hard sparring, no pressure.”
                </p>
                <p className={s.doNote}>
                  <b>Direção:</b> tom mais próximo, como quem tranquiliza. Mostra o ambiente
                  enquanto fala.
                </p>
              </div>
            </article>

            <article className={s.take}>
              <div className={s.takeTop}>
                <span className={s.takeNo}>TAKE 3</span>
                <span className={s.takeRole}>
                  Autoridade + chamada · close, aponta pra baixo no fim
                </span>
              </div>
              <div className={s.takeBody}>
                <p className={s.sayLabel}>Fala isso</p>
                <p className={s.say}>
                  “I&apos;m Thiago Gaia, black belt champion and pro MMA fighter, and I&apos;ll be
                  right there on the mat with you. Tap ‘Learn More’, book your{" "}
                  <span className={s.free}>free class</span>, and start this week. Let&apos;s go,
                  Brentwood!”
                </p>
                <p className={s.doNote}>
                  <b>Direção:</b> olha firme na lente, sorriso no final e aponta pra baixo (onde
                  fica o botão).
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* TIMELINE */}
        <section className={s.section}>
          <div className={s.secHead}>
            <h2>Como fica montado</h2>
            <span className={s.rule} />
          </div>
          <div className={s.tlScroll}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Tempo</th>
                  <th>Imagem</th>
                  <th>Fala</th>
                  <th>Texto na tela</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={s.tc}>0–3s</td>
                  <td className={s.k}>Close, energia alta</td>
                  <td>T1 · gancho</td>
                  <td className={s.ost}>BRENTWOOD</td>
                </tr>
                <tr>
                  <td className={s.tc}>3–8s</td>
                  <td className={s.k}>Thiago + tatame</td>
                  <td>T1 · oferta</td>
                  <td className={s.ost}>1ª aula FREE · No credit card · Free gear</td>
                </tr>
                <tr>
                  <td className={s.tc}>8–16s</td>
                  <td className={s.k}>B-roll de treino</td>
                  <td>T2</td>
                  <td className={s.ost}>No experience needed</td>
                </tr>
                <tr>
                  <td className={s.tc}>16–20s</td>
                  <td className={s.k}>Thiago falando</td>
                  <td>T2 · final</td>
                  <td className={s.ost}>Safe · No pressure</td>
                </tr>
                <tr>
                  <td className={s.tc}>20–25s</td>
                  <td className={s.k}>Close Thiago</td>
                  <td>T3</td>
                  <td className={s.ost}>Black Belt Champion · Pro MMA</td>
                </tr>
                <tr>
                  <td className={s.tc}>25–28s</td>
                  <td className={s.k}>Aponta pra baixo</td>
                  <td>T3 · CTA</td>
                  <td className={s.ost}>BOOK YOUR FREE CLASS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CHECKLIST + TIPS */}
        <section className={s.section}>
          <div className={s.secHead}>
            <h2>Pra gravar junto</h2>
            <span className={s.rule} />
          </div>
          <div className={s.grid2}>
            <div className={s.panel}>
              <h3>B-roll (10 a 15s soltos)</h3>
              <ul className={s.list}>
                <li>
                  Impacto no aparador ou no saco <small>o som do golpe fica ótimo</small>
                </li>
                <li>Dupla no clinch ou chute com foco</li>
                <li>
                  Um iniciante sorrindo durante o treino{" "}
                  <small>mostra que o ambiente é acolhedor</small>
                </li>
                <li>Plano geral da academia com movimento</li>
              </ul>
            </div>
            <div className={s.panel}>
              <h3>Dicas rápidas</h3>
              <ul className={`${s.list} ${s.listTips}`}>
                <li>Os 3 primeiros segundos seguram ou perdem a pessoa</li>
                <li>Fala rápido e animado, como se chamasse um amigo pra treinar</li>
                <li>Grava de dia ou com boa luz, lapela se tiver</li>
                <li>Olha na lente, não na telinha do celular</li>
                <li>Legenda grande na tela a gente adiciona na edição</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className={s.footer}>
          <span>Checkmat Brentwood · Fujiex Tech Performance</span>
          <span>Criativo 1 · Muay Thai</span>
        </footer>
      </div>
    </div>
  )
}
