'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Menu, X, ChevronDown, Search, LogOut } from 'lucide-react'
import GlobalSearch from '@/components/GlobalSearch'
import { createClient } from '@/lib/supabase-client'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  // Check if user is logged in as admin
  useEffect(() => {
    const checkUser = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        setIsAdmin(!!user)
      } catch (error) {
        setIsAdmin(false)
      }
    }

    checkUser()

    // Listen for auth state changes
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session?.user)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <nav className="container-custom max-w-[1536px] py-4">
        <div className="flex items-center h-16 px-6 rounded-full bg-white/85 backdrop-blur-sm border border-gray-200/80 shadow-lg shadow-gray-900/5">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Image 
                  src="/logo.png" 
                  alt="Metallography.org" 
                  width={50} 
                  height={50}
                  className="h-10 w-auto"
                  priority
                  fetchPriority="high"
                />
              </div>
              <span className="hidden xl:block text-2xl font-bold tracking-tight text-gray-900">
                Metallography.org
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation with Dropdowns - Centered */}
          <div className="hidden lg:flex items-center space-x-0 flex-1 justify-center">
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('guides')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href="/guides" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center gap-1"
                >
                  Guides
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                {activeDropdown === 'guides' && (
                  <>
                    {/* Invisible bridge to prevent gap */}
                    <div className="absolute top-full left-0 w-full h-2"></div>
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 z-50">
                      <Link href="/guides" className="block px-5 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200 mx-2">
                        All Guides
                      </Link>
                      <div className="border-t border-gray-200 my-2 mx-2"></div>
                      <div className="px-2">
                        <p className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</p>
                        <Link href="/guides?category=Basics" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Basics
                        </Link>
                        <Link href="/guides?category=Process" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Process
                        </Link>
                        <Link href="/guides?category=Material-Specific" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Material-Specific
                        </Link>
                        <Link href="/guides?category=Application-Specific" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Application-Specific
                        </Link>
                        <Link href="/guides?category=Troubleshooting" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Troubleshooting
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <span className="text-gray-300 mx-1">|</span>
              
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href="/resources" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center gap-1"
                >
                  Resources
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                {activeDropdown === 'resources' && (
                  <>
                    {/* Invisible bridge to prevent gap */}
                    <div className="absolute top-full left-0 w-full h-2"></div>
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 z-50">
                      <Link href="/resources" className="block px-5 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200 mx-2">
                        All Resources
                      </Link>
                      <div className="border-t border-gray-200 my-2 mx-2"></div>
                      <div className="px-2">
                        <p className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</p>
                        <Link href="/resources?category=Checklists%20%26%20Quick%20References" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Checklists & Quick References
                        </Link>
                        <Link href="/resources?category=Reference Charts" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Reference Charts
                        </Link>
                        <Link href="/resources?category=Preparation Guides" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Preparation Guides
                        </Link>
                        <Link href="/resources?category=Video Resources" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Video Resources
                        </Link>
                        <Link href="/resources?category=Troubleshooting" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Troubleshooting
                        </Link>
                      </div>
                      <div className="border-t border-gray-200 my-2 mx-2"></div>
                      <div className="px-2">
                        <p className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Popular</p>
                        <Link href="/glossary" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Glossary
                        </Link>
                        <Link href="/resources/checklist" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Sample Prep Checklist
                        </Link>
                        <Link href="/resources/grit-size-chart" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Grit Size Chart
                        </Link>
                        <Link href="/resources/common-etchants-guide" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Common Etchants
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <span className="text-gray-300 mx-1">|</span>
              
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('tools')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href="/tools" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center gap-1"
                >
                  Tools
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                {activeDropdown === 'tools' && (
                  <>
                    {/* Invisible bridge to prevent gap */}
                    <div className="absolute top-full left-0 w-full h-2"></div>
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 z-50">
                      <Link href="/tools" className="block px-5 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200 mx-2">
                        All Tools
                      </Link>
                      <div className="border-t border-gray-200 my-2 mx-2"></div>
                      <div className="px-2">
                        <p className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</p>
                        <Link href="/tools?category=Calculators" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Calculators
                        </Link>
                        <Link href="/tools?category=Reference" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Reference
                        </Link>
                        <Link href="/tools?category=Workflow" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Workflow
                        </Link>
                      </div>
                      <div className="border-t border-gray-200 my-2 mx-2"></div>
                      <div className="px-2">
                        <p className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Popular</p>
                        <Link href="/tools/grit-size-converter" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Grit Size Converter
                        </Link>
                        <Link href="/tools/etchant-selector" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Etchant Selector
                        </Link>
                        <Link href="/tools/polishing-time-calculator" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Polishing Time Calculator
                        </Link>
                        <Link href="/guides?category=Material-Specific" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Procedure Guides →
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <span className="text-gray-300 mx-1">|</span>
              
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('data-library')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href="/databases" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 flex items-center gap-1"
                >
                  Databases
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                {activeDropdown === 'data-library' && (
                  <>
                    {/* Invisible bridge to prevent gap */}
                    <div className="absolute top-full left-0 w-full h-2"></div>
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 z-50">
                      <Link href="/databases" className="block px-5 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200 mx-2">
                        All Databases
                      </Link>
                      <div className="border-t border-gray-200 my-2 mx-2"></div>
                      <div className="px-2">
                        <p className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Libraries</p>
                        <Link href="/materials" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Materials Database
                        </Link>
                        <Link href="/etchants" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Etchants Database
                        </Link>
                        <Link href="/standards" className="block px-5 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition-all duration-200">
                          Standards Database
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <span className="text-gray-300 mx-1">|</span>
              
              <Link 
                href="/blog" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                Blog
              </Link>
            </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-full transition-all duration-200 relative group"
              aria-label="Search"
              title="Search (Ctrl+K or Cmd+K)"
            >
              <Search className="w-5 h-5" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
            {isAdmin ? (
              <>
                <Link 
                  href="/admin" 
                  className="px-5 py-2 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all duration-200 text-sm shadow-md hover:shadow-lg"
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2.5 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-full transition-all duration-200"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="https://shop.metallographic.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-200 text-sm shadow-sm hover:shadow-md"
                >
                  Stock Your Lab
                </Link>
                <Link 
                  href="/builder" 
                  className="px-5 py-2 bg-gray-900 text-white hover:text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center space-x-2 text-sm shadow-md hover:shadow-lg"
                >
                  <span>Build Your Lab</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden ml-auto p-2 rounded-lg transition-all duration-200 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 px-6 rounded-2xl mt-3 shadow-xl backdrop-blur-xl transition-all duration-300 bg-white border border-gray-200 max-h-[calc(100vh-120px)] overflow-y-auto">
            {/* Guides Section */}
            <div className="mb-2">
              <div className="flex items-center justify-between py-2.5 border-b border-gray-200">
                <Link 
                  href="/guides" 
                  className="flex-1 text-gray-900 hover:text-primary-600 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Guides
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileExpandedSection(mobileExpandedSection === 'guides' ? null : 'guides')
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Toggle Guides submenu"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedSection === 'guides' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileExpandedSection === 'guides' && (
                <div className="pl-4 pt-2 pb-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  <Link href="/guides?category=Basics" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Basics</Link>
                  <Link href="/guides?category=Process" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Process</Link>
                  <Link href="/guides?category=Material-Specific" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Material-Specific</Link>
                  <Link href="/guides?category=Application-Specific" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Application-Specific</Link>
                  <Link href="/guides?category=Troubleshooting" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Troubleshooting</Link>
                </div>
              )}
            </div>

            {/* Resources Section */}
            <div className="mb-2">
              <div className="flex items-center justify-between py-2.5 border-b border-gray-200">
                <Link 
                  href="/resources" 
                  className="flex-1 text-gray-900 hover:text-primary-600 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Resources
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileExpandedSection(mobileExpandedSection === 'resources' ? null : 'resources')
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Toggle Resources submenu"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedSection === 'resources' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileExpandedSection === 'resources' && (
                <div className="pl-4 pt-2 pb-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  <Link href="/glossary" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Glossary</Link>
                  <Link href="/resources?category=Checklists%20%26%20Quick%20References" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Checklists & Quick References</Link>
                  <Link href="/resources?category=Reference Charts" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Reference Charts</Link>
                  <Link href="/resources?category=Preparation Guides" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Preparation Guides</Link>
                  <Link href="/resources?category=Video Resources" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Video Resources</Link>
                  <Link href="/resources?category=Troubleshooting" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Troubleshooting</Link>
                </div>
              )}
            </div>

            {/* Tools Section */}
            <div className="mb-2">
              <div className="flex items-center justify-between py-2.5 border-b border-gray-200">
                <Link 
                  href="/tools" 
                  className="flex-1 text-gray-900 hover:text-primary-600 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tools
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileExpandedSection(mobileExpandedSection === 'tools' ? null : 'tools')
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Toggle Tools submenu"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedSection === 'tools' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileExpandedSection === 'tools' && (
                <div className="pl-4 pt-2 pb-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  <Link href="/tools?category=Calculators" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Calculators</Link>
                  <Link href="/tools?category=Reference" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Reference</Link>
                  <Link href="/tools?category=Workflow" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Workflow</Link>
                </div>
              )}
            </div>

            {/* Databases Section */}
            <div className="mb-2">
              <div className="flex items-center justify-between py-2.5 border-b border-gray-200">
                <Link 
                  href="/databases" 
                  className="flex-1 text-gray-900 hover:text-primary-600 font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Databases
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileExpandedSection(mobileExpandedSection === 'databases' ? null : 'databases')
                  }}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  aria-label="Toggle Databases submenu"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileExpandedSection === 'databases' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {mobileExpandedSection === 'databases' && (
                <div className="pl-4 pt-2 pb-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  <Link href="/materials" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Materials Database</Link>
                  <Link href="/etchants" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Etchants Database</Link>
                  <Link href="/standards" className="block py-1.5 text-sm text-gray-600 hover:text-primary-600" onClick={() => setMobileMenuOpen(false)}>Standards Database</Link>
                </div>
              )}
            </div>

            {/* Blog Section */}
            <div className="mb-2">
              <Link 
                href="/blog" 
                className="block py-2.5 text-gray-900 hover:text-primary-600 font-semibold border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>

            <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setSearchOpen(true)
                }}
                className="px-5 py-2 bg-gray-100 text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition-all duration-200 border border-gray-200 text-center text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              {isAdmin ? (
                <>
                  <Link 
                    href="/admin" 
                    className="px-5 py-2 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all duration-200 text-center text-sm shadow-md hover:shadow-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      handleLogout()
                    }}
                    className="px-5 py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-200 text-center text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="https://shop.metallographic.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-200 text-center text-sm shadow-sm hover:shadow-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Stock Your Lab
                  </Link>
                  <Link 
                    href="/builder" 
                    className="px-5 py-2 bg-gray-900 text-white hover:text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 text-sm shadow-md hover:shadow-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Build Your Lab</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Global Search */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}

