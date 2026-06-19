import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM ?? "noreply@checkmat.fujiextech.com"
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL ?? "info@checkmatbrentwood.com"

interface BookingData {
  name: string
  email: string
  phone: string
  program: string
  day: string
  time: string
  date?: string
}

export async function sendBookingEmails(data: BookingData) {
  const { name, email, phone, program, day, time, date } = data

  // Data completa quando disponível (ex: "Monday, Jun 22, 2026"); senão, o dia da semana
  const dateLabel = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" })
    : day

  await Promise.allSettled([
    resend.emails.send({
      from: `Checkmat Brentwood <${FROM}>`,
      to: email,
      subject: "Your Free Trial Class is Confirmed! 🥋",
      html: confirmationEmail({ name, program, dateLabel, time }),
    }),
    resend.emails.send({
      from: `Checkmat Booking <${FROM}>`,
      to: ADMIN_EMAIL,
      subject: `New Trial Class Booking — ${name}`,
      html: notificationEmail({ name, email, phone, program, dateLabel, time }),
    }),
  ])
}

function confirmationEmail({ name, program, dateLabel, time }: { name: string; program: string; dateLabel: string; time: string }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;">
        <tr>
          <td style="background:#C8102E;padding:32px;text-align:center;">
            <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:bold;">CHECKMAT BRENTWOOD</h1>
            <p style="color:#ffffff;margin:8px 0 0;font-size:14px;opacity:0.9;">Brazilian Jiu-Jitsu</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px 32px;">
            <h2 style="color:#111111;margin:0 0 8px;font-size:22px;">You're all set, ${name}!</h2>
            <p style="color:#555555;margin:0 0 32px;font-size:16px;">Your free trial class has been confirmed. We can't wait to see you on the mat!</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;border-radius:8px;padding:24px;margin-bottom:32px;">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #eeeeee;">
                  <span style="color:#888888;font-size:13px;">Program</span><br>
                  <strong style="color:#111111;font-size:16px;">${program}</strong>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #eeeeee;">
                  <span style="color:#888888;font-size:13px;">Date</span><br>
                  <strong style="color:#111111;font-size:16px;">${dateLabel}</strong>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #eeeeee;">
                  <span style="color:#888888;font-size:13px;">Time</span><br>
                  <strong style="color:#111111;font-size:16px;">${time}</strong>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;">
                  <span style="color:#888888;font-size:13px;">Location</span><br>
                  <strong style="color:#111111;font-size:16px;">640 Harvest Park Drive, Brentwood, CA 94513</strong>
                </td>
              </tr>
            </table>

            <h3 style="color:#111111;margin:0 0 12px;font-size:16px;">What to bring</h3>
            <ul style="color:#555555;font-size:15px;padding-left:20px;margin:0 0 32px;">
              <li style="margin-bottom:6px;">Comfortable workout clothes (shorts + t-shirt)</li>
              <li style="margin-bottom:6px;">Water bottle</li>
              <li>Clean, bare feet or flip-flops for the mat</li>
            </ul>

            <p style="color:#555555;font-size:15px;margin:0 0 8px;">Questions? Call or text us:</p>
            <p style="margin:0;"><a href="tel:+19253380614" style="color:#C8102E;font-size:16px;font-weight:bold;text-decoration:none;">+1 (925) 338-0614</a></p>
          </td>
        </tr>
        <tr>
          <td style="background:#111111;padding:24px 32px;text-align:center;">
            <p style="color:#888888;font-size:13px;margin:0;">Checkmat Brentwood · 640 Harvest Park Drive, Brentwood, CA 94513</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim()
}

function notificationEmail({ name, email, phone, program, dateLabel, time }: { name: string; email: string; phone: string; program: string; dateLabel: string; time: string }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;">
        <tr>
          <td style="background:#111111;padding:24px 32px;">
            <h1 style="color:#ffffff;margin:0;font-size:18px;">New Trial Class Booking</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr><td style="padding:10px 0;border-bottom:1px solid #eeeeee;"><span style="color:#888888;font-size:13px;">Name</span><br><strong style="color:#111111;">${name}</strong></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eeeeee;"><span style="color:#888888;font-size:13px;">Email</span><br><a href="mailto:${email}" style="color:#C8102E;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eeeeee;"><span style="color:#888888;font-size:13px;">Phone</span><br><strong style="color:#111111;">${phone || "—"}</strong></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eeeeee;"><span style="color:#888888;font-size:13px;">Program</span><br><strong style="color:#111111;">${program}</strong></td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #eeeeee;"><span style="color:#888888;font-size:13px;">Date</span><br><strong style="color:#111111;">${dateLabel}</strong></td></tr>
              <tr><td style="padding:10px 0;"><span style="color:#888888;font-size:13px;">Time</span><br><strong style="color:#111111;">${time}</strong></td></tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
  `.trim()
}
