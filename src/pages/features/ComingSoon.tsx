/**
 * Trang thông báo tính năng đang phát triển
 */
import { Link } from 'react-router-dom'
import { Home, ChevronRight, Construction, ArrowLeft } from 'lucide-react'

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 pt-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb và nút back */}
        <div className="flex items-center justify-between mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="flex items-center hover:text-gray-900 transition-colors">
              <Home className="w-4 h-4 mr-2" />
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/features" className="hover:text-gray-900 transition-colors">
              CÁC CHỨC NĂNG
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Đang phát triển</span>
          </nav>

          <Link
            to="/features"
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 text-[#004C99] hover:from-blue-100 hover:to-teal-100 transition-all duration-300 rounded-lg border border-blue-200 hover:border-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Link>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
          <div className="flex justify-center mb-6">
            <Construction className="h-24 w-24 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tính năng đang được phát triển
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Chức năng này hiện đang trong quá trình xây dựng và sẽ sớm có mặt. 
            Chúng tôi đang nỗ lực để mang đến trải nghiệm tốt nhất cho bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/features"
              className="px-6 py-3 bg-[#004C99] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Quay lại danh sách chức năng
            </Link>
            <Link 
              to="/"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}