import React, { createContext, useContext, useState, useEffect } from 'react'
import PRODUCTS_DATA from '../data/products.json'

export interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  category: string
  badge?: string
}

interface CartContextType {
  cart: { [productId: string]: number }
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  getItemQuantity: (productId: string) => number
  totalItems: number
  cartDetails: { product: Product; quantity: number }[]
  generateWhatsAppLink: () => string
  isCartDrawerOpen: boolean
  setIsCartDrawerOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<{ [productId: string]: number }>({})
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)

  // Load cart from sessionStorage if available
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('fromagerie_cart')
      if (saved) setCart(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    try {
      sessionStorage.setItem('fromagerie_cart', JSON.stringify(cart))
    } catch {
      // ignore
    }
  }, [cart])

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }))
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const current = prev[productId] || 0
      if (current <= 1) {
        const next = { ...prev }
        delete next[productId]
        return next
      }
      return { ...prev, [productId]: current - 1 }
    })
  }

  const clearCart = () => {
    setCart({})
    setIsCartDrawerOpen(false)
  }

  const getItemQuantity = (productId: string) => cart[productId] || 0

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0)

  const cartDetails = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = (PRODUCTS_DATA as Product[]).find((p) => p.id === id)
      if (!product) return null
      return { product, quantity }
    })
    .filter((item): item is { product: Product; quantity: number } => item !== null)

  const generateWhatsAppLink = () => {
    if (cartDetails.length === 0) return 'https://wa.me/21623329295'

    const lines = cartDetails.map(
      (item) => `• ${item.quantity}x ${item.product.name} (${item.product.price})`
    )

    const message = [
      'Bonjour Fromagerie Ilef 👋',
      'Je souhaite passer une commande pour :',
      '',
      ...lines,
      '',
      `Total articles : ${totalItems}`,
      'Merci !',
    ].join('\n')

    return `https://wa.me/21623329295?text=${encodeURIComponent(message)}`
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItems,
        cartDetails,
        generateWhatsAppLink,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
