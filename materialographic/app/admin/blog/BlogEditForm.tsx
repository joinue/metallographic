'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import type { BlogPost } from '@/lib/supabase'
import { ArrowLeft, Save, Upload, X, Eye, EyeOff, Image as ImageIcon, Loader2, Bold, Italic, List, Link as LinkIcon, Heading2, Code, FileText, Edit, Tag, Rocket } from 'lucide-react'
import Image from 'next/image'

interface BlogEditFormProps {
  post: BlogPost | null
}

const CATEGORIES = [
  'Announcement',
  'Tips & Techniques',
  'Case Study',
  'Industry News',
  'Best Practices',
  'Material Guide',
  'Equipment Review',
  'Standards Update',
  'General',
]

export default function BlogEditForm({ post }: BlogEditFormProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || 'General',
    tags: post?.tags || [],
    image: post?.image || '',
    author: post?.author || '',
    read_time: post?.read_time || '2 min read',
    status: post?.status || 'draft',
    featured: post?.featured || false,
  })

  const [tagInput, setTagInput] = useState('')
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null)
  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'categorization' | 'media' | 'publishing'>('basic')

  // Auto-generate slug from title
  useEffect(() => {
    if (!post && formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, post])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      const newTag = tagInput.trim().toLowerCase()
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }))
      }
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      const supabase = createClient()
      
      // Verify user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        throw new Error('You must be logged in to upload images')
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `blog-images/${fileName}`

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      setFormData(prev => ({ ...prev, image: publicUrl }))
    } catch (error: any) {
      console.error('Error uploading image:', error)
      setError(error.message || 'Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const supabase = createClient()
      
      // Verify user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        throw new Error('You must be logged in to save blog posts. Please log in again.')
      }

      const submitData: any = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: formData.tags,
        image: formData.image || null,
        author: formData.author || null,
        read_time: formData.read_time,
        status: formData.status,
        featured: formData.featured,
        updated_by: user.id,
      }

      // Set published_at if publishing for the first time
      if (formData.status === 'published' && !post?.published_at) {
        submitData.published_at = new Date().toISOString()
      }

      if (post) {
        // Update existing post
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(submitData)
          .eq('id', post.id)

        if (updateError) {
          console.error('Update error details:', updateError)
          throw new Error(updateError.message || 'Failed to update blog post')
        }
      } else {
        // Create new post
        submitData.created_by = user.id
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert([submitData])

        if (insertError) {
          console.error('Insert error details:', insertError)
          throw new Error(insertError.message || 'Failed to create blog post')
        }
      }

      router.push('/admin/blog')
      router.refresh()
    } catch (error: any) {
      console.error('Error saving blog post:', error)
      setError(error.message || 'Failed to save blog post. Please try again.')
      setSaving(false)
    }
  }

  const calculateReadTime = (content: string) => {
    // Rough estimate: 200 words per minute
    const text = content.replace(/<[^>]*>/g, '') // Remove HTML tags
    const words = text.trim().split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${minutes} min read`
  }

  const insertHTML = (before: string, after: string = '') => {
    const textarea = contentTextareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    const newText = formData.content.substring(0, start) + before + selectedText + after + formData.content.substring(end)
    
    setFormData(prev => ({ ...prev, content: newText }))
    
    // Restore cursor position after state update
    setTimeout(() => {
      textarea.focus()
      const newPosition = start + before.length + selectedText.length + after.length
      textarea.setSelectionRange(newPosition, newPosition)
    }, 10)
  }

  const insertHTMLTag = (tag: string, isBlock: boolean = false) => {
    insertHTML(`<${tag}>`, `</${tag}>`)
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setFormData(prev => ({ ...prev, content }))
    
    // Auto-calculate read time
    if (content) {
      const readTime = calculateReadTime(content)
      setFormData(prev => ({ ...prev, read_time: readTime }))
    }
  }

  return (
    <div className="min-h-screen">
      <div className="py-8">
        <div className="container-custom max-w-7xl mx-auto px-4">
          {/* Header */}
          <header className="mb-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/blog')}
                className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex-shrink-0"
                aria-label="Go back to blog posts"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight m-0">
                {post ? 'Edit Blog Post' : 'Create New Post'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-all duration-200 font-medium text-sm"
              >
                {showPreview ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide Preview
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Show Preview
                  </>
                )}
              </button>
            </div>
          </header>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-r-lg shadow-sm animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <div className={`grid gap-6 transition-all duration-300 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {/* Main Form */}
          <div className={showPreview ? 'lg:col-span-1' : ''}>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200 bg-gray-50">
                <nav className="flex overflow-x-auto" aria-label="Tabs">
                  {[
                    { id: 'basic', label: 'Basic Info', icon: FileText },
                    { id: 'content', label: 'Content', icon: Edit },
                    { id: 'categorization', label: 'Categories & Tags', icon: Tag },
                    { id: 'media', label: 'Media', icon: ImageIcon },
                    { id: 'publishing', label: 'Publishing', icon: Rocket },
                  ].map((tab) => {
                    const IconComponent = tab.icon
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap ${
                          activeTab === tab.id
                            ? 'border-primary-500 text-primary-600 bg-white'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
              
              <div className="p-6">
              {/* Basic Information Tab */}
              {activeTab === 'basic' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-lg font-medium"
                    placeholder="Enter a compelling title..."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="slug" className="block text-sm font-semibold text-gray-700">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    pattern="[a-z0-9-]+"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 font-mono text-sm bg-gray-50"
                    placeholder="url-friendly-slug"
                  />
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    URL-friendly identifier (lowercase, hyphens only)
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700">
                    Excerpt <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none"
                    placeholder="Write a compelling excerpt that will appear in blog listings..."
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Short description shown in blog listings
                    </p>
                    <span className={`text-xs font-medium ${formData.excerpt.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                      {formData.excerpt.length} / 160
                    </span>
                  </div>
                </div>

              </div>
              )}

              {/* Content Tab */}
              {activeTab === 'content' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
                      Content (HTML) <span className="text-red-500">*</span>
                    </label>
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-lg">
                      {formData.read_time}
                    </span>
                  </div>
                  
                  {/* HTML Toolbar */}
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 border-2 border-b-0 border-gray-200 rounded-t-xl">
                    <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                      <button
                        type="button"
                        onClick={() => insertHTMLTag('strong')}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Bold"
                      >
                        <Bold className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertHTMLTag('em')}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Italic"
                      >
                        <Italic className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertHTMLTag('code')}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Inline Code"
                      >
                        <Code className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                      <button
                        type="button"
                        onClick={() => insertHTMLTag('h2', true)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Heading 2"
                      >
                        <Heading2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertHTMLTag('h3', true)}
                        className="px-2 py-1 hover:bg-gray-200 rounded-lg transition-colors text-xs font-semibold text-gray-600"
                        title="Heading 3"
                      >
                        H3
                      </button>
                    </div>
                    <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt('Enter URL:')
                          if (url) {
                            const text = prompt('Enter link text:', url) || url
                            const textarea = contentTextareaRef.current
                            if (textarea) {
                              const start = textarea.selectionStart
                              const end = textarea.selectionEnd
                              const selectedText = formData.content.substring(start, end)
                              const linkText = selectedText || text
                              const newText = formData.content.substring(0, start) + `<a href="${url}">${linkText}</a>` + formData.content.substring(end)
                              setFormData(prev => ({ ...prev, content: newText }))
                              setTimeout(() => {
                                textarea.focus()
                                const newPosition = start + `<a href="${url}">${linkText}</a>`.length
                                textarea.setSelectionRange(newPosition, newPosition)
                              }, 10)
                            }
                          }
                        }}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Insert Link"
                      >
                        <LinkIcon className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => insertHTML('<ul>\n  <li>', '</li>\n</ul>')}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        title="Unordered List"
                      >
                        <List className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertHTML('<ol>\n  <li>', '</li>\n</ol>')}
                        className="px-2 py-1 hover:bg-gray-200 rounded-lg transition-colors text-xs font-semibold text-gray-600"
                        title="Ordered List"
                      >
                        1.
                      </button>
                    </div>
                    <div className="ml-auto flex items-center gap-2 text-xs text-gray-500">
                      <span>Tip: Select text to wrap with tags</span>
                    </div>
                  </div>
                  
                  <div className="border-2 border-gray-200 rounded-b-xl overflow-hidden focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500 transition-all duration-200">
                    <textarea
                      ref={contentTextareaRef}
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleContentChange}
                      required
                      rows={12}
                      className="w-full px-4 py-3 focus:outline-none font-mono text-sm resize-y bg-white"
                      placeholder="Start typing or use the toolbar above to insert HTML tags...&#10;&#10;You can also type HTML directly:&#10;&lt;p&gt;Your paragraph here&lt;/p&gt;&#10;&lt;h2&gt;Your heading&lt;/h2&gt;&#10;&lt;ul&gt;&#10;  &lt;li&gt;List item&lt;/li&gt;&#10;&lt;/ul&gt;"
                    />
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    HTML content for the blog post. Use the toolbar above or type HTML directly. Read time is auto-calculated.
                  </p>
                </div>
              </div>
              )}

              {/* Categorization Tab */}
              {activeTab === 'categorization' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-2">
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white appearance-none cursor-pointer hover:border-gray-300"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="tags" className="block text-sm font-semibold text-gray-700">
                    Tags
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Type a tag and press Enter to add"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                    />
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl min-h-[3.5rem] border border-gray-200">
                        {formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full text-sm font-medium shadow-sm hover:shadow transition-all duration-200 group"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    Press Enter to add a tag. Tags help readers discover your content.
                  </p>
                </div>
              </div>
              )}

              {/* Media Tab */}
              {activeTab === 'media' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700">
                    Featured Image
                  </label>
                  <div className="space-y-4">
                    {formData.image && (
                      <div className="relative w-full h-64 border-2 border-gray-200 rounded-xl overflow-hidden bg-gray-100 shadow-lg group">
                        <Image
                          src={formData.image}
                          alt="Featured image"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200"></div>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                          className="absolute top-3 right-3 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200 shadow-lg hover:scale-110"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed rounded-xl transition-all duration-200 cursor-pointer ${
                          uploading
                            ? 'border-primary-400 bg-primary-50'
                            : 'border-gray-300 hover:border-primary-500 hover:bg-primary-50 hover:shadow-md'
                        }`}
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                            <span className="text-sm font-medium text-primary-700">Uploading...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                            <span className="text-sm font-medium text-gray-600">Upload Image</span>
                          </>
                        )}
                      </label>
                    </div>
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        value={formData.image}
                        onChange={handleChange}
                        name="image"
                        placeholder="Or enter image URL"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      />
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      Upload to Supabase storage or enter a URL. Max 5MB. Recommended: 1200x630px
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="author" className="block text-sm font-semibold text-gray-700">
                      Author
                    </label>
                    <input
                      type="text"
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="Author name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="read_time" className="block text-sm font-semibold text-gray-700">
                      Read Time
                    </label>
                    <input
                      type="text"
                      id="read_time"
                      name="read_time"
                      value={formData.read_time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="2 min read"
                    />
                    <p className="text-xs text-gray-500">Auto-calculated or enter manually</p>
                  </div>
                </div>
              </div>
              )}

              {/* Publishing Tab */}
              {activeTab === 'publishing' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="status" className="block text-sm font-semibold text-gray-700">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white appearance-none cursor-pointer hover:border-gray-300"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-colors">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="featured" className="flex-1 block text-sm font-medium text-gray-700 cursor-pointer">
                      Featured Post
                    </label>
                    {formData.featured && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>
              )}

              {/* Actions - Always visible */}
              <div className="flex items-center justify-end gap-3 pt-6 mt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:shadow"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {post ? 'Update Post' : 'Create Post'}
                    </>
                  )}
                </button>
              </div>
              </div>
            </form>
          </div>

          {/* Preview Sidebar */}
          {showPreview && (
            <div className="lg:col-span-1">
              <div className="shadow-lg rounded-xl border border-gray-200 p-6 sticky top-8 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 -m-6 mb-6 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary-600" />
                    Live Preview
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">How your post will appear to readers</p>
                </div>
                <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                  {formData.image && (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 shadow-md">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold border border-primary-100">
                      {formData.category || 'General'}
                    </span>
                    <span className="text-xs text-gray-500">{formData.read_time}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    {formData.title || <span className="text-gray-400 italic">Untitled Post</span>}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {formData.excerpt || <span className="text-gray-400 italic">No excerpt provided</span>}
                  </p>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4">
                    <div
                      className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700"
                      dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-400 italic">No content yet. Start writing to see a preview.</p>' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}
