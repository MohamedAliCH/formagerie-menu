import React, { useRef, useState, useEffect } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { QrCode, Download, Copy, Check, X, ExternalLink } from 'lucide-react'

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)
  
  // Public production URL (never requires Vercel login)
  const menuUrl =
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1' &&
    !window.location.hostname.includes('-') // Ignore preview deployment subdomains
      ? window.location.origin
      : 'https://formagerie-menu.vercel.app/'


  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      setCopied(false)
    }
  }

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (!canvas) return

    const pngUrl = canvas.toDataURL('image/png')
    const downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = 'fromagerie-ilef-menu-qr.png'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-slate/65 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-xl shadow-2xl border border-charcoal-slate/10 overflow-hidden flex flex-col transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 bg-ivory-cheese border-b border-charcoal-slate/8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-charcoal-slate text-ivory-cheese flex items-center justify-center">
              <QrCode className="w-4 h-4 text-ivory-cheese" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-charcoal-slate text-sm">
                QR Code du Menu
              </h3>
              <p className="text-[11px] text-tile-pattern">
                Pour comptoir & dégustation
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-tile-pattern hover:text-charcoal-slate rounded-md hover:bg-black/5 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          <div
            ref={qrRef}
            className="p-4 bg-white rounded-lg border-2 border-dashed border-charcoal-slate/15 shadow-inner"
          >
            <QRCodeCanvas
              value={menuUrl}
              size={200}
              level="H"
              marginSize={2}
              fgColor="#212121"
              bgColor="#FFFFFF"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-muted-olive">
              Fromagerie Ilef
            </span>
            <p className="text-xs text-tile-pattern leading-relaxed">
              Scannez avec un smartphone pour ouvrir le catalogue en direct et commander sur WhatsApp.
            </p>
          </div>

          {/* Quick link preview */}
          <a
            href={menuUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-charcoal-slate hover:text-roasted-crimson font-medium underline underline-offset-2 transition-colors"
          >
            <span>formagerie-menu.vercel.app</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Actions Footer */}
        <div className="px-5 py-4 bg-ivory-cheese border-t border-charcoal-slate/8 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleDownloadQR}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm bg-charcoal-slate hover:bg-[#333] text-ivory-cheese text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Télécharger le QR Code (PNG)
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-sm border border-charcoal-slate/20 hover:bg-white text-charcoal-slate text-xs font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-700 font-semibold">Lien copié dans le presse-papier !</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-tile-pattern" />
                <span>Copier le lien web</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
