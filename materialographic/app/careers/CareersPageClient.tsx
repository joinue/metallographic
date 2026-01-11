'use client'

import { useState } from 'react'
import { ChevronRight, MapPin, Briefcase } from 'lucide-react'
import AnimateOnScroll from '@/components/AnimateOnScroll'
import JobApplicationForm from './JobApplicationForm'

interface Job {
  id: string
  title: string
  location: string
  job_type: string
  summary: string
  description?: string
  key_responsibilities?: string
  qualifications?: string
  preferred_qualifications?: string
  created_at: string
}

interface CareersPageClientProps {
  jobs: Job[]
}

export default function CareersPageClient({ jobs }: CareersPageClientProps) {
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)

  const handleApply = (jobId: string) => {
    setSelectedJobId(jobId)
    setShowApplicationForm(true)
    // Scroll to form
    setTimeout(() => {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleCloseForm = () => {
    setShowApplicationForm(false)
    setSelectedJobId(null)
  }

  const toggleJobDetails = (jobId: string) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId)
  }

  const formatJobType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')
  }

  if (jobs.length === 0) {
    return (
      <AnimateOnScroll animation="fadeInUp" delay={100} duration={500}>
        <div className="text-center py-16">
          <p className="text-lg text-gray-600 mb-4">
            We don't have any open positions at the moment, but we're always interested in hearing from talented individuals.
          </p>
          <p className="text-gray-600">
            Please check back soon or{' '}
            <a href="/contact" className="text-primary-600 hover:text-primary-700 font-semibold">
              contact us
            </a>{' '}
            to express your interest.
          </p>
        </div>
      </AnimateOnScroll>
    )
  }

  return (
    <>
      <section className="job-listings mb-16">
        {jobs.map((job, index) => (
          <AnimateOnScroll 
            key={job.id} 
            animation="fadeInUp" 
            delay={100 + (index * 50)} 
            duration={500}
          >
            <article className="card mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {job.title}
                    <span className="text-lg font-normal text-gray-600 ml-2">– {job.location}</span>
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{formatJobType(job.job_type)}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{job.summary}</p>
                </div>
              </div>

              {(job.description || job.key_responsibilities || job.qualifications) && (
                <div className="mb-4">
                  <button
                    onClick={() => toggleJobDetails(job.id)}
                    className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 transition-colors"
                  >
                    {expandedJobId === job.id ? 'Hide' : 'Read'} Full Description
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform ${expandedJobId === job.id ? 'rotate-90' : ''}`}
                    />
                  </button>

                  {expandedJobId === job.id && (
                    <div className="mt-4 space-y-6 text-gray-700">
                      {job.description && (
                        <div>
                          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: job.description }} />
                        </div>
                      )}

                      {job.key_responsibilities && (
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Key Responsibilities:</h4>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            {(() => {
                              try {
                                const items = typeof job.key_responsibilities === 'string' 
                                  ? JSON.parse(job.key_responsibilities)
                                  : job.key_responsibilities
                                return Array.isArray(items) ? items.map((item: string, idx: number) => (
                                  <li key={idx}>{item}</li>
                                )) : <li>{job.key_responsibilities}</li>
                              } catch {
                                return <li>{job.key_responsibilities}</li>
                              }
                            })()}
                          </ul>
                        </div>
                      )}

                      {job.qualifications && (
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Qualifications:</h4>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            {(() => {
                              try {
                                const items = typeof job.qualifications === 'string' 
                                  ? JSON.parse(job.qualifications)
                                  : job.qualifications
                                return Array.isArray(items) ? items.map((item: string, idx: number) => (
                                  <li key={idx}>{item}</li>
                                )) : <li>{job.qualifications}</li>
                              } catch {
                                return <li>{job.qualifications}</li>
                              }
                            })()}
                          </ul>
                        </div>
                      )}

                      {job.preferred_qualifications && (
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Preferred:</h4>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            {(() => {
                              try {
                                const items = typeof job.preferred_qualifications === 'string' 
                                  ? JSON.parse(job.preferred_qualifications)
                                  : job.preferred_qualifications
                                return Array.isArray(items) ? items.map((item: string, idx: number) => (
                                  <li key={idx}>{item}</li>
                                )) : <li>{job.preferred_qualifications}</li>
                              } catch {
                                return <li>{job.preferred_qualifications}</li>
                              }
                            })()}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => handleApply(job.id)}
                className="btn-primary inline-flex items-center gap-2"
              >
                Apply Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </article>
          </AnimateOnScroll>
        ))}
      </section>

      {/* Application Form */}
      <div id="application-form">
        <JobApplicationForm
          jobs={jobs}
          selectedJobId={selectedJobId}
          onClose={handleCloseForm}
        />
      </div>
    </>
  )
}

