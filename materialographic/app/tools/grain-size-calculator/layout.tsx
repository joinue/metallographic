import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grain Size Calculator Tool | Metallography.org',
  description: 'Calculate ASTM grain size numbers and convert between grain size measurements using ASTM E112 standard methods.',
}

export default function GrainSizeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>}

