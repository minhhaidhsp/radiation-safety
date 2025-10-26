/**
 * Trang Đo Liều Nhân Sự - Quản lý và theo dõi liều bức xạ nhân sự
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
  User,
  Radiation,
  Calendar,
  AlertTriangle
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import FeatureSidebar from '../../components/FeatureSidebar'

export default function Dosimetry() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  
  // Mock data cho đo liều nhân sự
  const dosimetryData = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      department: 'Phòng X-quang',
      position: 'Kỹ thuật viên',
      currentDose: '2.1 mSv',
      monthlyLimit: '20 mSv',
      yearlyDose: '15.3 mSv',
      status: 'safe',
      statusText: 'An toàn',
      lastCheck: '25/09/2025',
      nextCheck: '25/10/2025',
      device: 'TLD-100'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      department: 'Phòng CT Scanner',
      position: 'Bác sĩ',
      currentDose: '8.5 mSv',
      monthlyLimit: '20 mSv',
      yearlyDose: '45.2 mSv',
      status: 'warning',
      statusText: 'Cần theo dõi',
      lastCheck: '24/09/2025',
      nextCheck: '24/10/2025',
      device: 'OSL'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      department: 'Phòng X-quang',
      position: 'Kỹ thuật viên',
      currentDose: '15.2 mSv',
      monthlyLimit: '20 mSv',
      yearlyDose: '78.1 mSv',
      status: 'alert',
      statusText: 'Cảnh báo',
      lastCheck: '23/09/2025',
      nextCheck: '23/10/2025',
      device: 'TLD-100'
    }
  ]

  // Thống kê
  const stats = [
    { label: 'Tổng nhân sự', value: '45', change: '+3%' },
    { label: 'Trong giới hạn', value: '38', change: '+2%' },
    { label: 'Cần theo dõi', value: '5', change: '+1%' },
    { label: 'Vượt ngưỡng', value: '2', change: '-1%' }
  ]

  const filteredData = dosimetryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.position.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(item => activeTab === 'all' || item.status === activeTab)

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
            <span className="text-gray-900 font-medium">Đo liều nhân sự</span>
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
                  <Radiation className="w-10 h-10 text-[#004C99]" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                QUẢN LÝ ĐO LIỀU NHÂN SỰ
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Theo dõi và quản lý liều bức xạ của nhân viên theo quy định an toàn bức xạ
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
                  placeholder="Tìm kiếm nhân viên, phòng ban, chức vụ..."
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
                  Thêm nhân sự
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 border border-gray-200 w-fit">
              {['all', 'safe', 'warning', 'alert'].map((tab) => (
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
                  {tab === 'safe' && 'An toàn'}
                  {tab === 'warning' && 'Cần theo dõi'}
                  {tab === 'alert' && 'Cảnh báo'}
                </button>
              ))}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Danh sách nhân sự ({filteredData.length})
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Quản lý thông tin đo liều bức xạ của nhân viên
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Nhân sự
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Phòng ban & Chức vụ
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Liều hiện tại & Giới hạn
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Trạng thái & Thiết bị
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Lần đo & Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                              <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: NV{item.id.toString().padStart(3, '0')}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">
                            {item.department}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.position}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 mb-1">
                            {item.currentDose} / {item.monthlyLimit}
                          </div>
                          <div className="text-sm text-gray-500">
                            Năm: {item.yearlyDose}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="mb-2">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              item.status === 'safe' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : item.status === 'warning'
                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                              {item.statusText}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.device}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {item.lastCheck}
                          </div>
                          <div className="text-sm text-gray-500 mb-3">
                            Tiếp theo: {item.nextCheck}
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
                    Hiển thị {filteredData.length} trong tổng số {dosimetryData.length} nhân sự
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