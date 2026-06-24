"use client"

import PageLayout from "./components/PageLayout"
import Hero from "./components/Hero"
import CTA from "./components/CTA"
import Chapters from "./components/Chapters"
import CartSection from "./components/CartSection"
import BuckedUpSection from "./components/BuckedUpSection"
import AnimatedSection from "./components/AnimatedSection"

export default function Home(){

  return (
      <PageLayout>
        <div className="page-enter">
          <Hero />
          <AnimatedSection>
            <CTA />
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <Chapters />
          </AnimatedSection>
          <AnimatedSection delay={200}>
        <CartSection />
          </AnimatedSection>
          <AnimatedSection delay={300}>
            <BuckedUpSection />
          </AnimatedSection>
        </div>
      </PageLayout>
  )
}