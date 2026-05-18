'use strict';

const express    = require('express');
const nodemailer = require('nodemailer');
const rateLimit  = require('express-rate-limit');
const path       = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// ─── Config ──────────────────────────────────────────────────────────────────
const PORT             = process.env.PORT             || 3000;
const SMTP_HOST        = process.env.SMTP_HOST;
const SMTP_PORT        = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_SECURE      = process.env.SMTP_SECURE === 'true';
const SMTP_USER        = process.env.SMTP_USER;
const SMTP_PASS        = process.env.SMTP_PASS;
const MAIL_TO          = process.env.MAIL_TO;
const MAIL_FROM        = process.env.MAIL_FROM        || SMTP_USER;
const MAIL_FROM_NAME   = process.env.MAIL_FROM_NAME   || 'Équinoxe Évasion';
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_MIN_SCORE = parseFloat(process.env.RECAPTCHA_MIN_SCORE || '0.5');
const NODE_ENV         = process.env.NODE_ENV         || 'development';

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
  console.error('[server] ⚠  Variables SMTP manquantes dans .env');
}
if (!RECAPTCHA_SECRET) {
  console.warn('[server] ⚠  RECAPTCHA_SECRET_KEY absent — vérification reCAPTCHA désactivée (dev uniquement)');
}

// ─── Mailer ──────────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

// ─── App ─────────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json({ limit: '20kb' }));

if (NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist', 'equinoxe-evasion', 'browser');
  app.use(express.static(distPath));
}

// ─── Rate limiting ────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Trop de tentatives. Réessayez dans 15 minutes.' },
});

// ─── Helpers ─────────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{1,63}$/;

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[\x00-\x1F\x7F]/g, '').slice(0, 1000);
}

/**
 * Vérifie le token reCAPTCHA v3 auprès de Google.
 * Retourne true si le score est suffisant, false sinon.
 * Si RECAPTCHA_SECRET n'est pas configuré (dev), on laisse passer avec un warning.
 */
async function verifyRecaptcha(token, remoteip) {
  if (!RECAPTCHA_SECRET) return true; // dev : pas de clé configurée

  if (!token || typeof token !== 'string') return false;

  const body = new URLSearchParams({
    secret:   RECAPTCHA_SECRET,
    response: token,
    remoteip: remoteip || '',
  });

  let data;
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body:    body.toString(),
    });
    data = await res.json();
  } catch (err) {
    console.error('[recaptcha] Erreur lors de la vérification :', err.message);
    return false;
  }

  if (!data.success) {
    console.warn('[recaptcha] Échec :', data['error-codes']);
    return false;
  }

  if (data.score < RECAPTCHA_MIN_SCORE) {
    console.warn(`[recaptcha] Score trop bas : ${data.score} (seuil : ${RECAPTCHA_MIN_SCORE})`);
    return false;
  }

  return true;
}

// ─── POST /api/contact ────────────────────────────────────────────────────────
app.post('/api/contact', contactLimiter, async (req, res) => {
  const { firstName, lastName, email, message, recaptchaToken, website } = req.body ?? {};

  // Honeypot : les bots remplissent ce champ, les humains non
  if (sanitize(website)) {
    return res.status(400).json({ error: 'Formulaire invalide.' });
  }

  // Validation des champs
  const cleanFirst = sanitize(firstName);
  const cleanLast  = sanitize(lastName);
  const cleanEmail = sanitize(email);
  const cleanMsg   = sanitize(message);

  const errors = [];
  if (!cleanFirst) errors.push('Le prénom est requis.');
  if (!cleanLast)  errors.push('Le nom est requis.');
  if (!cleanEmail || !EMAIL_RE.test(cleanEmail)) errors.push('Adresse email invalide.');
  if (!cleanMsg)   errors.push('Le message est requis.');
  if (errors.length) return res.status(400).json({ error: errors.join(' ') });

  // Vérification reCAPTCHA
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
  const humanVerified = await verifyRecaptcha(sanitize(recaptchaToken), ip);
  if (!humanVerified) {
    return res.status(400).json({ error: 'Vérification anti-spam échouée. Veuillez réessayer.' });
  }

  // Envoi de l'email
  const mailOptions = {
    from:    `"${MAIL_FROM_NAME}" <${MAIL_FROM}>`,
    to:      MAIL_TO,
    replyTo: `"${cleanFirst} ${cleanLast}" <${cleanEmail}>`,
    subject: `🐎 Nouveau message — ${cleanFirst} ${cleanLast}`,
    text: `
Équinoxe Évasion — Nouveau message de contact
═══════════════════════════════════════════════

Nom    : ${cleanFirst} ${cleanLast}
Email  : ${cleanEmail}

Message :
${cleanMsg}
    `.trim(),
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#fdf9f3;font-family:Georgia,serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e8d9bf">
        <tr>
          <td style="background:#3d2a1a;padding:32px 40px;text-align:center">
            <p style="margin:0;color:#d4a853;font-size:11px;letter-spacing:4px;text-transform:uppercase">Équinoxe Évasion</p>
            <h1 style="margin:8px 0 0;color:#fff;font-size:24px;font-weight:300">Nouveau message de contact</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${row('Prénom', cleanFirst)}
              ${row('Nom', cleanLast)}
              ${row('Email', `<a href="mailto:${cleanEmail}" style="color:#8b6340">${cleanEmail}</a>`)}
            </table>
            <h2 style="margin:32px 0 12px;font-size:16px;color:#3d2a1a;font-weight:400;border-bottom:1px solid #e8d9bf;padding-bottom:8px">Message</h2>
            <p style="margin:0;color:#5a3e28;font-size:14px;line-height:1.8;white-space:pre-line">${cleanMsg}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f5efe1;padding:20px 40px;text-align:center;border-top:1px solid #e8d9bf">
            <p style="margin:0;color:#a67c52;font-size:11px">
              Cliquez sur Répondre pour répondre directement à ${cleanFirst}.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[contact] Mail envoyé — ${cleanFirst} ${cleanLast} <${cleanEmail}>`);
    return res.json({ ok: true });
  } catch (err) {
    console.error('[contact] Erreur Nodemailer :', err.message);
    return res.status(500).json({ error: "Erreur lors de l'envoi. Réessayez ou contactez-nous par email." });
  }
});

// SPA fallback (production)
if (NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'equinoxe-evasion', 'browser', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[server] ✓ http://localhost:${PORT}  (${NODE_ENV})`);
});

function row(label, value) {
  return `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f5efe1;width:140px">
        <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a67c52">${label}</span>
      </td>
      <td style="padding:8px 12px;border-bottom:1px solid #f5efe1">
        <span style="font-size:14px;color:#3d2a1a">${value}</span>
      </td>
    </tr>`;
}
