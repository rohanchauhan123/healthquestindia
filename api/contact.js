const nodemailer = require("nodemailer");

// Vercel Serverless Function — POST /api/contact
module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, country, phone, treatment, message } = req.body || {};

  // Validation
  if (!name || !phone || !treatment) {
    return res.status(400).json({
      error: "Name, phone number, and treatment are required.",
    });
  }

  // ── Email ──────────────────────────────────────────────
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const notifyEmail = process.env.NOTIFY_EMAIL || smtpUser;

  if (!smtpUser || !smtpPass) {
    // SMTP not configured yet — still return success to user
    console.warn("⚠️  SMTP not configured. Lead received but email not sent.");
    console.log("📩 Lead:", { name, country, phone, treatment, message });
    return res.status(200).json({
      success: true,
      message: "Request received! We will contact you within 24 hours.",
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0e3761;padding:24px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0">🏥 New Patient Enquiry</h2>
        <p style="color:#b8962a;margin:4px 0 0">HealthQuest India</p>
      </div>
      <div style="background:#f8f9fb;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb">
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:10px 14px;background:#fff;border:1px solid #e5e7eb;font-weight:bold;color:#374151;width:35%">Full Name</td>
            <td style="padding:10px 14px;background:#fff;border:1px solid #e5e7eb;color:#111827">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:bold;color:#374151">Country</td>
            <td style="padding:10px 14px;background:#f9fafb;border:1px solid #e5e7eb;color:#111827">${country || "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;background:#fff;border:1px solid #e5e7eb;font-weight:bold;color:#374151">Phone / WhatsApp</td>
            <td style="padding:10px 14px;background:#fff;border:1px solid #e5e7eb">
              <a href="tel:${phone}" style="color:#0e3761;font-weight:bold">${phone}</a>
              &nbsp;|&nbsp;
              <a href="https://wa.me/${phone.replace(/\D/g,"")}" style="color:#25D366;font-weight:bold">Open WhatsApp</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 14px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:bold;color:#374151">Treatment Needed</td>
            <td style="padding:10px 14px;background:#f9fafb;border:1px solid #e5e7eb;color:#b8962a;font-weight:bold;text-transform:capitalize">${treatment.replace(/-/g," ")}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;background:#fff;border:1px solid #e5e7eb;font-weight:bold;color:#374151">Message</td>
            <td style="padding:10px 14px;background:#fff;border:1px solid #e5e7eb;color:#111827">${message || "—"}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;background:#f9fafb;border:1px solid #e5e7eb;font-weight:bold;color:#374151">Submitted At</td>
            <td style="padding:10px 14px;background:#f9fafb;border:1px solid #e5e7eb;color:#6b7280">${submittedAt} IST</td>
          </tr>
        </table>

        <div style="margin-top:20px;padding:16px;background:#fff3cd;border:1px solid #ffc107;border-radius:8px">
          <p style="margin:0;font-size:14px;color:#856404">
            <strong>⚡ Action required:</strong> Contact ${name} within 24 hours at 
            <a href="tel:${phone}" style="color:#0e3761">${phone}</a>
          </p>
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"HealthQuest India Website" <${smtpUser}>`,
      to: notifyEmail,
      subject: `🏥 New Lead: ${name} — ${treatment.replace(/-/g," ")} (${country || "Unknown"})`,
      html,
      replyTo: phone.includes("@") ? phone : undefined,
    });

    return res.status(200).json({
      success: true,
      message: "Request received! We will contact you within 24 hours.",
    });
  } catch (err) {
    console.error("Email error:", err.message);
    // Still return success to user — we don't want to lose leads due to SMTP issues
    return res.status(200).json({
      success: true,
      message: "Request received! We will contact you within 24 hours.",
    });
  }
};
