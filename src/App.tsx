import React from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProductCatalog } from './components/ProductCatalog'
import { AtelierSection } from './components/AtelierSection'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'

const App: React.FC = () => (
  <div className="min-h-screen bg-ivory-cheese text-charcoal-slate font-sans flex flex-col">
    <Header />
    <main className="grow">
      <Hero />
      <ProductCatalog />
      <AtelierSection />
    </main>
    <Footer />
    <WhatsAppFloat />
  </div>
)

export default App
