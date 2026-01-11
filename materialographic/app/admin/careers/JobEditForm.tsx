'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'

interface Job {
  id: string
  title: string
  location: string
  job_type: string
  status: string
  summary: string
  description?: string | null
  key_responsibilities?: string | null
  qualifications?: string | null
  preferred_qualifications?: string | null
  order_index: number
}

interface JobEditFormProps {
  job: Job | null
}

export default function JobEditForm({ job }: JobEditFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    job_type: 'full-time',
    status: 'draft',
    summary: '',
    description: '',
    key_responsibilities: '',
    qualifications: '',
    preferred_qualifications: '',
    order_index: 0,
  })

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || '',
        location: job.location || '',
        job_type: job.job_type || 'full-time',
        status: job.status || 'draft',
        summary: job.summary || '',
        description: job.description || '',
        key_responsibilities: typeof job.key_responsibilities === 'string' 
          ? job.key_responsibilities 
          : JSON.stringify(job.key_responsibilities || []),
        qualifications: typeof job.qualifications === 'string'
          ? job.qualifications
          : JSON.stringify(job.qualifications || []),
        preferred_qualifications: typeof job.preferred_qualifications === 'string'
          ? job.preferred_qualifications
          : JSON.stringify(job.preferred_qualifications || []),
        order_index: job.order_index || 0,
      })
    }
    setLoading(false)
  }, [job])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (field: string, value: string) => {
    // Convert textarea value (one item per line) to JSON array
    const items = value.split('\n').filter(line => line.trim() !== '')
    setFormData(prev => ({ ...prev, [field]: JSON.stringify(items) }))
  }

  const getArrayValue = (field: string): string => {
    const value = formData[field as keyof typeof formData]
    if (!value) return ''
    try {
      const parsed = JSON.parse(value as string)
      if (Array.isArray(parsed)) {
        return parsed.join('\n')
      }
    } catch {
      // If not valid JSON, return as is
    }
    return value as string
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      const jobData = {
        ...formData,
        created_by: user?.id,
      }

      if (job) {
        // Update existing job
        const { error } = await supabase
          .from('jobs')
          .update(jobData)
          .eq('id', job.id)

        if (error) throw error
      } else {
        // Create new job
        const { error } = await supabase
          .from('jobs')
          .insert(jobData)

        if (error) throw error
      }

      router.push('/admin/careers')
    } catch (error: any) {
      console.error('Error saving job:', error)
      alert(`Failed to save job: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {job ? 'Edit Career Posting' : 'New Career Posting'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Tucson, AZ"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="job_type" className="block text-sm font-medium text-gray-700 mb-2">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              id="job_type"
              name="job_type"
              required
              value={formData.job_type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="draft">Draft (Not visible)</option>
              <option value="active">Active (Visible on careers page)</option>
              <option value="closed">Closed (No longer accepting applications)</option>
            </select>
          </div>

          <div>
            <label htmlFor="order_index" className="block text-sm font-medium text-gray-700 mb-2">
              Order Index
            </label>
            <input
              type="number"
              id="order_index"
              name="order_index"
              value={formData.order_index}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Lower numbers appear first (0 = first)</p>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
            Summary <span className="text-red-500">*</span>
          </label>
          <textarea
            id="summary"
            name="summary"
            required
            value={formData.summary}
            onChange={handleInputChange}
            rows={3}
            placeholder="Brief summary of the position..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Full Description (HTML supported)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={8}
            placeholder="Full job description. HTML is supported..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="key_responsibilities" className="block text-sm font-medium text-gray-700 mb-2">
            Key Responsibilities (one per line)
          </label>
          <textarea
            id="key_responsibilities"
            name="key_responsibilities"
            value={getArrayValue('key_responsibilities')}
            onChange={(e) => handleArrayInputChange('key_responsibilities', e.target.value)}
            rows={6}
            placeholder="Enter each responsibility on a new line..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-2">
            Qualifications (one per line)
          </label>
          <textarea
            id="qualifications"
            name="qualifications"
            value={getArrayValue('qualifications')}
            onChange={(e) => handleArrayInputChange('qualifications', e.target.value)}
            rows={6}
            placeholder="Enter each qualification on a new line..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="preferred_qualifications" className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Qualifications (one per line)
          </label>
          <textarea
            id="preferred_qualifications"
            name="preferred_qualifications"
            value={getArrayValue('preferred_qualifications')}
            onChange={(e) => handleArrayInputChange('preferred_qualifications', e.target.value)}
            rows={6}
            placeholder="Enter each preferred qualification on a new line..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Job
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

