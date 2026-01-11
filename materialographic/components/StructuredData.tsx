import { ReactNode } from 'react'

interface StructuredDataProps {
  data: object | object[]
}

export default function StructuredData({ data }: StructuredDataProps) {
  // Consolidate multiple structured data objects into a single script
  const structuredDataArray = Array.isArray(data) ? data : [data]
  
  return (
    <>
      {structuredDataArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

