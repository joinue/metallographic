'use client'

import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { Package, FlaskConical, FileText, Users, BarChart3, Database } from 'lucide-react'

interface AdminDashboardProps {
  user: User
}

interface AdminOption {
  id: string
  title: string
  description: string
  icon: typeof Package
  color: string
  href?: string
  status: 'active' | 'coming-soon'
}

const adminOptions: AdminOption[] = [
  {
    id: 'materials',
    title: 'Materials',
    description: 'Create, edit, and manage materials in the database',
    icon: Package,
    color: 'blue',
    href: '/admin/materials',
    status: 'active',
  },
  {
    id: 'blog',
    title: 'Blog Posts',
    description: 'Create, edit, and manage blog posts',
    icon: FileText,
    color: 'purple',
    href: '/admin/blog',
    status: 'active',
  },
  {
    id: 'etchants',
    title: 'Etchants',
    description: 'Manage etchants and their properties',
    icon: FlaskConical,
    color: 'green',
    href: '/admin/etchants',
    status: 'active',
  },
  {
    id: 'standards',
    title: 'Standards',
    description: 'Manage ASTM and ISO standards',
    icon: Database,
    color: 'indigo',
    href: '/admin/standards',
    status: 'active',
  },
  {
    id: 'users',
    title: 'User Management',
    description: 'View and manage user accounts',
    icon: Users,
    color: 'orange',
    href: '/admin/users',
    status: 'active',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'View site analytics and metrics',
    icon: BarChart3,
    color: 'pink',
    href: '/admin/analytics',
    status: 'active',
  },
]

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const router = useRouter()

  const handleCardClick = (option: AdminOption) => {
    if (option.status === 'active' && option.href) {
      router.push(option.href)
    }
  }

  const getColorClasses = (color: string, status: 'active' | 'coming-soon') => {
    if (status === 'coming-soon') {
      return {
        bg: 'bg-gray-50',
        hover: 'hover:bg-gray-100',
        icon: 'text-gray-400',
        title: 'text-gray-500',
        description: 'text-gray-400',
        border: 'border-gray-200',
      }
    }

    const colors: Record<string, any> = {
      blue: {
        bg: 'bg-blue-50',
        hover: 'hover:bg-blue-100',
        icon: 'text-blue-600',
        title: 'text-blue-900',
        description: 'text-blue-700',
        border: 'border-blue-200',
      },
      purple: {
        bg: 'bg-purple-50',
        hover: 'hover:bg-purple-100',
        icon: 'text-purple-600',
        title: 'text-purple-900',
        description: 'text-purple-700',
        border: 'border-purple-200',
      },
      green: {
        bg: 'bg-green-50',
        hover: 'hover:bg-green-100',
        icon: 'text-green-600',
        title: 'text-green-900',
        description: 'text-green-700',
        border: 'border-green-200',
      },
      indigo: {
        bg: 'bg-indigo-50',
        hover: 'hover:bg-indigo-100',
        icon: 'text-indigo-600',
        title: 'text-indigo-900',
        description: 'text-indigo-700',
        border: 'border-indigo-200',
      },
      orange: {
        bg: 'bg-orange-50',
        hover: 'hover:bg-orange-100',
        icon: 'text-orange-600',
        title: 'text-orange-900',
        description: 'text-orange-700',
        border: 'border-orange-200',
      },
      pink: {
        bg: 'bg-pink-50',
        hover: 'hover:bg-pink-100',
        icon: 'text-pink-600',
        title: 'text-pink-900',
        description: 'text-pink-700',
        border: 'border-pink-200',
      },
    }

    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your site content and settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminOptions.map((option) => {
            const Icon = option.icon
            const colors = getColorClasses(option.color, option.status)
            const isActive = option.status === 'active'

            return (
              <div
                key={option.id}
                onClick={() => handleCardClick(option)}
                className={`
                  ${colors.bg} ${isActive ? colors.hover : ''} ${colors.border}
                  border-2 rounded-xl p-6 transition-all duration-200
                  ${isActive ? 'cursor-pointer shadow-sm hover:shadow-md' : 'cursor-not-allowed opacity-60'}
                  ${isActive ? 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500' : ''}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colors.bg} ${colors.border} border`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                  {option.status === 'coming-soon' && (
                    <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}
                  {option.status === 'active' && (
                    <span className="text-xs font-medium text-primary-600 bg-primary-100 px-2 py-1 rounded">
                      Active
                    </span>
                  )}
                </div>
                <h3 className={`text-xl font-bold ${colors.title} mb-2`}>
                  {option.title}
                </h3>
                <p className={`text-sm ${colors.description} leading-relaxed`}>
                  {option.description}
                </p>
                {isActive && (
                  <div className="mt-4 flex items-center text-sm font-medium text-gray-600">
                    <span>Manage →</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

