import { Metadata } from 'next'
import BuilderPageWrapper from './BuilderPageWrapper'

export const metadata: Metadata = {
  title: 'Lab Builder | Metallography.org',
  description: 'Get general equipment and consumable recommendations for your metallographic laboratory based on your sample specifications and workflow requirements.',
}

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BuilderPageWrapper>{children}</BuilderPageWrapper>
}

