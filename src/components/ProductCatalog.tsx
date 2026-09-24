import React, { useState, useEffect, useRef } from 'react'

/* ── Product Data from formagerie-menu-main ── */
interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  category: string
}

const PRODUCTS: Product[] = [
  // Fromages Frais
  { id: 'ricotta', name: 'Ricotta', description: 'Fromage italien frais et crémeux', price: '1.2 DT/100g', image: './products/ricotta.jpg', category: 'Fromages Frais' },
  { id: 'mozzarella', name: 'Mozzarella', description: 'Boule douce, parfaite pour les pizzas', price: '2.4 DT/100g', image: './products/motza.jpg', category: 'Fromages Frais' },
  { id: 'mozzarella-cerise', name: 'Mozzarella Cerise', description: 'Mini billes pour salades et apéritifs', price: '3.2 DT/100g', image: './products/ceurise.jpg', category: 'Fromages Frais' },
  { id: 'mozzarella-farcie', name: 'Mozzarella Farcie', description: 'Fromage frais crémeux, farcie aux choix', price: '3.5 DT/100g', image: './products/farsi.jpg', category: 'Fromages Frais' },
  { id: 'fraidoux', name: 'Fraidoux', description: 'Fromage frais crémeux, idéal pour tartines', price: '3.5 DT/250g', image: './products/fraidou.jpg', category: 'Fromages Frais' },
  { id: 'cube-salade', name: 'Cube Salade', description: 'Fromage doux, parfait pour les salades', price: '3 DT', image: './products/cube.jpg', category: 'Fromages Frais' },

  // Fromages Affinés
  { id: 'sicilien', name: 'Sicilien', description: 'Fromage traditionnel sicilien affiné', price: '2.7 DT/100g', image: './products/sc.jpg', category: 'Fromages Affinés' },
  { id: 'sicilien-6-epices', name: 'Sicilien 6 Épices', description: 'Affiné avec un mélange de 6 épices', price: '2.8 DT/100g', image: './products/6epice.jpg', category: 'Fromages Affinés' },
  { id: 'sicilien-ail-persil', name: 'Sicilien Ail & Persil', description: 'Affiné avec du persil et de l\'ail', price: '2.8 DT/100g', image: './products/sc-persi.jpg', category: 'Fromages Affinés' },
  { id: '4-fromages', name: '4 Fromages', description: 'Mélange fondant de fromages classiques', price: '3 DT/100g', image: './products/4formage.jpg', category: 'Fromages Affinés' },
  { id: 'gouda', name: 'Gouda', description: 'Fromage doux à pâte pressée', price: '3.8 DT/100g', image: './products/gouda.jpg', category: 'Fromages Affinés' },
  { id: 'edam', name: 'Edam', description: 'Rond et fruité, à croûte rouge', price: '3.8 DT/100g', image: './products/edame.jpg', category: 'Fromages Affinés' },
  { id: 'halloumi', name: 'Halloumi', description: 'Pâte semi-dure, idéal pour griller', price: '3 DT/100g', image: './products/haloumi.jpg', category: 'Fromages Affinés' },
  { id: 'parmesan', name: 'Parmesan', description: 'Pâte dure, idéal pour plats cuisinés', price: '4 DT/100g', image: './products/par.jpg', category: 'Fromages Affinés' },

  // Produits Laitiers
  { id: 'yogurt', name: 'Yogurt', description: 'Yaourt nature frais et crémeux', price: '4.7 DT', image: './products/yogf.jpg', category: 'Produits Laitiers' },
  { id: 'yogurt-a-boire', name: 'Yogurt à Boire', description: 'Yaourt à boire, frais et crémeux', price: '4.5 DT', image: './products/aboire.jpg', category: 'Produits Laitiers' },
  { id: 'lben', name: 'Lben', description: 'Boisson lactée traditionnelle fermentée', price: '2.6 DT', image: './products/lben.jpg', category: 'Produits Laitiers' },
  { id: 'rayeb', name: 'Rayeb', description: 'Lait caillé frais et rafraîchissant', price: '3 DT', image: './products/rayb.jpg', category: 'Produits Laitiers' },
  { id: 'beurre', name: 'Beurre', description: 'Beurre doux et crémeux', price: '3 DT/100g', image: './products/br.jpg', category: 'Produits Laitiers' },
]

const CATEGORIES = ['Tout', 'Fromages Frais', 'Fromages Affinés', 'Produits Laitiers']

export const ProductCatalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Tout')
  const refs = useRef<(HTMLDivElement | null)[]>([])

  const filtered = activeCategory === 'Tout'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory)

  // Scroll-triggered fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    refs.current.forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [filtered])

  const buildWhatsAppLink = (product: Product) => {
    const msg = encodeURIComponent(
      `Bonjour Fromagerie Ilef 👋\nJe souhaite commander :\n\n🧀 ${product.name} — ${product.price}\n\nMerci !`
    )
    return `https://wa.me/21623329295?text=${msg}`
  }

  return (
    <section id="produits" className="py-20 md:py-28 bg-[#F5F5F0] grain-overlay">
      <div className="max-w-6xl mx-auto px-5">
        {/* Section heading */}
        <div className="text-center mb-14 space-y-3">
          <span className="text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-[#A6A085]">
            Catalogue
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#212121]">
            Nos Produits
          </h2>
          <p className="font-sans text-base text-[#706C74] max-w-md mx-auto">
            Tous nos fromages et produits laitiers sont fabriqués quotidiennement avec du lait 100% bio.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`category-pill px-5 py-2 text-sm font-sans font-medium cursor-pointer border ${
                activeCategory === cat
                  ? 'category-pill-active border-[#212121]'
                  : 'bg-white/80 text-[#706C74] border-[#212121]/15 hover:border-[#212121]/40 hover:bg-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              ref={el => { refs.current[i] = el }}
              className="product-card fade-up bg-white border border-[#212121]/8 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden bg-[#e8e6e1]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#212121] group-hover:text-[#C8281F] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm font-sans text-[#706C74] mt-0.5">{product.description}</p>
                  </div>
                  <span className="shrink-0 font-sans text-sm font-bold text-[#C8281F] bg-[#C8281F]/8 px-2.5 py-1">
                    {product.price}
                  </span>
                </div>

                {/* Category tag */}
                <span className="inline-block text-[10px] font-sans font-medium tracking-wider uppercase text-[#A6A085] border-b border-[#A6A085]/30 pb-0.5">
                  {product.category}
                </span>

                {/* Order via WhatsApp */}
                <a
                  href={buildWhatsAppLink(product)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 mt-1 text-sm font-sans font-medium text-[#212121] border border-[#212121]/15 hover:bg-[#212121] hover:text-[#F5F5F0] transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Commander
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
