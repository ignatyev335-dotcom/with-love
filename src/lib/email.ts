/**
 * Transactional email helpers (Resend-ready).
 * Currently logs to console in demo mode.
 */

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail(payload: EmailPayload): Promise<{ ok: boolean }> {
  if (process.env.RESEND_API_KEY) {
    // Production: await fetch("https://api.resend.com/emails", ...)
    // left as stub until key is configured
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[email:demo]", payload.to, payload.subject);
  }

  return { ok: true };
}

export function rsvpConfirmationEmail(opts: {
  guestName: string;
  coupleNames: string;
  status: string;
  date: string;
}) {
  return {
    subject: `RSVP · ${opts.coupleNames}`,
    html: `
      <div style="font-family: Georgia, serif; color: #282B2B; max-width: 480px;">
        <h1 style="color: #F76E62;">With Love</h1>
        <p>Здравствуйте, ${opts.guestName}!</p>
        <p>Ваш ответ на приглашение <strong>${opts.coupleNames}</strong> получен.</p>
        <p>Статус: <strong>${opts.status}</strong></p>
        <p>Дата: ${opts.date}</p>
        <p style="color:#8a8580;font-size:13px;">До встречи на празднике ❤️</p>
      </div>
    `,
  };
}

export function organizerNewRsvpEmail(opts: {
  organizerEmail: string;
  guestName: string;
  status: string;
}) {
  return {
    to: opts.organizerEmail,
    subject: `Новый RSVP: ${opts.guestName}`,
    html: `
      <div style="font-family: system-ui, sans-serif; color: #282B2B;">
        <p>Гость <strong>${opts.guestName}</strong> ответил: <strong>${opts.status}</strong>.</p>
        <p><a href="/dashboard/guests">Открыть список гостей</a></p>
      </div>
    `,
  };
}
