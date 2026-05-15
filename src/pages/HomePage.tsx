import { HeroSection } from '../components/hero-section'
import { FeaturedProducts } from '../components/featured-products'
import { AdvantagesSection } from '../components/advantages-section'
import { EditorialShowcase } from '../components/Edit-Show'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <EditorialShowcase />
      <AdvantagesSection />
    </>
  )
}

