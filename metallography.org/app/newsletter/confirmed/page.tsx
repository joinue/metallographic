import Link from 'next/link'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export default async function NewsletterConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ already?: string; error?: string }>
}) {
  const params = await searchParams
  const alreadyConfirmed = params.already === 'true'
  const error = params.error

  const errorMessages: Record<string, string> = {
    invalid: 'Invalid confirmation link.',
    notfound: 'Confirmation link not found or expired.',
    failed: 'Failed to confirm subscription. Please try again.',
    server: 'An error occurred. Please try again later.',
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirmation Failed</h1>
          <p className="text-gray-600 mb-6">{errorMessages[error] || 'An error occurred.'}</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {alreadyConfirmed ? 'Already Confirmed' : 'Subscription Confirmed!'}
        </h1>
        <p className="text-gray-600 mb-6">
          {alreadyConfirmed
            ? 'Your email subscription is already confirmed.'
            : 'Thank you for confirming your subscription! You will now receive our latest blog posts and updates.'}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}

