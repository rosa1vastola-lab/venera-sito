import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export const runtime = "nodejs"

const DEFAULT_RECIPIENTS = [
  "Rosu.venera@gmail.com",
  "nicovastola@gmail.com",
  "rosa1vastola@gmail.com",
]

const MAX_PHOTO_BYTES = 4.5 * 1024 * 1024

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const contactMethod = String(formData.get("contactMethod") || "").trim()
    const contactValue = String(formData.get("contactValue") || "").trim()
    const privacyAccepted = String(formData.get("privacyAccepted") || "") === "true"
    const photo = formData.get("photo")

    if (!privacyAccepted) {
      return NextResponse.json(
        { error: "Devi accettare la privacy policy." },
        { status: 400 },
      )
    }

    if (contactMethod !== "whatsapp" && contactMethod !== "email") {
      return NextResponse.json(
        { error: "Metodo di contatto non valido." },
        { status: 400 },
      )
    }

    if (!contactValue) {
      return NextResponse.json(
        { error: "Inserisci un contatto valido." },
        { status: 400 },
      )
    }

    if (!(photo instanceof File) || photo.size === 0) {
      return NextResponse.json(
        { error: "Carica una foto per continuare." },
        { status: 400 },
      )
    }

    if (!photo.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Il file deve essere un'immagine." },
        { status: 400 },
      )
    }

    if (photo.size > MAX_PHOTO_BYTES) {
      return NextResponse.json(
        { error: "La foto è troppo grande (max 4,5 MB)." },
        { status: 400 },
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error("RESEND_API_KEY non configurata")
      return NextResponse.json(
        { error: "Invio email non configurato sul server." },
        { status: 500 },
      )
    }

    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Venera Lash Studio <onboarding@resend.dev>"

    const recipients = (
      process.env.LASH_MATCH_NOTIFY_EMAILS || DEFAULT_RECIPIENTS.join(",")
    )
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)

    const photoBuffer = Buffer.from(await photo.arrayBuffer())
    const contactLabel =
      contactMethod === "whatsapp" ? "WhatsApp / Telefono" : "Email"

    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: recipients,
      replyTo: contactMethod === "email" ? contactValue : undefined,
      subject: "Nuova richiesta Lash Match",
      text: [
        "Hai ricevuto una nuova richiesta Lash Match dal sito.",
        "",
        `${contactLabel}: ${contactValue}`,
        `Foto allegata: ${photo.name || "foto-cliente.jpg"}`,
        "",
        "— Venera Lash Studio",
      ].join("\n"),
      html: `
        <div style="font-family: Georgia, serif; color: #1a2e28; line-height: 1.6;">
          <h2 style="margin: 0 0 12px;">Nuova richiesta Lash Match</h2>
          <p style="margin: 0 0 16px;">Hai ricevuto una nuova richiesta dal sito.</p>
          <p style="margin: 0 0 8px;"><strong>${contactLabel}:</strong> ${escapeHtml(contactValue)}</p>
          <p style="margin: 0 0 16px;">La foto della cliente è in allegato.</p>
          <p style="margin: 0; color: #666; font-size: 13px;">— Venera Lash Studio</p>
        </div>
      `,
      attachments: [
        {
          filename: sanitizeFilename(photo.name) || "foto-lash-match.jpg",
          content: photoBuffer,
          contentType: photo.type || "image/jpeg",
        },
      ],
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json(
        { error: "Invio non riuscito. Riprova tra poco." },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Lash Match email error:", error)
    return NextResponse.json(
      { error: "Invio non riuscito. Riprova tra poco." },
      { status: 500 },
    )
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function sanitizeFilename(name: string) {
  return name.replace(/[^\w.\-()+ ]+/g, "_").slice(0, 120)
}
