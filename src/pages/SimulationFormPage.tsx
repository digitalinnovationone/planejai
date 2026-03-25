import { SimulationForm } from '@/components/features/Simulation/Form'
import { SimulationHero } from '@/components/features/Simulation/Hero'

export function SimulationFormPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
      <SimulationHero />
      <SimulationForm />
    </main>
  )
}
