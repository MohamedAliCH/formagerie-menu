import React from 'react'
import { Logo } from './Logo'
import { Phone, QrCode } from 'lucide-react'

interface HeaderProps {
  onOpenQrCode?: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenQrCode }) => (
  <header className="sticky top-0 z-40 bg-ivory-cheese/95 backdrop-blur-md border-b border-charcoal-slate/8">
    <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
      <Logo />

      <div className="flex items-center gap-3 sm:gap-5">
        <nav className="hidden md:flex items-center gap-6">
          <a href="#produits" className="text-sm font-sans text-tile-pattern hover:text-charcoal-slate transition-colors">
            Nos Produits
          </a>
          <a href="#atelier" className="text-sm font-sans text-tile-pattern hover:text-charcoal-slate transition-colors">
            Notre Atelier
          </a>
        </nav>

        {onOpenQrCode && (
          <button
            type="button"
            onClick={onOpenQrCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-charcoal-slate hover:text-roasted-crimson border border-charcoal-slate/15 hover:border-roasted-crimson/30 rounded-sm transition-colors cursor-pointer bg-white/60"
            title="Afficher le QR code du menu"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">QR Menu</span>
          </button>
        )}

        <a
          href="tel:+21623329295"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-sans font-medium text-ivory-cheese bg-charcoal-slate hover:bg-[#333] transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          Commander
        </a>
      </div>
    </div>
  </header>
)

