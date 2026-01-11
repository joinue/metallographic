'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Upload, X, Trash2, Plus, FolderOpen, Search, ImageIcon, Loader2, Star, Grid3x3, ChevronRight, Eye, Video, Youtube } from 'lucide-react'
import { createClient } from '@/lib/supabase-client'
import { getEquipmentImageUrl } from '@/lib/storage'
import LoadingSpinner from '@/components/LoadingSpinner'

interface ImageItem {
  url: string
  alt?: string
  caption?: string
  mediaType?: 'image' | 'video'
}

interface EquipmentImageManagerProps {
  primaryImageUrl: string
  additionalImages: ImageItem[]
  onPrimaryImageChange: (url: string) => void
  onAdditionalImagesChange: (images: ImageItem[]) => void
  category?: string
  subcategory?: string
  itemId?: string
  itemSlug?: string
}

interface StorageFile {
  name: string
  path: string
  url: string
  folder?: string
}

export default function EquipmentImageManager({
  primaryImageUrl,
  additionalImages,
  onPrimaryImageChange,
  onAdditionalImagesChange,
  category,
  subcategory,
  itemId,
  itemSlug,
}: EquipmentImageManagerProps) {
  const [uploading, setUploading] = useState(false)
  const [showBrowser, setShowBrowser] = useState(false)
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [storageFiles, setStorageFiles] = useState<StorageFile[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFolder, setSelectedFolder] = useState<string>('equipment')
  const [folders, setFolders] = useState<string[]>([])
  const [previewImage, setPreviewImage] = useState<StorageFile | null>(null)
  const [showVideoInput, setShowVideoInput] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const additionalFileInputRef = useRef<HTMLInputElement>(null)
  const videoFileInputRef = useRef<HTMLInputElement>(null)

  // Generate storage path based on equipment info
  const getStoragePath = (filename: string): string => {
    const sanitize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    let path = 'equipment'
    
    if (category) {
      path += `/${sanitize(category)}`
    }
    
    if (subcategory) {
      path += `/${sanitize(subcategory)}`
    }
    
    if (itemSlug || itemId) {
      const itemName = itemSlug || itemId?.toLowerCase() || 'unknown'
      path += `/${sanitize(itemName)}`
    }
    
    // Generate unique filename
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const ext = filename.split('.').pop()?.toLowerCase() || 'jpg'
    const baseName = filename.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase()
    
    return `${path}/${baseName}-${timestamp}-${random}.${ext}`
  }

  // Load storage files with folder structure
  const loadStorageFiles = async (folder: string = 'equipment') => {
    setLoadingFiles(true)
    try {
      const supabase = createClient()
      const files: StorageFile[] = []
      const folderSet = new Set<string>()

      const listFilesRecursively = async (path: string, depth: number = 0) => {
        const { data, error } = await supabase.storage
          .from('equipment-images')
          .list(path, {
            limit: 1000,
            sortBy: { column: 'name', order: 'asc' }
          })

        if (error) {
          console.error(`Error listing ${path}:`, error)
          return
        }

        for (const item of data || []) {
          const fullPath = path === 'equipment' ? `equipment/${item.name}` : `${path}/${item.name}`
          
          if (!item.id) {
            // It's a folder
            if (depth < 3) { // Limit depth to avoid too many folders
              folderSet.add(fullPath)
              await listFilesRecursively(fullPath, depth + 1)
            }
          } else {
            // It's a file
            const ext = item.name.toLowerCase().split('.').pop()
            if (['webp', 'png', 'jpg', 'jpeg'].includes(ext || '')) {
              const { data: urlData } = supabase.storage
                .from('equipment-images')
                .getPublicUrl(fullPath)
              
              files.push({
                name: item.name,
                path: fullPath,
                url: urlData.publicUrl,
                folder: path,
              })
            }
          }
        }
      }

      await listFilesRecursively(folder)
      setStorageFiles(files)
      setFolders(Array.from(folderSet).sort())
    } catch (error) {
      console.error('Error loading storage files:', error)
    } finally {
      setLoadingFiles(false)
    }
  }

  // Helper function to detect if URL is a video
  const isVideoUrl = (url: string): boolean => {
    if (!url) return false
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('.mp4') || url.includes('.webm') || url.includes('.mov')
  }

  // Helper function to extract YouTube video ID
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    return match ? match[1] : null
  }

  // Upload image to storage
  const handleImageUpload = async (file: File, isPrimary: boolean = false) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const supabase = createClient()
      
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        throw new Error('You must be logged in to upload images')
      }

      const storagePath = getStoragePath(file.name)

      const { error: uploadError } = await supabase.storage
        .from('equipment-images')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('equipment-images')
        .getPublicUrl(storagePath)

      if (isPrimary) {
        onPrimaryImageChange(publicUrl)
      } else {
        onAdditionalImagesChange([
          ...additionalImages,
          { url: publicUrl, alt: '', caption: '', mediaType: 'image' }
        ])
      }

      // Refresh storage files
      await loadStorageFiles(selectedFolder)
    } catch (error: any) {
      console.error('Error uploading image:', error)
      alert(error.message || 'Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
      if (additionalFileInputRef.current) additionalFileInputRef.current.value = ''
    }
  }

  // Delete image from storage
  const handleDeleteFromStorage = async (path: string) => {
    if (!confirm('Are you sure you want to delete this image from storage? This action cannot be undone.')) {
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.storage
        .from('equipment-images')
        .remove([path])

      if (error) throw error

      // Remove from form if it's being used
      if (primaryImageUrl && primaryImageUrl.includes(path)) {
        onPrimaryImageChange('')
      }
      
      const updatedImages = additionalImages.filter(img => !img.url.includes(path))
      onAdditionalImagesChange(updatedImages)

      // Refresh storage files
      await loadStorageFiles(selectedFolder)
    } catch (error: any) {
      console.error('Error deleting image:', error)
      alert(error.message || 'Failed to delete image')
    }
  }

  // Remove image from form (but keep in storage)
  const handleRemoveFromForm = (index: number) => {
    const updated = additionalImages.filter((_, i) => i !== index)
    onAdditionalImagesChange(updated)
  }

  // Handle video URL addition (YouTube or direct video URL)
  const handleAddVideoUrl = () => {
    if (!videoUrl.trim()) {
      alert('Please enter a video URL')
      return
    }

    const isVideo = isVideoUrl(videoUrl)
    if (!isVideo) {
      alert('Please enter a valid video URL (YouTube or direct video file)')
      return
    }

    onAdditionalImagesChange([
      ...additionalImages,
      { url: videoUrl.trim(), alt: '', caption: '', mediaType: 'video' }
    ])
    setVideoUrl('')
    setShowVideoInput(false)
  }

  // Upload video file to storage
  const handleVideoUpload = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('Please select a video file')
      return
    }

    if (file.size > 100 * 1024 * 1024) {
      alert('Video size must be less than 100MB')
      return
    }

    setUploading(true)
    try {
      const supabase = createClient()
      
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        throw new Error('You must be logged in to upload videos')
      }

      // Generate storage path for videos (similar to images but in videos bucket)
      const sanitize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      
      let path = 'equipment'
      if (category) {
        path += `/${sanitize(category)}`
      }
      if (subcategory) {
        path += `/${sanitize(subcategory)}`
      }
      if (itemSlug || itemId) {
        const itemName = itemSlug || itemId?.toLowerCase() || 'unknown'
        path += `/${sanitize(itemName)}`
      }
      
      const timestamp = Date.now()
      const random = Math.random().toString(36).substring(7)
      const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4'
      const baseName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase()
      const storagePath = `${path}/${baseName}-${timestamp}-${random}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(storagePath)

      onAdditionalImagesChange([
        ...additionalImages,
        { url: publicUrl, alt: '', caption: '', mediaType: 'video' }
      ])

      // Refresh storage files
      await loadStorageFiles(selectedFolder)
    } catch (error: any) {
      console.error('Error uploading video:', error)
      alert(error.message || 'Failed to upload video. Please try again.')
    } finally {
      setUploading(false)
      if (videoFileInputRef.current) videoFileInputRef.current.value = ''
    }
  }

  // Filter files by search and folder
  const filteredFiles = storageFiles.filter(file => {
    const matchesSearch = !searchQuery || 
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.path.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFolder = selectedFolder === 'equipment' || file.folder?.startsWith(selectedFolder)
    return matchesSearch && matchesFolder
  })

  useEffect(() => {
    if (showBrowser) {
      loadStorageFiles(selectedFolder)
    }
  }, [showBrowser, selectedFolder])

  return (
    <div className="space-y-6">
      {/* Primary Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary/Cover Image
        </label>
        
        {primaryImageUrl ? (
          <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
            <Image
              src={getEquipmentImageUrl(primaryImageUrl) || primaryImageUrl}
              alt="Primary image"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 448px"
            />
            <button
              type="button"
              onClick={() => onPrimaryImageChange('')}
              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              title="Remove primary image"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              Primary Image
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-sm text-gray-600 mb-4">No primary image set</p>
          </div>
        )}

        <div className="flex items-center gap-3 mt-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImageUpload(file, true)
            }}
            className="hidden"
            id="primary-image-upload"
          />
          <label
            htmlFor="primary-image-upload"
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload Primary Image
              </>
            )}
          </label>
          
          <button
            type="button"
            onClick={() => {
              setShowBrowser(true)
              loadStorageFiles()
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FolderOpen className="w-4 h-4" />
            Browse & Attach from Storage
          </button>
        </div>
      </div>

      {/* Additional Images Gallery */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Images ({additionalImages.length})
        </label>

            {additionalImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {additionalImages.map((img, index) => {
              const isVideo = img.mediaType === 'video' || isVideoUrl(img.url)
              const videoId = isVideo ? getYouTubeVideoId(img.url) : null
              
              return (
              <div key={index} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  {isVideo && videoId ? (
                    <div className="relative w-full h-full">
                      <img
                        src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                        alt={img.alt || `Video ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  ) : isVideo ? (
                    <video
                      src={img.url}
                      className="w-full h-full object-cover"
                      muted
                    />
                  ) : (
                    <Image
                      src={getEquipmentImageUrl(img.url) || img.url}
                      alt={img.alt || `Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveFromForm(index)}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove from gallery"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {isVideo && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold">
                      VIDEO
                    </div>
                  )}
                </div>
                <div className="mt-2 space-y-1">
                  <input
                    type="text"
                    placeholder="Alt text"
                    value={img.alt || ''}
                    onChange={(e) => {
                      const updated = [...additionalImages]
                      updated[index] = { ...updated[index], alt: e.target.value }
                      onAdditionalImagesChange(updated)
                    }}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Caption"
                    value={img.caption || ''}
                    onChange={(e) => {
                      const updated = [...additionalImages]
                      updated[index] = { ...updated[index], caption: e.target.value }
                      onAdditionalImagesChange(updated)
                    }}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  />
                </div>
              </div>
            )
            })}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
            <p className="text-sm text-gray-600">No additional images</p>
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <input
            ref={additionalFileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleImageUpload(file, false)
            }}
            className="hidden"
            id="additional-image-upload"
          />
          <label
            htmlFor="additional-image-upload"
            className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-700 hover:border-primary-500 hover:text-primary-600 cursor-pointer transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Upload New Image
              </>
            )}
          </label>
          <input
            ref={videoFileInputRef}
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleVideoUpload(file)
            }}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-700 hover:border-blue-500 hover:text-blue-600 cursor-pointer transition-colors"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Video className="w-4 h-4" />
                Upload Video
              </>
            )}
          </label>
          <button
            type="button"
            onClick={() => setShowVideoInput(!showVideoInput)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-red-300 rounded-lg text-red-700 hover:border-red-500 hover:text-red-600 transition-colors"
          >
            <Youtube className="w-4 h-4" />
            Add YouTube Video
          </button>
          <button
            type="button"
            onClick={() => {
              setShowBrowser(true)
              loadStorageFiles()
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <FolderOpen className="w-4 h-4" />
            Browse & Attach from Storage
          </button>
        </div>
        {showVideoInput && (
          <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Video URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
              />
              <button
                type="button"
                onClick={handleAddVideoUrl}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowVideoInput(false)
                  setVideoUrl('')
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Storage Browser Modal */}
      {showBrowser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Image Library - Browse & Attach</h3>
                <button
                  type="button"
                  onClick={() => setShowBrowser(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <button
                  type="button"
                  onClick={() => setSelectedFolder('equipment')}
                  className="hover:text-primary-600 transition-colors"
                >
                  Equipment
                </button>
                {selectedFolder !== 'equipment' && selectedFolder.split('/').slice(1).map((segment, idx, arr) => {
                  const path = 'equipment/' + arr.slice(0, idx + 1).join('/')
                  return (
                    <span key={idx} className="flex items-center gap-2">
                      <ChevronRight className="w-3 h-3" />
                      <button
                        type="button"
                        onClick={() => setSelectedFolder(path)}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {segment}
                      </button>
                    </span>
                  )
                })}
              </div>
            </div>

            <div className="p-4 border-b space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search images by name or path..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
              </div>

              {folders.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600 font-medium">Quick Navigation:</span>
                  <div className="flex flex-wrap gap-2">
                    {folders
                      .filter(f => f.startsWith(selectedFolder) && f.split('/').length === selectedFolder.split('/').length + 1)
                      .slice(0, 10)
                      .map(folder => {
                        const folderName = folder.split('/').pop()
                        return (
                          <button
                            key={folder}
                            type="button"
                            onClick={() => setSelectedFolder(folder)}
                            className="px-2 py-1 text-xs bg-gray-100 hover:bg-primary-100 hover:text-primary-700 rounded transition-colors"
                          >
                            {folderName}
                          </button>
                        )
                      })}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {loadingFiles ? (
                <div className="text-center py-12">
                  <LoadingSpinner size="md" />
                </div>
              ) : filteredFiles.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredFiles.map((file, index) => {
                    const isPrimary = primaryImageUrl === file.url
                    const isInGallery = additionalImages.some(img => img.url === file.url)
                    
                    return (
                      <div key={index} className="relative group">
                        <div className="relative aspect-square rounded-lg overflow-hidden border-2 transition-all w-full border-gray-200 hover:border-primary-500">
                          <Image
                            src={file.url}
                            alt={file.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                          />
                          
                          {/* Status Badge */}
                          {(isPrimary || isInGallery) && (
                            <div className="absolute top-2 left-2 z-10">
                              <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                isPrimary 
                                  ? 'bg-yellow-500 text-white' 
                                  : 'bg-green-500 text-white'
                              }`}>
                                {isPrimary ? <Star className="w-3 h-3 inline mr-1" /> : <Grid3x3 className="w-3 h-3 inline mr-1" />}
                                {isPrimary ? 'Primary' : 'In Gallery'}
                              </span>
                            </div>
                          )}

                          {/* Action Buttons on Hover */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center z-10">
                            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              {!isPrimary && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onPrimaryImageChange(file.url)
                                    setShowBrowser(false)
                                  }}
                                  className="flex items-center gap-2 px-3 py-2 bg-yellow-500 text-white rounded text-sm font-medium hover:bg-yellow-600 transition-colors shadow-lg"
                                  title="Set as primary image"
                                >
                                  <Star className="w-4 h-4" />
                                  Set Primary
                                </button>
                              )}
                              {!isInGallery && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const isVideo = isVideoUrl(file.url)
                                    onAdditionalImagesChange([
                                      ...additionalImages,
                                      { url: file.url, alt: '', caption: '', mediaType: isVideo ? 'video' : 'image' }
                                    ])
                                  }}
                                  className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded text-sm font-medium hover:bg-primary-700 transition-colors shadow-lg"
                                  title="Add to gallery"
                                >
                                  <Grid3x3 className="w-4 h-4" />
                                  Add to Gallery
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => setPreviewImage(file)}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg"
                                title="Preview image"
                              >
                                <Eye className="w-4 h-4" />
                                Preview
                              </button>
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteFromStorage(file.path)
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-red-700"
                            title="Delete from storage"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        
                        {/* Image Info */}
                        <div className="mt-2 space-y-1">
                          <div className="text-xs font-medium text-gray-900 truncate" title={file.name}>
                            {file.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate" title={file.path}>
                            {file.folder?.replace('equipment/', '') || 'equipment'}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  No images found
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="w-8 h-8" />
          </button>
          <div 
            className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={previewImage.url}
                alt={previewImage.name}
                fill
                className="object-contain"
                sizes="100vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
                <div className="max-w-4xl mx-auto">
                  <p className="font-semibold">{previewImage.name}</p>
                  <p className="text-sm text-gray-300 mt-1">{previewImage.path}</p>
                  <div className="flex gap-2 mt-4">
                    {primaryImageUrl !== previewImage.url && (
                      <button
                        type="button"
                        onClick={() => {
                          onPrimaryImageChange(previewImage.url)
                          setPreviewImage(null)
                          setShowBrowser(false)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                      >
                        <Star className="w-4 h-4" />
                        Set as Primary
                      </button>
                    )}
                    {!additionalImages.some(img => img.url === previewImage.url) && (
                      <button
                        type="button"
                        onClick={() => {
                          const isVideo = isVideoUrl(previewImage.url)
                          onAdditionalImagesChange([
                            ...additionalImages,
                            { url: previewImage.url, alt: '', caption: '', mediaType: isVideo ? 'video' : 'image' }
                          ])
                          setPreviewImage(null)
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                      >
                        <Grid3x3 className="w-4 h-4" />
                        Add to Gallery
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

