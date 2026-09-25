import React from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProductCatalog } from './components/ProductCatalog'
import { AtelierSection } from './components/AtelierSection'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { CartFloatingBar } from './components/CartFloatingBar'
import { CartProvider } from './context/CartContext'

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory-cheese text-charcoal-slate font-sans flex flex-col">
      <Header />
      <main className="grow">
        <Hero />
        <ProductCatalog />
        <AtelierSection />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartFloatingBar />
    </div>
  )
}

const App: React.FC = () => (
  <CartProvider>
    <AppContent />
  </CartProvider>
)

export default App
