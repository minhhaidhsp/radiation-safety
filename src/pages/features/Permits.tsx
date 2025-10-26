/**
 * Trang Giấy Phép - Quản lý giấy phép an toàn bức xạ
 */
import { Link } from 'react-router-dom'
import { 
  Home,
  ChevronRight,
  ArrowLeft,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  FileCheck,
  Calendar,
  AlertCircle
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import FeatureSidebar from '../../components/FeatureSidebar'

export default function Permits() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  
  // Mock data cho giấy phép
  const permitsData = [
    {
      id: 1,
      name: 'Giấy phép sử dụng thiết bị X-quang',
      licenseNumber: 'GP-XQ-2025-001',
      department: 'Phòng X-quang',
      issuedDate: '15/01/2025',
      expiryDate: '15/01/2026',
      status: 'active',
      statusText: 'Đang hiệu lực',
      issuedBy: 'Cục An toàn bức xạ',
      type: 'Thiết bị X-quang'
    },
    {
      id: 2,
      name: 'Giấy phép vận chuyển chất thải',
      licenseNumber: 'GP-VC-2025-002',
      department: 'Phòng Môi trường',
      issuedDate: '20/02/2025',
      expiryDate: '20/08/2025',
      status: 'expiring',
      statusText: 'Sắp hết hạn',
      issuedBy: 'Bộ Tài nguyên Môi trường',
      type: 'Vận chuyển'
    },
    {
      id: 3,
      name: 'Giấy phép nhập khẩu nguồn phóng xạ',
      licenseNumber: 'GP-NK-2025-003',
      department: 'Phòng Kỹ thuật',
      issuedDate: '10/03/2025',
      expiryDate: '10/03/2026',
      status: 'active',
      statusText: 'Đang hiệu lực',
      issuedBy: 'Bộ Khoa học Công nghệ',
      type: 'Nhập khẩu'
    }
  ]

  // Thống kê
  const stats = [
    { label: 'Tổng giấy phép', value: '23', change: '+5%' },
    { label: 'Đang hiệu lực', value: '18', change: '+3%' },
    { label: 'Sắp hết hạn', value: '3', change: '+1%' },
    { label: 'Đã hết hạn', value: '2', change: '-1%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-gray-900 font-medium">Giấy phép</span>
          </nav>

          <Link
            to="/features"
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 text-[#004C99] hover:from-blue-100 hover:to-teal-100 transition-all duration-300 rounded-lg border border-blue-200 hover:border-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Link>
        </div>

        {/* Main Content với Sidebar */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <FeatureSidebar />

          {/* Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 border border-blue-200">
                  <FileCheck className="w-10 h-10 text-[#004C99]" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                QUẢN LÝ GIẤY PHÉP
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Quản lý và theo dõi giấy phép an toàn bức xạ, cảnh báo hết hạn tự động
              </p>
            </div>

            {/* Thống kê nhanh */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Search and Actions Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm giấy phép, số hiệu, phòng ban..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004C99] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex items-center px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4 mr-2" />
                  Lọc
                </button>
                <button className="flex items-center px-4 py-3 bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white rounded-lg hover:from-blue-700 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm giấy phép
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Danh sách giấy phép ({permitsData.length})
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Quản lý tất cả giấy phép an toàn bức xạ trong hệ thống
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Tên giấy phép
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Số hiệu & Loại
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Phòng ban & Cơ quan cấp
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Ngày cấp & Hết hạn
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Trạng thái & Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {permitsData.map((permit) => (
                      <tr key={permit.id} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 mb-1">
                              {permit.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {permit.id.toString().padStart(3, '0')}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium mb-1">
                            {permit.licenseNumber}
                          </div>
                          <div className="text-sm text-gray-500">
                            {permit.type}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">
                            {permit.department}
                          </div>
                          <div className="text-sm text-gray-500">
                            {permit.issuedBy}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 mb-1">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Cấp: {permit.issuedDate}
                          </div>
                          <div className="text-sm text-gray-500">
                            Hết hạn: {permit.expiryDate}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="mb-3">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              permit.status === 'active' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}>
                              {permit.statusText}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="bg-transparent p-2">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent p-2">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent p-2">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-gray-600">
                    Hiển thị {permitsData.length} trong tổng số {permitsData.length} giấy phép
                  </p>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" className="bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Xuất danh sách
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}