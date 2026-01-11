'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Search, Download, Eye, EyeOff, CheckCircle2, XCircle, Clock, ArrowLeft } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

// Component to handle document downloads with signed URLs
function DocumentLink({ fileName, label }: { fileName: string; label: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Generate a signed URL for the file (valid for 1 hour)
      const { data, error: urlError } = await supabase.storage
        .from('job-applications')
        .createSignedUrl(fileName, 3600) // 1 hour expiry

      if (urlError) {
        console.error('Error generating signed URL:', urlError)
        setError('Failed to generate download link')
        return
      }

      if (data?.signedUrl) {
        // Open in new tab
        window.open(data.signedUrl, '_blank')
      }
    } catch (err) {
      console.error('Error downloading file:', err)
      setError('Failed to download file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download className="w-4 h-4" />
      {loading ? 'Loading...' : label}
      {error && <span className="text-red-600 text-xs">({error})</span>}
    </button>
  )
}

interface Application {
  id: string
  job_id: string
  name: string
  email: string
  phone: string | null
  resume_url: string | null
  cover_letter_url: string | null
  status: string
  notes: string | null
  created_at: string
  jobs?: {
    title: string
    location: string
  } | null
}

export default function ApplicationsAdmin() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'reviewing' | 'interviewing' | 'rejected' | 'hired'>('all')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  useEffect(() => {
    loadApplications()
  }, [])

  useEffect(() => {
    loadApplications()
  }, [filterStatus])

  const loadApplications = async () => {
    try {
      const supabase = createClient()
      
      // First, try to load applications with join
      let query = supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus)
      }

      const { data: applications, error: applicationsError } = await query

      if (applicationsError) {
        console.error('Error loading applications:', applicationsError)
        throw applicationsError
      }

      // If we have applications, fetch the related jobs
      if (applications && applications.length > 0) {
        const jobIds = [...new Set(applications.map(app => app.job_id))]
        const { data: jobs, error: jobsError } = await supabase
          .from('jobs')
          .select('id, title, location')
          .in('id', jobIds)

        if (jobsError) {
          console.error('Error loading jobs:', jobsError)
          // Continue without job data rather than failing completely
        }

        // Merge job data into applications
        const applicationsWithJobs = applications.map(app => ({
          ...app,
          jobs: jobs?.find(job => job.id === app.job_id) || null,
        }))

        setApplications(applicationsWithJobs)
      } else {
        setApplications([])
      }
    } catch (error) {
      console.error('Error loading applications:', error)
      // Show more details about the error
      if (error instanceof Error) {
        console.error('Error message:', error.message)
        console.error('Error stack:', error.stack)
      } else {
        console.error('Error object:', JSON.stringify(error, null, 2))
      }
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus })
        .eq('id', applicationId)

      if (error) throw error
      loadApplications()
      if (selectedApplication?.id === applicationId) {
        setSelectedApplication({ ...selectedApplication, status: newStatus })
      }
    } catch (error: any) {
      console.error('Error updating status:', error)
      alert(`Failed to update status: ${error.message}`)
    }
  }

  const handleNotesUpdate = async (applicationId: string, notes: string) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('job_applications')
        .update({ notes })
        .eq('id', applicationId)

      if (error) throw error
      loadApplications()
    } catch (error: any) {
      console.error('Error updating notes:', error)
      alert(`Failed to update notes: ${error.message}`)
    }
  }

  const filteredApplications = applications.filter(app => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      app.name.toLowerCase().includes(query) ||
      app.email.toLowerCase().includes(query) ||
      app.jobs?.title.toLowerCase().includes(query) ||
      app.jobs?.location.toLowerCase().includes(query)
    )
  })

  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      reviewing: 'bg-yellow-100 text-yellow-800',
      interviewing: 'bg-purple-100 text-purple-800',
      rejected: 'bg-red-100 text-red-800',
      hired: 'bg-green-100 text-green-800',
    }
    return styles[status as keyof typeof styles] || styles.new
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Clock className="w-4 h-4" />
      case 'reviewing':
        return <Eye className="w-4 h-4" />
      case 'interviewing':
        return <Eye className="w-4 h-4" />
      case 'rejected':
        return <XCircle className="w-4 h-4" />
      case 'hired':
        return <CheckCircle2 className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <button
          onClick={() => router.push('/admin/careers')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Careers
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
        <p className="text-gray-600 mt-2">Review and manage candidate applications</p>
      </div>

      {/* Filters and Search */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['all', 'new', 'reviewing', 'interviewing', 'rejected', 'hired'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-600">No applications found.</p>
            </div>
          ) : (
            filteredApplications.map((app) => (
              <div
                key={app.id}
                className={`card cursor-pointer transition-all ${
                  selectedApplication?.id === app.id ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => setSelectedApplication(app)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{app.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusBadge(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{app.email}</p>
                    {app.phone && <p className="text-sm text-gray-600 mb-1">{app.phone}</p>}
                    {app.jobs && (
                      <p className="text-sm font-medium text-gray-900 mb-1">
                        {app.jobs.title} – {app.jobs.location}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Applied: {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Application Details */}
        <div className="lg:col-span-1">
          {selectedApplication ? (
            <div className="card sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Application Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedApplication.status}
                    onChange={(e) => handleStatusChange(selectedApplication.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="rejected">Rejected</option>
                    <option value="hired">Hired</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {selectedApplication.name}</p>
                    <p><strong>Email:</strong> <a href={`mailto:${selectedApplication.email}`} className="text-primary-600 hover:underline">{selectedApplication.email}</a></p>
                    {selectedApplication.phone && (
                      <p><strong>Phone:</strong> <a href={`tel:${selectedApplication.phone}`} className="text-primary-600 hover:underline">{selectedApplication.phone}</a></p>
                    )}
                  </div>
                </div>

                {selectedApplication.jobs && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <p className="text-sm">{selectedApplication.jobs.title} – {selectedApplication.jobs.location}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Documents</label>
                  <div className="space-y-2">
                    {selectedApplication.resume_url && (
                      <DocumentLink
                        fileName={selectedApplication.resume_url}
                        label="Resume"
                      />
                    )}
                    {selectedApplication.cover_letter_url && (
                      <DocumentLink
                        fileName={selectedApplication.cover_letter_url}
                        label="Cover Letter"
                      />
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={selectedApplication.notes || ''}
                    onChange={(e) => {
                      setSelectedApplication({ ...selectedApplication, notes: e.target.value })
                      handleNotesUpdate(selectedApplication.id, e.target.value)
                    }}
                    placeholder="Add internal notes..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-600">Select an application to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

