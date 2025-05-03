
import { auth } from '@/auth'
import Footer from '@/modules/landing-page/components/footer';
import LandinPageHero from '@/modules/landing-page/components/hero';
import PricingPage from '@/modules/landing-page/components/pricing';

const navigation = [
  { name: 'Platform', href: '#' },
  { name: 'Learning Paths', href: '#' },
  { name: 'Success Stories', href: '#' },
  { name: 'For Educators', href: '#' },
]

export default async function Example() {
  const session = await auth();
  return (
    <main className='grainy'>
      <LandinPageHero session={session} />
      <PricingPage />
      <Footer />
    </main>
  )
}