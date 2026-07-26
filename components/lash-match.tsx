"use client"

import type React from "react"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react"
import { Camera, Check, Loader2, Mail, Phone, X } from "lucide-react"

type LashMatchContextValue = {
  open: () => void
  close: () => void
}

const LashMatchContext = createContext<LashMatchContextValue | null>(null)

export function useLashMatch() {
  const ctx = useContext(LashMatchContext)
  if (!ctx) throw new Error("useLashMatch must be used within LashMatchProvider")
  return ctx
}

export function LashMatchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <LashMatchContext.Provider value={{ open, close }}>
      {children}
      <LashMatchModal isOpen={isOpen} onClose={close} />
    </LashMatchContext.Provider>
  )
}

function LashMatchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [contactMethod, setContactMethod] = useState<"whatsapp" | "email">("whatsapp")
  const [contactValue, setContactValue] = useState("")
  const [fileName, setFileName] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && !isSubmitting) onClose()
    }
    if (isOpen) window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, onClose, isSubmitting])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  if (!isOpen) return null

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setFileName(file.name)
    setPhotoFile(file)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!photoFile) {
      setError("Carica una foto per continuare.")
      return
    }

    if (!privacyAccepted) {
      setError("Devi accettare la privacy policy.")
      return
    }

    setIsSubmitting(true)

    try {
      const body = new FormData()
      body.append("contactMethod", contactMethod)
      body.append("contactValue", contactValue.trim())
      body.append("privacyAccepted", String(privacyAccepted))
      body.append("photo", photoFile)

      const response = await fetch("/api/lash-match", {
        method: "POST",
        body,
      })

      const data = (await response.json().catch(() => null)) as {
        error?: string
      } | null

      if (!response.ok) {
        throw new Error(data?.error || "Invio non riuscito. Riprova tra poco.")
      }

      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invio non riuscito. Riprova tra poco.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-notte/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lashmatch-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-lg rounded-t-3xl bg-card px-6 pb-8 pt-10 text-card-foreground shadow-2xl sm:rounded-3xl sm:px-10"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Chiudi"
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
        >
          <X className="size-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="size-8" />
            </div>
            <h2 className="mt-6 font-serif text-3xl text-primary">Grazie!</h2>
            <p className="mt-3 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              La tua richiesta è stata inviata. Venera ti risponderà al più presto con il
              tuo Lash Match personalizzato. Ogni sguardo, una storia.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                Lash Match
              </span>
              <h2
                id="lashmatch-title"
                className="mt-3 text-balance font-serif text-3xl leading-tight text-primary sm:text-4xl"
              >
                Scopri l&apos;effetto perfetto per te
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-pretty leading-relaxed text-muted-foreground">
                Carica una foto del tuo viso, ti consiglierò lo stile che valorizza di più
                i tuoi occhi.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={handleFile}
                  className="sr-only"
                  id="lashmatch-photo"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting}
                  className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-secondary/50 px-6 py-8 text-center transition-colors hover:border-accent hover:bg-secondary disabled:opacity-60"
                >
                  {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Anteprima della foto caricata"
                      className="h-28 w-28 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Camera className="size-6" />
                    </span>
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {fileName ? "Cambia foto" : "Scatta o carica una foto"}
                  </span>
                  {fileName && (
                    <span className="max-w-[16rem] truncate text-xs text-muted-foreground">
                      {fileName}
                    </span>
                  )}
                </button>
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-medium text-foreground">
                  Come preferisci essere ricontattata?
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  <ContactRadio
                    label="WhatsApp"
                    icon={<Phone className="size-4" />}
                    checked={contactMethod === "whatsapp"}
                    disabled={isSubmitting}
                    onChange={() => {
                      setContactMethod("whatsapp")
                      setContactValue("")
                    }}
                  />
                  <ContactRadio
                    label="Email"
                    icon={<Mail className="size-4" />}
                    checked={contactMethod === "email"}
                    disabled={isSubmitting}
                    onChange={() => {
                      setContactMethod("email")
                      setContactValue("")
                    }}
                  />
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="lashmatch-contact"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  {contactMethod === "whatsapp" ? "Numero di telefono" : "Indirizzo email"}
                </label>
                <input
                  id="lashmatch-contact"
                  type={contactMethod === "whatsapp" ? "tel" : "email"}
                  inputMode={contactMethod === "whatsapp" ? "tel" : "email"}
                  required
                  disabled={isSubmitting}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  placeholder={
                    contactMethod === "whatsapp" ? "+39 3XX XXX XXXX" : "nome@email.com"
                  }
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/30 disabled:opacity-60"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  required
                  disabled={isSubmitting}
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-1 size-4 shrink-0 accent-[var(--accent)]"
                />
                <span className="leading-relaxed">
                  Acconsento al trattamento dei miei dati e della foto caricata secondo la{" "}
                  <a href="#footer" className="font-medium text-accent underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-transform hover:scale-[1.02] active:scale-100 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Invio in corso...
                  </>
                ) : (
                  "Invia per il tuo Lash Match"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

function ContactRadio({
  label,
  icon,
  checked,
  disabled,
  onChange,
}: {
  label: string
  icon: React.ReactNode
  checked: boolean
  disabled?: boolean
  onChange: () => void
}) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
        checked
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:border-accent"
      } ${disabled ? "pointer-events-none opacity-60" : ""}`}
    >
      <input
        type="radio"
        name="contact-method"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
      />
      {icon}
      {label}
    </label>
  )
}
