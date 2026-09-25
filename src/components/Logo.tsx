import React from 'react'

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <a href="#" className={`flex items-center gap-3 select-none group ${className}`}>
    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-roasted-crimson bg-white shadow-sm transition-transform duration-300 group-hover:scale-105">
      <img src="./logo-ilef.png" alt="Fromagerie Ilef" className="w-full h-full object-contain" />
    </div>
    <div className="flex flex-col leading-tight">
      <span className="font-serif text-lg font-semibold tracking-tight text-charcoal-slate">
        Fromagerie <span className="text-roasted-crimson">Ilef</span>
      </span>
      <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-muted-olive">
        Artisanal · 100% Bio
      </span>
    </div>
  </a>
)
