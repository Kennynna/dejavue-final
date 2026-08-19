import { HeroSection } from '../components/hero-section'
import { FeaturedProducts } from '../components/featured-products'
import { AdvantagesSection } from '../components/advantages-section'
import { AboutSection } from '../components/about-section'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
      <AdvantagesSection />
    </>
  )
}

