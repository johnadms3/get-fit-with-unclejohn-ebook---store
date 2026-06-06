import PageLayout from "./components/PageLayout"
import Hero from "./components/Hero"
import CTA from "./components/CTA"
import Chapters from "./components/Chapters"
import CartSection from "./components/CartSection"

export default function Home(){
  return (
      <PageLayout>
        <Hero />
        <CTA />
        <Chapters />
        <CartSection />
      </PageLayout>
  )
}