import React from 'react'
import { MapPin, Navigation, Phone, Clock, Sparkles } from 'lucide-react'

export const AtelierSection: React.FC = () => {
  const mapsUrl = 'https://maps.app.goo.gl/p4U5EfwFZCXnP2dG9'
  // Exact Google Maps place embed for Fromagerie ilef (CID: 0x12fdf5439aa7b1d1:0xdd1e918a248ad052)
  const embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.3228864455655!2d10.5852376!3d35.7428678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fdf5439aa7b1d1%3A0xdd1e918a248ad052!2sFromagerie%20ilef!5e0!3m2!1sfr!2stn!4v1711200000000'

  return (
    <section id="atelier" className="py-20 md:py-28 bg-[#F5F5F0] border-t border-[#212121]/8">
      <div className="max-w-6xl mx-auto px-5">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <span className="inline-block text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#A6A085] border-b border-[#A6A085]/40 pb-1">
            Visitez-nous · Vente directe
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#212121]">
            Notre Atelier
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#706C74] leading-relaxed">
            Venez découvrir nos fromages fraîchement préparés chaque jour ou passez récupérer votre commande directement à notre atelier.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="bg-white p-6 sm:p-7 border border-[#212121]/8 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C8281F]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#C8281F]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#212121]">
                    Fromagerie Ilef
                  </h3>
                  <p className="text-xs text-[#A6A085] font-sans uppercase tracking-wider mt-0.5">
                    Atelier artisanal · Lait 100% Bio
                  </p>
                  <p className="text-sm text-[#706C74] mt-2 leading-relaxed">
                    Atelier de fabrication et point de retrait direct.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#212121]/8 flex items-center gap-3 text-sm text-[#212121]">
                <Clock className="w-4 h-4 text-[#A6A085] flex-shrink-0" />
                <span>Ouvert du Lundi au Samedi · Produits frais du jour</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-[#212121]">
                <Phone className="w-4 h-4 text-[#C8281F] flex-shrink-0" />
                <a href="tel:+21623329295" className="hover:text-[#C8281F] font-medium transition-colors">
                  +216 23.329.295
                </a>
              </div>
            </div>

            {/* Direct Directions CTA card */}
            <div className="bg-[#212121] text-[#F5F5F0] p-6 sm:p-7 shadow-md space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-[#A6A085]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C8281F]" />
                  Facile d'accès
                </div>
                <h4 className="font-serif text-xl font-bold">
                  Trouvez votre chemin en 1 clic
                </h4>
                <p className="text-xs sm:text-sm text-[#A6A085] leading-relaxed">
                  Lancez la navigation GPS Google Maps pour venir nous rendre visite ou récupérer votre commande en direct.
                </p>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#C8281F] hover:bg-[#a91f17] text-[#F5F5F0] font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Ouvrir dans Google Maps ↗
              </a>
            </div>
          </div>

          {/* Interactive Map Embed (7 cols) */}
          <div className="lg:col-span-7 bg-white p-2 sm:p-3 border border-[#212121]/8 shadow-sm flex flex-col min-h-[350px] lg:min-h-[440px]">
            <div className="relative w-full h-full min-h-[340px] rounded-sm overflow-hidden flex-grow bg-[#EFEFEA]">
              <iframe
                title="Localisation Fromagerie Ilef"
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '340px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-[0.95] contrast-[1.02]"
              />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="absolute top-3 right-3 bg-[#212121]/90 hover:bg-[#212121] backdrop-blur-sm text-[#F5F5F0] text-xs font-sans font-medium px-3.5 py-1.5 shadow-md flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3 h-3 text-[#C8281F]" />
                Plein écran
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
