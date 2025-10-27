import { Link, useLocation } from 'react-router-dom'
import { features } from '../data/features'
import { ChevronRight } from 'lucide-react'
import { ReactNode } from 'react'

interface FeatureLayoutProps {
  children: ReactNode
}

export default function FeatureLayout({ children }: FeatureLayoutProps) {
  const location = useLocation()

  return (
    <div className="pt-20">
      <div className="relative h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 to-blue-50">
        <aside className="hidden lg:flex fixed top-20 left-0 bottom-0 w-72 bg-white border-r border-gray-200 overflow-y-auto z-30">
          <div className="w-full">
            <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
              <h2 className="text-base font-semibold text-gray-900">Chức năng</h2>
              <p className="text-xs text-gray-600 mt-1">Đi nhanh đến mục cần</p>
            </div>
            <div className="p-3 space-y-1">
              {features.map((f) => {
                const Icon = f.icon as any
                const path = `/features/${f.path.toLowerCase().replace(/\s+/g, '-')}`
                const isActive = location.pathname.startsWith(path)
                return (
                  <Link
                    key={f.id}
                    to={path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors border-l-4 ${
                      isActive
                        ? 'bg-blue-50 text-[#004C99] border border-blue-200 border-l-[#004C99] font-semibold'
                        : 'text-gray-700 hover:bg-gray-50 border border-transparent border-l-transparent hover:border-l-blue-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? f.color : 'text-gray-600'}`} />
                    <span className="text-sm flex-1 truncate">{f.title}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#004C99]' : 'text-gray-400'}`} />
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

        <div className="h-full overflow-y-auto lg:ml-72">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
