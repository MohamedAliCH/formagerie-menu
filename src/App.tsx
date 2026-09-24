import React from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProductCatalog } from './components/ProductCatalog'
import { AtelierSection } from './components/AtelierSection'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'

const App: React.FC = () => (
  <div className="min-h-screen bg-[#F5F5F0] text-[#212121] font-sans flex flex-col">
    <Header />
    <main className="flex-grow">
      <Hero />
      <ProductCatalog />
      <AtelierSection />
    </main>
    <Footer />
    <WhatsAppFloat />
  </div>
)

export default App
