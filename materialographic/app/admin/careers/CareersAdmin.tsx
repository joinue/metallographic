'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Plus, Search, Edit, Trash2, Eye, EyeOff, FileText, Users } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'
import Link from 'next/link'

interface Job {
  id: string
  title: string
  location: string
  job_type: string
  status: string
  summary: string
  created_at: string
  order_index: number
}

export default function CareersAdmin() {
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'active' | 'closed'>('all')

  useEffect(() => {
    loadJobs()
  }, [])

  useEffect(() => {
    loadJobs()
  }, [filterStatus])

  const loadJobs = async () => {
    try {
      const supabase = createClient()
      let query = supabase
        .from('jobs')
        .select('*')
        .order('order_index', { ascending: true })
        .order('created_at', { ascending: false })

      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus)
      }

      const { data, error } = await query

      if (error) throw error
      setJobs(data || [])
    } catch (error) {
      console.error('Error loading jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id)

      if (error) throw error
      loadJobs()
    } catch (error: any) {
      console.error('Error deleting job:', error)
      alert(`Failed to delete job: ${error.message}`)
    }
  }

  const handleToggleStatus = async (job: Job) => {
    const newStatus = job.status === 'active' ? 'draft' : 'active'
    
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('jobs')
        .update({ status: newStatus })
        .eq('id', job.id)

      if (error) throw error
      loadJobs()
    } catch (error: any) {
      console.error('Error updating status:', error)
      alert(`Failed to update status: ${error.message}`)
    }
  }

  const filteredJobs = jobs.filter(job => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      job.title.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.summary.toLowerCase().includes(query)
    )
  })

  const formatJobType = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      closed: 'bg-red-100 text-red-800',
    }
    return styles[status as keyof typeof styles] || styles.draft
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Careers Management</h1>
          <p className="text-gray-600 mt-2">Manage job postings and applications</p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/admin/careers/applications"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            View Applications
          </Link>
          <button
            onClick={() => router.push('/admin/careers/new')}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Career Posting
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {(['all', 'draft', 'active', 'closed'] as const).map((status) => (
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

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-600 mb-4">
            {searchQuery ? 'No jobs found matching your search.' : 'No jobs found.'}
          </p>
          <button
            onClick={() => router.push('/admin/careers/new')}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Create Your First Career Posting
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(job.status)}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{formatJobType(job.job_type)}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{job.summary}</p>
                  <p className="text-xs text-gray-500">
                    Created: {new Date(job.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleToggleStatus(job)}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    title={job.status === 'active' ? 'Hide from careers page' : 'Show on careers page'}
                  >
                    {job.status === 'active' ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => router.push(`/admin/careers/${job.id}`)}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                    title="Edit job"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id, job.title)}
                    className="p-2 text-red-600 hover:text-red-700 transition-colors"
                    title="Delete job"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

