import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mounting Material Calculator Tool | Metallography.org',
  description: 'Calculate the amount of mounting material needed for compression or castable mounting based on sample and mold dimensions.',
}

export default function MountingMaterialCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>}

