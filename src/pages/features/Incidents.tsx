/**
 * Trang Quản Lý Sự Cố - Ghi nhận và theo dõi các sự cố, cảnh báo
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
  AlertTriangle,
  Calendar,
  User,
  MapPin
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import FeatureSidebar from '../../components/FeatureSidebar'

export default function Incidents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  
  // Mock data cho sự cố
  const incidentsData = [
    {
      id: 1,
      title: 'Sự cố rò rỉ thiết bị X-quang',
      description: 'Phát hiện rò rỉ nhỏ từ thiết bị X-quang phòng 301',
      reportedBy: 'Nguyễn Văn A',
      department: 'Phòng X-quang',
      status: 'investigating',
      statusText: 'Đang điều tra',
      priority: 'high',
      priorityText: 'Cao',
      reportedDate: '25/09/2025',
      location: 'Phòng X-quang 301',
      assignedTo: 'Đội kỹ thuật A'
    },
    {
      id: 2,
      title: 'Sự cố mất liều kế',
      description: 'Mất liều kế cá nhân của nhân viên',
      reportedBy: 'Trần Thị B',
      department: 'Phòng CT Scanner',
      status: 'resolved',
      statusText: 'Đã giải quyết',
      priority: 'medium',
      priorityText: 'Trung bình',
      reportedDate: '24/09/2025',
      location: 'Khu vực hành lang',
      assignedTo: 'Đội an toàn'
    },
    {
      id: 3,
      title: 'Sự cố quá liều',
      description: 'Nhân viên tiếp xúc quá liều cho phép',
      reportedBy: 'Lê Văn C',
      department: 'Phòng X-quang',
      status: 'pending',
      statusText: 'Chờ xử lý',
      priority: 'critical',
      priorityText: 'Khẩn cấp',
      reportedDate: '23/09/2025',
      location: 'Phòng chụp X-quang',
      assignedTo: 'Đội y tế'
    }
  ]

  // Thống kê
  const stats = [
    { label: 'Tổng sự cố', value: '12', change: '+2%' },
    { label: 'Đang điều tra', value: '3', change: '+1%' },
    { label: 'Đã giải quyết', value: '8', change: '+3%' },
    { label: 'Khẩn cấp', value: '1', change: '0%' }
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
            <span className="text-gray-900 font-medium">Quản lý sự cố</span>
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
                  <AlertTriangle className="w-10 h-10 text-[#004C99]" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                QUẢN LÝ SỰ CỐ
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ghi nhận và theo dõi các sự cố, cảnh báo an toàn bức xạ
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
                  placeholder="Tìm kiếm sự cố, người báo cáo, phòng ban..."
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
                  Báo cáo sự cố
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Danh sách sự cố ({incidentsData.length})
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Quản lý tất cả sự cố và cảnh báo an toàn
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Sự cố
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Người báo cáo & Phòng ban
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Ưu tiên & Trạng thái
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Vị trí & Người phụ trách
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Ngày & Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {incidentsData.map((incident) => (
                      <tr key={incident.id} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-lg mr-3">
                              <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {incident.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {incident.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">
                            {incident.reportedBy}
                          </div>
                          <div className="text-sm text-gray-500">
                            {incident.department}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="mb-2">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              incident.priority === 'critical' 
                                ? 'bg-red-100 text-red-800 border border-red-200' 
                                : incident.priority === 'high'
                                ? 'bg-orange-100 text-orange-800 border border-orange-200'
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}>
                              {incident.priorityText}
                            </span>
                          </div>
                          <div>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              incident.status === 'resolved' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : incident.status === 'investigating'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-gray-100 text-gray-800 border border-gray-200'
                            }`}>
                              {incident.statusText}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 mb-2 flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {incident.location}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {incident.assignedTo}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {incident.reportedDate}
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
                    Hiển thị {incidentsData.length} trong tổng số {incidentsData.length} sự cố
                  </p>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" className="bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Xuất báo cáo
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