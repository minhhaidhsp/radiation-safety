/**
 * Trang Danh Mục Thiết Bị - Quản lý danh mục thiết bị và lịch sử mượn/trả
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
  List,
  Calendar,
  User,
  Package
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import FeatureSidebar from '../../components/FeatureSidebar'

export default function Equipment() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  
  // Mock data cho thiết bị
  const equipmentData = [
    {
      id: 1,
      name: 'Máy đo liều cá nhân TLD-100',
      model: 'TLD-100',
      serialNumber: 'SN-TLD-001',
      department: 'Phòng X-quang',
      status: 'available',
      statusText: 'Có sẵn',
      lastCalibration: '25/09/2025',
      nextCalibration: '25/12/2025',
      currentUser: 'Chưa có',
      location: 'Kho thiết bị A'
    },
    {
      id: 2,
      name: 'Máy đo liều OSL',
      model: 'OSL-200',
      serialNumber: 'SN-OSL-002',
      department: 'Phòng CT Scanner',
      status: 'borrowed',
      statusText: 'Đang mượn',
      lastCalibration: '24/09/2025',
      nextCalibration: '24/12/2025',
      currentUser: 'Nguyễn Văn A',
      location: 'Phòng CT Scanner'
    },
    {
      id: 3,
      name: 'Máy đo liều phóng xạ',
      model: 'RAD-300',
      serialNumber: 'SN-RAD-003',
      department: 'Phòng X-quang',
      status: 'maintenance',
      statusText: 'Bảo trì',
      lastCalibration: '23/09/2025',
      nextCalibration: '23/12/2025',
      currentUser: 'Chưa có',
      location: 'Phòng bảo trì'
    }
  ]

  // Thống kê
  const stats = [
    { label: 'Tổng thiết bị', value: '45', change: '+8%' },
    { label: 'Có sẵn', value: '32', change: '+5%' },
    { label: 'Đang mượn', value: '10', change: '+2%' },
    { label: 'Bảo trì', value: '3', change: '+1%' }
  ]

  const filteredData = equipmentData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
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
            <span className="text-gray-900 font-medium">Danh mục thiết bị</span>
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
                  <List className="w-10 h-10 text-[#004C99]" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                DANH MỤC THIẾT BỊ
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Quản lý danh mục thiết bị và theo dõi lịch sử mượn/trả thiết bị
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
                  placeholder="Tìm kiếm thiết bị, model, số serial..."
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
                  Thêm thiết bị
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 border border-gray-200 w-fit">
              {['all', 'available', 'borrowed', 'maintenance'].map((tab) => (
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
                  {tab === 'available' && 'Có sẵn'}
                  {tab === 'borrowed' && 'Đang mượn'}
                  {tab === 'maintenance' && 'Bảo trì'}
                </button>
              ))}
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Danh sách thiết bị ({filteredData.length})
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Quản lý tất cả thiết bị trong danh mục
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Thiết bị
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Model & Số Serial
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Phòng ban & Vị trí
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Trạng thái & Người dùng
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Hiệu chuẩn & Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                              <Package className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: TB{item.id.toString().padStart(3, '0')}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium mb-1">
                            {item.model}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.serialNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">
                            {item.department}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="mb-2">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              item.status === 'available' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : item.status === 'borrowed'
                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                              {item.statusText}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {item.currentUser}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Lần cuối: {item.lastCalibration}
                          </div>
                          <div className="text-sm text-gray-500 mb-3">
                            Tiếp theo: {item.nextCalibration}
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
                    Hiển thị {filteredData.length} trong tổng số {equipmentData.length} thiết bị
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