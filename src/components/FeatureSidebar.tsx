/**
 * Component sidebar hiển thị danh sách các tính năng để điều hướng
 */
import { Link, useLocation } from 'react-router-dom'
import { features } from '../data/features'
import { ChevronRight } from 'lucide-react'

export default function FeatureSidebar() {
  const location = useLocation()

  return (
    <div className="w-80 bg-white rounded-2xl shadow-lg border border-gray-200 h-fit sticky top-32">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-2xl">
        <h2 className="text-lg font-semibold text-gray-900">Các Tính Năng</h2>
        <p className="text-sm text-gray-600 mt-1">Chuyển đổi nhanh giữa các tính năng</p>
      </div>

      {/* Features List */}
      <div className="p-4 space-y-2">
        {features.map((feature) => {
          const IconComponent = feature.icon
          const isActive = location.pathname.includes(feature.title.toLowerCase().replace(/\s+/g, '-'))
          
          return (
            <Link
              key={feature.id}
              to={`/features/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
              className={`flex items-center p-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 shadow-sm'
                  : 'hover:bg-gray-50 border border-transparent'
              }`}
            >
              {/* Icon */}
              <div className={`p-2 rounded-lg ${
                isActive 
                  ? 'bg-white shadow-sm' 
                  : 'bg-gray-50 group-hover:bg-white'
              }`}>
                <IconComponent className={`w-5 h-5 ${
                  isActive ? feature.color : 'text-gray-600 group-hover:' + feature.color
                }`} />
              </div>

              {/* Content */}
              <div className="ml-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    isActive ? 'text-[#004C99]' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {feature.title}
                  </span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-[#004C99] transform rotate-90" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {feature.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        <p className="text-xs text-gray-500 text-center">
          💡 Sử dụng sidebar để chuyển đổi nhanh
        </p>
      </div>
    </div>
  )
}