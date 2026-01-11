import BlogPageWrapper from './BlogPageWrapper'

export default function BlogAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BlogPageWrapper>{children}</BlogPageWrapper>
}

