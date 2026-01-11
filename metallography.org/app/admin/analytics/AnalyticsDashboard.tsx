'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  BarChart3, 
  FileText, 
  Mail, 
  Eye,
  TrendingUp,
  Users,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  ExternalLink,
  Activity,
  Globe,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
  Link2
} from 'lucide-react'
import TimeRangeSelector from './TimeRangeSelector'
import PageViewsChart from './PageViewsChart'

interface BlogStats {
  total: number
  published: number
  drafts: number
  archived: number
  totalViews: number
  mostViewed: Array<{
    id: string
    slug: string
    title: string
    view_count: number | null
    published_at: string | null
  }>
  recentPosts: Array<{
    id: string
    slug: string
    title: string
    status: string
    created_at: string
  }>
}

interface NewsletterStats {
  total: number
  confirmed: number
  pending: number
  unsubscribed: number
  recentSubscriptions: Array<{
    id: string
    email: string
    status: string
    created_at: string
    confirmed_at: string | null
  }>
}

interface PageViewStats {
  total: number
  uniqueVisitors: number
  uniquePages: number
  timeSeries: {
    hour: Array<{ period: string; views: number }>
    day: Array<{ period: string; views: number }>
    week: Array<{ period: string; views: number }>
    month: Array<{ period: string; views: number }>
  }
  topPages: Array<{ path: string; views: number }>
  countries: Array<{ code: string; name: string; count: number }>
  citiesStates: Array<{ 
    key: string
    city: string | null
    state: string | null
    country: string
    count: number 
  }>
  recentViews: Array<{
    path: string
    country_code: string | null
    country_name: string | null
    region: string | null
    city: string | null
    device_type: string | null
    viewed_at: string
  }>
  deviceTypes: Array<{ type: string; count: number }>
  referrers: {
    byCategory: Array<{ category: string; count: number }>
    bySource: Array<{ source: string; count: number }>
    topReferrers: Array<{ domain: string; count: number }>
  }
}

interface AnalyticsDashboardProps {
  blogStats: BlogStats
  newsletterStats: NewsletterStats
  pageViewStats?: PageViewStats
}

type Tab = 'blog' | 'newsletter' | 'traffic'

export default function AnalyticsDashboard({
  blogStats,
  newsletterStats,
  pageViewStats,
}: AnalyticsDashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('traffic')
  const [chartGranularity, setChartGranularity] = useState<'hour' | 'day' | 'week' | 'month'>('day')

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      published: 'bg-green-100 text-green-700 text-xs',
      draft: 'bg-yellow-100 text-yellow-700 text-xs',
      archived: 'bg-gray-100 text-gray-700 text-xs',
      confirmed: 'bg-green-100 text-green-700 text-xs',
      pending: 'bg-yellow-100 text-yellow-700 text-xs',
      unsubscribed: 'bg-red-100 text-red-700 text-xs',
    }
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-700 text-xs'
  }

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    onClick,
    subtitle,
    trend
  }: { 
    title: string
    value: string | number
    icon: typeof BarChart3
    color: string
    onClick?: () => void
    subtitle?: string
    trend?: string
  }) => {
    const colorClasses = {
      blue: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-blue-200',
      purple: 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 border-purple-200 hover:from-purple-100 hover:to-purple-200',
      green: 'bg-gradient-to-br from-green-50 to-green-100 text-green-700 border-green-200 hover:from-green-100 hover:to-green-200',
      indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-700 border-indigo-200 hover:from-indigo-100 hover:to-indigo-200',
      orange: 'bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 border-orange-200 hover:from-orange-100 hover:to-orange-200',
      pink: 'bg-gradient-to-br from-pink-50 to-pink-100 text-pink-700 border-pink-200 hover:from-pink-100 hover:to-pink-200',
      red: 'bg-gradient-to-br from-red-50 to-red-100 text-red-700 border-red-200 hover:from-red-100 hover:to-red-200',
    }

    const classes = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue
    const cursorClass = onClick ? 'cursor-pointer' : ''

    return (
      <div 
        className={`${classes} ${cursorClass} border-2 rounded-xl p-5 transition-all shadow-sm hover:shadow-md`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold opacity-90">{title}</span>
          <div className="p-2 bg-white/50 rounded-lg">
            <Icon className="w-5 h-5" />
          </div>
        </div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
        {trend && (
          <div className="mt-2 text-xs font-medium opacity-80 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        )}
      </div>
    )
  }

  const tabs = [
    { id: 'traffic' as Tab, label: 'Traffic', icon: BarChart3 },
    { id: 'blog' as Tab, label: 'Blog', icon: FileText },
    { id: 'newsletter' as Tab, label: 'Newsletter', icon: Mail },
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin')}
              className="text-gray-600 hover:text-gray-900 transition-colors p-1 -ml-1 flex items-center justify-center"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 leading-none">Analytics Dashboard</h1>
          </div>
          {activeTab === 'traffic' && (
            <div className="w-full sm:w-auto">
              <TimeRangeSelector />
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-1" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                    ${isActive
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Blog Tab */}
          {activeTab === 'blog' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Posts"
                  value={blogStats.total}
                  icon={FileText}
                  color="purple"
                  onClick={() => router.push('/admin/blog')}
                />
                <StatCard
                  title="Published"
                  value={blogStats.published}
                  icon={CheckCircle}
                  color="green"
                  subtitle="Live on site"
                  onClick={() => router.push('/admin/blog')}
                />
                <StatCard
                  title="Drafts"
                  value={blogStats.drafts}
                  icon={Clock}
                  color="orange"
                  subtitle="In progress"
                  onClick={() => router.push('/admin/blog')}
                />
                <StatCard
                  title="Total Views"
                  value={blogStats.totalViews.toLocaleString()}
                  icon={Eye}
                  color="pink"
                  subtitle="All time"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-pink-600" />
                      Most Viewed Posts
                    </h3>
                    <button
                      onClick={() => router.push('/admin/blog')}
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 font-medium"
                    >
                      View All
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {blogStats.mostViewed.length > 0 ? (
                      blogStats.mostViewed.map((post, index) => (
                        <div
                          key={post.id}
                          onClick={() => router.push(`/admin/blog/${post.slug}`)}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-xs font-bold text-gray-400 w-6">{index + 1}</span>
                            <p className="text-sm font-medium text-gray-900 truncate group-hover:text-primary-600">
                              {post.title}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-700">
                              {post.view_count?.toLocaleString() || 0}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">No views yet</p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      Recent Posts
                    </h3>
                    <button
                      onClick={() => router.push('/admin/blog')}
                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 font-medium"
                    >
                      View All
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {blogStats.recentPosts.length > 0 ? (
                      blogStats.recentPosts.map((post) => (
                        <div
                          key={post.id}
                          onClick={() => router.push(`/admin/blog/${post.slug}`)}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate group-hover:text-primary-600">
                              {post.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {formatDate(post.created_at)}
                            </p>
                          </div>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ml-3 flex-shrink-0 ${getStatusBadge(post.status)}`}
                          >
                            {post.status}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">No posts yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Newsletter Tab */}
          {activeTab === 'newsletter' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Subscribers"
                  value={newsletterStats.total}
                  icon={Mail}
                  color="blue"
                />
                <StatCard
                  title="Confirmed"
                  value={newsletterStats.confirmed}
                  icon={CheckCircle}
                  color="green"
                  subtitle="Active subscribers"
                />
                <StatCard
                  title="Pending"
                  value={newsletterStats.pending}
                  icon={Clock}
                  color="orange"
                  subtitle="Awaiting confirmation"
                />
                <StatCard
                  title="Unsubscribed"
                  value={newsletterStats.unsubscribed}
                  icon={XCircle}
                  color="red"
                  subtitle="Opted out"
                />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Recent Subscriptions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {newsletterStats.recentSubscriptions.length > 0 ? (
                    newsletterStats.recentSubscriptions.slice(0, 12).map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{sub.email}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {formatDate(sub.created_at)}
                          </p>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ml-3 flex-shrink-0 ${getStatusBadge(sub.status)}`}
                        >
                          {sub.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4 col-span-full">No subscriptions yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Traffic Tab */}
          {activeTab === 'traffic' && pageViewStats && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Page Views"
                  value={pageViewStats.total.toLocaleString()}
                  icon={Eye}
                  color="blue"
                />
                <StatCard
                  title="Unique Visitors"
                  value={pageViewStats.uniqueVisitors.toLocaleString()}
                  icon={Users}
                  color="purple"
                />
                <StatCard
                  title="Unique Pages"
                  value={pageViewStats.uniquePages}
                  icon={FileText}
                  color="green"
                />
                <StatCard
                  title="Countries"
                  value={pageViewStats.countries.length}
                  icon={Globe}
                  color="orange"
                />
              </div>

              {/* Page Views Chart */}
              <PageViewsChart
                data={pageViewStats.timeSeries[chartGranularity]}
                granularity={chartGranularity}
                onGranularityChange={setChartGranularity}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Pages */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-pink-600" />
                    Top Pages
                  </h3>
                  <div className="space-y-2">
                    {pageViewStats.topPages.length > 0 ? (
                      pageViewStats.topPages.map((page, index) => (
                        <div
                          key={page.path}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-xs font-bold text-gray-400 w-6">{index + 1}</span>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {page.path === '/' ? 'Home' : page.path}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                            <Eye className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-700">
                              {page.views.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">No page views yet</p>
                    )}
                  </div>
                </div>

                {/* Top Countries */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Top Countries
                  </h3>
                  <div className="space-y-2">
                    {pageViewStats.countries.length > 0 ? (
                      pageViewStats.countries.map((country, index) => (
                        <div
                          key={country.code}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-xs font-bold text-gray-400 w-6">{index + 1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {country.name}
                              </p>
                              <p className="text-xs text-gray-500">{country.code}</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-gray-700 ml-3">
                            {country.count.toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-4">No geo data yet</p>
                    )}
                  </div>
                </div>

                {/* Top Cities/States (North America) */}
                {pageViewStats.citiesStates && pageViewStats.citiesStates.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      Top Cities/States (North America)
                    </h3>
                    <div className="space-y-2">
                      {pageViewStats.citiesStates.map((location, index) => (
                        <div
                          key={location.key}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-xs font-bold text-gray-400 w-6">{index + 1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {location.city && location.state 
                                  ? `${location.city}, ${location.state}`
                                  : location.city
                                  ? location.city
                                  : location.state
                                  ? location.state
                                  : 'Unknown'}
                              </p>
                              <p className="text-xs text-gray-500">{location.country}</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-gray-700 ml-3">
                            {location.count.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Device Types */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-indigo-600" />
                  Device Types
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pageViewStats.deviceTypes.map((device) => {
                    const Icon = device.type === 'mobile' ? Smartphone : device.type === 'tablet' ? Tablet : Monitor
                    const percentage = ((device.count / pageViewStats.total) * 100).toFixed(1)
                    return (
                      <div key={device.type} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3 mb-2">
                          <Icon className="w-5 h-5 text-indigo-600" />
                          <span className="text-sm font-semibold text-gray-900 capitalize">{device.type}</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{device.count.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 mt-1">{percentage}% of total</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Referrer Sources */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-purple-600" />
                  Traffic Sources
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* By Category */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">By Category</h4>
                    <div className="space-y-2">
                      {pageViewStats.referrers.byCategory.length > 0 ? (
                        pageViewStats.referrers.byCategory.map((item, index) => {
                          const percentage = ((item.count / pageViewStats.total) * 100).toFixed(1)
                          const categoryColors: Record<string, string> = {
                            Direct: 'bg-blue-100 text-blue-700',
                            Search: 'bg-green-100 text-green-700',
                            Social: 'bg-purple-100 text-purple-700',
                            Internal: 'bg-gray-100 text-gray-700',
                            External: 'bg-orange-100 text-orange-700',
                          }
                          return (
                            <div
                              key={item.category}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <span className="text-xs font-bold text-gray-400 w-6">{index + 1}</span>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[item.category] || 'bg-gray-100 text-gray-700'}`}>
                                  {item.category}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                                <span className="text-sm font-semibold text-gray-700">
                                  {item.count.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-500 w-12 text-right">
                                  {percentage}%
                                </span>
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No referrer data yet</p>
                      )}
                    </div>
                  </div>

                  {/* Top Sources */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Sources</h4>
                    <div className="space-y-2">
                      {pageViewStats.referrers.bySource.length > 0 ? (
                        pageViewStats.referrers.bySource.slice(0, 10).map((item, index) => {
                          const percentage = ((item.count / pageViewStats.total) * 100).toFixed(1)
                          return (
                            <div
                              key={item.source}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <span className="text-xs font-bold text-gray-400 w-6">{index + 1}</span>
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.source}
                                </p>
                              </div>
                              <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                                <span className="text-sm font-semibold text-gray-700">
                                  {item.count.toLocaleString()}
                                </span>
                                <span className="text-xs text-gray-500 w-12 text-right">
                                  {percentage}%
                                </span>
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No referrer data yet</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Top External Referrers */}
                {pageViewStats.referrers.topReferrers.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Top External Sites</h4>
                    <div className="space-y-2">
                      {pageViewStats.referrers.topReferrers.map((item, index) => {
                        const percentage = ((item.count / pageViewStats.total) * 100).toFixed(1)
                        return (
                          <div
                            key={item.domain}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className="text-xs font-bold text-gray-400 w-6">{index + 1}</span>
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.domain}
                              </p>
                            </div>
                            <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                              <span className="text-sm font-semibold text-gray-700">
                                {item.count.toLocaleString()}
                              </span>
                              <span className="text-xs text-gray-500 w-12 text-right">
                                {percentage}%
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Recent Views */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Recent Page Views
                </h3>
                <div className="space-y-2">
                  {pageViewStats.recentViews.length > 0 ? (
                    pageViewStats.recentViews.map((view, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {view.path === '/' ? 'Home' : view.path}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            {view.country_name && (
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {view.city && view.region 
                                  ? `${view.city}, ${view.region}, ${view.country_name}`
                                  : view.city
                                  ? `${view.city}, ${view.country_name}`
                                  : view.region
                                  ? `${view.region}, ${view.country_name}`
                                  : view.country_name}
                              </span>
                            )}
                            {view.device_type && (
                              <span className="text-xs text-gray-500 capitalize">{view.device_type}</span>
                            )}
                            <span className="text-xs text-gray-500">
                              {formatDateTime(view.viewed_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No page views yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
