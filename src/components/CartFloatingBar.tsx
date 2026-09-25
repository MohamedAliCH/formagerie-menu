import React from 'react'
import { useCart } from '../context/CartContext'
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'

export const CartFloatingBar: React.FC = () => {
  const {
    totalItems,
    cartDetails,
    addToCart,
    removeFromCart,
    clearCart,
    generateWhatsAppLink,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useCart()

  if (totalItems === 0) return null

  return (
    <>
      {/* ── Cart Drawer / Modal ── */}
      {isCartDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-charcoal-slate/60 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-xl shadow-2xl border border-charcoal-slate/10 overflow-hidden flex flex-col max-h-[85vh] animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-ivory-cheese border-b border-charcoal-slate/8 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-roasted-crimson/10 flex items-center justify-center text-roasted-crimson">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-charcoal-slate text-base">
                    Votre Panier ({totalItems})
                  </h3>
                  <p className="text-[11px] text-tile-pattern">
                    Fromagerie Ilef · Commande WhatsApp directe
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 text-tile-pattern hover:text-charcoal-slate transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of items */}
            <div className="p-6 overflow-y-auto divide-y divide-charcoal-slate/8 space-y-4">
              {cartDetails.map(({ product, quantity }) => (
                <div key={product.id} className="pt-4 first:pt-0 flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={`${product.name} — Fromagerie Ilef`}
                    className="w-14 h-14 object-cover rounded-md border border-charcoal-slate/8 shrink-0 bg-ivory-cheese"
                  />
                  <div className="grow min-w-0">
                    <h4 className="font-serif font-semibold text-charcoal-slate text-sm truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-roasted-crimson font-bold mt-0.5">
                      {product.price}
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 shrink-0 border border-charcoal-slate/15 rounded-full px-2 py-1 bg-ivory-cheese">
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="p-1 text-charcoal-slate hover:text-roasted-crimson transition-colors"
                      aria-label="Diminuer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-charcoal-slate w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => addToCart(product.id)}
                      className="p-1 text-charcoal-slate hover:text-roasted-crimson transition-colors"
                      aria-label="Augmenter"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions footer */}
            <div className="p-5 bg-ivory-cheese border-t border-charcoal-slate/8 space-y-3">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-sm font-semibold tracking-wider uppercase shadow-md transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Envoyer ma commande sur WhatsApp
              </a>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={clearCart}
                  className="inline-flex items-center gap-1.5 text-xs text-tile-pattern hover:text-roasted-crimson transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Vider le panier
                </button>
                <button
                  type="button"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="text-xs text-charcoal-slate hover:underline"
                >
                  Continuer mes achats
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Fixed Floating Bottom Bar ── */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg">
        <div className="bg-charcoal-slate/95 backdrop-blur-md text-ivory-cheese rounded-full px-5 py-3 shadow-2xl border border-white/10 flex items-center justify-between gap-3 animate-slideUp">
          {/* Left: Summary button */}
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                <ShoppingBag className="w-5 h-5 text-ivory-cheese" />
              </div>
              <span className="absolute -top-1 -right-1 bg-roasted-crimson text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {totalItems}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold leading-tight text-ivory-cheese">
                {totalItems} article{totalItems > 1 ? 's' : ''} dans le panier
              </p>
              <p className="text-[10px] text-muted-olive group-hover:text-ivory-cheese transition-colors">
                Voir le détail ↗
              </p>
            </div>
          </button>

          {/* Right: Direct WhatsApp CTA */}
          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold uppercase tracking-wider shadow-md transition-all shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Commander</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </>
  )
}
