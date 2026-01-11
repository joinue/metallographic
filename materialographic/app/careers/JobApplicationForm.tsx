'use client'

import { useState } from 'react'
import { X, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import AnimateOnScroll from '@/components/AnimateOnScroll'

interface Job {
  id: string
  title: string
  location: string
}

interface JobApplicationFormProps {
  jobs: Job[]
  selectedJobId?: string | null
  onClose?: () => void
}

export default function JobApplicationForm({ jobs, selectedJobId, onClose }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobId: selectedJobId || '',
  })
  const [resume, setResume] = useState<File | null>(null)
  const [coverLetter, setCoverLetter] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'coverLetter') => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        setMessage('Please upload a PDF or Word document')
        setStatus('error')
        return
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('File size must be less than 5MB')
        setStatus('error')
        return
      }
      if (type === 'resume') {
        setResume(file)
      } else {
        setCoverLetter(file)
      }
      setMessage('')
      setStatus('idle')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('jobId', formData.jobId)
      if (resume) {
        formDataToSend.append('resume', resume)
      }
      if (coverLetter) {
        formDataToSend.append('coverLetter', coverLetter)
      }

      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setMessage('Thank you for your application! We will review it and get back to you soon.')
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', jobId: '' })
      setResume(null)
      setCoverLetter(null)
      
      // Close form after 3 seconds if onClose is provided
      if (onClose) {
        setTimeout(() => {
          onClose()
          setStatus('idle')
          setMessage('')
        }, 3000)
      }
    } catch (error) {
      console.error('Application submission error:', error)
      setStatus('error')
      setMessage('Something went wrong. Please try again later.')
    }
  }

  return (
    <AnimateOnScroll animation="fadeInUp" delay={200} duration={500}>
      <section className="apply-form">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Apply Now</h2>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close form"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
          
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg text-gray-700">{message}</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                If you're interested in another role, select "Other" and include a cover letter with your area of interest.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="jobId" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Job <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="jobId"
                      name="jobId"
                      required
                      value={formData.jobId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a position</option>
                      {jobs.length > 0 ? (
                        <>
                          {jobs.map(job => (
                            <option key={job.id} value={job.id}>
                              {job.title} – {job.location}
                            </option>
                          ))}
                          <option value="other">Other (Include Cover Letter)</option>
                        </>
                      ) : (
                        <option value="other">Other (Include Cover Letter)</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                      Resume <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'resume')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                      {resume && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>{resume.name}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">PDF or Word document, max 5MB</p>
                  </div>

                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="coverLetter"
                        name="coverLetter"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, 'coverLetter')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                      {coverLetter && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>{coverLetter.name}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">PDF or Word document, max 5MB</p>
                  </div>
                </div>

                {message && (
                  <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
                    status === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
                  }`}>
                    {status === 'error' ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                    <span>{message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full md:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </AnimateOnScroll>
  )
}

