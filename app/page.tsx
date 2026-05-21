import Sidebar from "./components/Sidebar"
import Hero from "./components/Hero"
import CTA from "./components/CTA"
import Chapters from "./components/Chapters"
import CartSection from "./components/CartSection"

export default function Home(){
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1">
        <Hero />
        <CTA />
        <Chapters />
        <CartSection />
      </main>
    </div>
  )
}