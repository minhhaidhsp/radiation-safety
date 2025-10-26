/**
 * Trang hiển thị các chức năng hệ thống với tính năng tìm kiếm và kéo thả
 */
import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { features } from '../data/features'
import { GripVertical, ArrowRight, Search, Filter } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

/**
 * Mapping màu sắc cho các thẻ tính năng
 */
const colorMap = {
  blue: { 
    bg: 'bg-blue-50', 
    border: 'border-blue-200',
    gradient: 'from-blue-50 to-white',
    hover: 'hover:border-blue-300',
    iconBg: 'bg-blue-100'
  },
  green: { 
    bg: 'bg-green-50', 
    border: 'border-green-200',
    gradient: 'from-green-50 to-white',
    hover: 'hover:border-green-300',
    iconBg: 'bg-green-100'
  },
  purple: { 
    bg: 'bg-purple-50', 
    border: 'border-purple-200',
    gradient: 'from-purple-50 to-white',
    hover: 'hover:border-purple-300',
    iconBg: 'bg-purple-100'
  },
  red: { 
    bg: 'bg-red-50', 
    border: 'border-red-200',
    gradient: 'from-red-50 to-white',
    hover: 'hover:border-red-300',
    iconBg: 'bg-red-100'
  },
  orange: { 
    bg: 'bg-orange-50', 
    border: 'border-orange-200',
    gradient: 'from-orange-50 to-white',
    hover: 'hover:border-orange-300',
    iconBg: 'bg-orange-100'
  },
  indigo: { 
    bg: 'bg-indigo-50', 
    border: 'border-indigo-200',
    gradient: 'from-indigo-50 to-white',
    hover: 'hover:border-indigo-300',
    iconBg: 'bg-indigo-100'
  },
  pink: { 
    bg: 'bg-pink-50', 
    border: 'border-pink-200',
    gradient: 'from-pink-50 to-white',
    hover: 'hover:border-pink-300',
    iconBg: 'bg-pink-100'
  },
  teal: { 
    bg: 'bg-teal-50', 
    border: 'border-teal-200',
    gradient: 'from-teal-50 to-white',
    hover: 'hover:border-teal-300',
    iconBg: 'bg-teal-100'
  },
  yellow: { 
    bg: 'bg-yellow-50', 
    border: 'border-yellow-200',
    gradient: 'from-yellow-50 to-white',
    hover: 'hover:border-yellow-300',
    iconBg: 'bg-yellow-100'
  },
  cyan: { 
    bg: 'bg-cyan-50', 
    border: 'border-cyan-200',
    gradient: 'from-cyan-50 to-white',
    hover: 'hover:border-cyan-300',
    iconBg: 'bg-cyan-100'
  },
  rose: { 
    bg: 'bg-rose-50', 
    border: 'border-rose-200',
    gradient: 'from-rose-50 to-white',
    hover: 'hover:border-rose-300',
    iconBg: 'bg-rose-100'
  },
  gray: { 
    bg: 'bg-gray-50', 
    border: 'border-gray-200',
    gradient: 'from-gray-50 to-white',
    hover: 'hover:border-gray-300',
    iconBg: 'bg-gray-100'
  }
}

export default function Features() {
  const [featureItems, setFeatureItems] = useState(features)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  /**
   * Filter features based on search query
   */
  const filteredFeatures = useMemo(() => {
    if (!searchQuery.trim()) return featureItems
    
    const query = searchQuery.toLowerCase().trim()
    return featureItems.filter(feature => 
      feature.title.toLowerCase().includes(query) ||
      feature.description.toLowerCase().includes(query)
    )
  }, [featureItems, searchQuery])

  /**
   * Khôi phục thứ tự từ localStorage khi component mount
   */
  useEffect(() => {
    const savedOrder = localStorage.getItem('featureOrder')
    if (savedOrder) {
      try {
        const order = JSON.parse(savedOrder)
        const orderedFeatures = order.map((id: number) => 
          features.find(feature => feature.id === id)
        ).filter(Boolean)
        setFeatureItems(orderedFeatures)
      } catch (error) {
        console.error('Error loading saved feature order:', error)
      }
    }
  }, [])

  /**
   * Xử lý khi bắt đầu kéo
   */
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData('text/plain', index.toString())
    e.currentTarget.classList.add('opacity-50')
    setIsDragging(true)
  }

  /**
   * Xử lý khi kéo qua phần tử
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add('bg-blue-50', 'border-blue-200')
  }

  /**
   * Xử lý khi rời khỏi phần tử
   */
  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-blue-50', 'border-blue-200')
  }

  /**
   * Xử lý khi thả phần tử
   */
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'))
    e.currentTarget.classList.remove('bg-blue-50', 'border-blue-200')
    
    if (dragIndex !== dropIndex) {
      const newItems = [...featureItems]
      const [draggedItem] = newItems.splice(dragIndex, 1)
      newItems.splice(dropIndex, 0, draggedItem)
      setFeatureItems(newItems)
      
      // Lưu thứ tự mới vào localStorage
      const order = newItems.map(item => item.id)
      localStorage.setItem('featureOrder', JSON.stringify(order))
    }
    setIsDragging(false)
  }

  /**
   * Xử lý khi kết thúc kéo
   */
  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50')
    setIsDragging(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-8 pt-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#004C99] to-[#00B8B0] bg-clip-text text-transparent">
            CÁC CHỨC NĂNG HỆ THỐNG
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Quản lý và sắp xếp các tính năng hệ thống theo nhu cầu sử dụng của bạn
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Tìm kiếm tính năng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-500">
              {filteredFeatures.length} tính năng được tìm thấy
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Xóa tìm kiếm
              </button>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            const baseColor = feature.color.split('-')[1] as keyof typeof colorMap
            const colors = colorMap[baseColor]

            return (
              <div
                key={feature.id}
                draggable={!searchQuery}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`group relative bg-gradient-to-br ${colors.gradient} border ${colors.border} ${colors.hover} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                  !searchQuery ? 'cursor-move' : 'cursor-pointer'
                }`}
              >
                {/* Drag Handle */}
                {!searchQuery && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                {/* Icon */}
                <div className={`mb-4 p-3 rounded-xl ${colors.iconBg} bg-opacity-70 border ${colors.border} w-fit shadow-sm`}>
                  <IconComponent className={`w-8 h-8 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Action Button */}
                <Link to={`/features/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button 
                    variant="outline" 
                    className="bg-transparent border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 w-full justify-between group/btn transition-colors"
                  >
                    Truy cập
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredFeatures.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không tìm thấy tính năng phù hợp
            </h3>
            <p className="text-gray-500">
              Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc
            </p>
          </div>
        )}

        {/* Instructions */}
        {!searchQuery && (
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              💡 Kéo và thả để sắp xếp lại các tính năng theo thứ tự ưu tiên
            </p>
          </div>
        )}
      </div>
    </div>
  )
}