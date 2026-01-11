import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Total Procedure Time Estimator Tool | Metallography.org',
  description: 'Estimate total time required for complete metallographic sample preparation including grinding, polishing, mounting, and etching steps.',
}

export default function ProcedureTimeEstimatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>}

