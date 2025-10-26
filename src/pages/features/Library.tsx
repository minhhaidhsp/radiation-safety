/**
 * Trang Thư viện tài liệu - Lưu trữ và chia sẻ tài liệu an toàn
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
  Library,
  Folder,
  FileText,
  Users,
  Calendar,
  MoreVertical
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import FeatureSidebar from '../../components/FeatureSidebar'

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  
  // Mock data cho tài liệu
  const documentsData = [
    {
      id: 1,
      name: 'Hướng dẫn an toàn bức xạ',
      description: 'Tài liệu hướng dẫn an toàn bức xạ cho nhân viên',
      createdBy: 'Nguyễn Văn A',
      status: 'published',
      statusText: 'Đã xuất bản',
      createdDate: '25/09/2025',
      lastModified: '2 giờ trước',
      department: 'Phòng An toàn',
      type: 'Hướng dẫn',
      fileSize: '2.5 MB',
      category: 'An toàn',
      downloads: 45,
      version: '1.2'
    },
    {
      id: 2,
      name: 'Quy trình vận hành thiết bị X-quang',
      description: 'Quy trình chi tiết vận hành thiết bị X-quang',
      createdBy: 'Trần Thị B',
      status: 'draft',
      statusText: 'Bản nháp',
      createdDate: '24/09/2025',
      lastModified: '5 giờ trước',
      department: 'Phòng Kỹ thuật',
      type: 'Quy trình',
      fileSize: '1.8 MB',
      category: 'Vận hành',
      downloads: 23,
      version: '1.0'
    },
    {
      id: 3,
      name: 'Báo cáo kiểm kê thiết bị quý 3/2025',
      description: 'Báo cáo kiểm kê thiết bị phóng xạ quý 3',
      createdBy: 'Lê Văn C',
      status: 'published',
      statusText: 'Đã xuất bản',
      createdDate: '23/09/2025',
      lastModified: '1 ngày trước',
      department: 'Phòng Quản lý',
      type: 'Báo cáo',
      fileSize: '3.2 MB',
      category: 'Kiểm kê',
      downloads: 67,
      version: '1.1'
    }
  ]

  // Thống kê
  const stats = [
    { label: 'Tổng tài liệu', value: '245', change: '+15%' },
    { label: 'Đang xem xét', value: '18', change: '+3%' },
    { label: 'Đã xuất bản', value: '210', change: '+12%' },
    { label: 'Lượt tải', value: '1.2K', change: '+25%' }
  ]

  const filteredDocuments = documentsData.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(doc => activeTab === 'all' || doc.status === activeTab)

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
            <span className="text-gray-900 font-medium">Thư viện tài liệu</span>
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
                  <Library className="w-10 h-10 text-[#004C99]" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                THƯ VIỆN TÀI LIỆU
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Lưu trữ và chia sẻ tài liệu an toàn với hệ thống quản lý phiên bản
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
                  placeholder="Tìm kiếm tài liệu, người tạo, phòng ban..."
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
                  Tải lên tài liệu
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 border border-gray-200 w-fit">
              {['all', 'published', 'draft'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-[#004C99] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab === 'all' && 'Tất cả'}
                  {tab === 'published' && 'Đã xuất bản'}
                  {tab === 'draft' && 'Bản nháp'}
                </button>
              ))}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Danh sách tài liệu ({filteredDocuments.length})
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Quản lý tất cả tài liệu trong thư viện
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Tên tài liệu
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Người tạo & Phòng ban
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Loại & Danh mục
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Trạng thái & Thống kê
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 mb-1">
                              {doc.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {doc.description}
                            </div>
                            <div className="flex items-center mt-1">
                              <FileText className="w-4 h-4 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">
                                {doc.fileSize} • v{doc.version}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">
                            {doc.createdBy}
                          </div>
                          <div className="text-sm text-gray-500">
                            {doc.department}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Tạo: {doc.createdDate}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 mb-1">
                            {doc.type}
                          </div>
                          <div className="text-sm text-gray-500">
                            {doc.category}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="mb-2">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              doc.status === 'published' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}>
                              {doc.statusText}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Download className="w-4 h-4 mr-1" />
                            {doc.downloads} lượt tải
                          </div>
                        </td>
                        <td className="px-6 py-4">
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
                            <Button variant="outline" size="sm" className="bg-transparent p-2">
                              <MoreVertical className="w-4 h-4" />
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
                    Hiển thị {filteredDocuments.length} trong tổng số {documentsData.length} tài liệu
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