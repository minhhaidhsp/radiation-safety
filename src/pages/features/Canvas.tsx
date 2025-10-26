/**
 * Trang Canvas - Công cụ vẽ và chỉnh sửa
 */
import { Link } from 'react-router'
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
  Trash2,
  Palette,
  Layers,
  Save,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Settings,
  Share2,
  Image,
  Type,
  Square,
  Circle
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../../components/ui/button'
import FeatureSidebar from '../../components/FeatureSidebar'

export default function Canvas() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  
  // Mock data cho các bản vẽ
  const drawingsData = [
    {
      id: 1,
      name: 'Sơ đồ bố trí thiết bị X-quang',
      description: 'Bố trí thiết bị X-quang trong phòng chụp',
      createdBy: 'Nguyễn Văn A',
      status: 'completed',
      statusText: 'Hoàn thành',
      createdDate: '25/09/2025',
      lastModified: '2 giờ trước',
      department: 'Phòng Kỹ thuật',
      type: 'Sơ đồ bố trí',
      fileSize: '2.5 MB',
      tags: ['X-quang', 'Bố trí', 'An toàn']
    },
    {
      id: 2,
      name: 'Sơ đồ đường đi chất thải',
      description: 'Đường vận chuyển chất thải phóng xạ',
      createdBy: 'Trần Thị B',
      status: 'draft',
      statusText: 'Bản nháp',
      createdDate: '24/09/2025',
      lastModified: '5 giờ trước',
      department: 'Phòng Môi trường',
      type: 'Sơ đồ vận chuyển',
      fileSize: '1.8 MB',
      tags: ['Chất thải', 'Vận chuyển', 'An toàn']
    },
    {
      id: 3,
      name: 'Bản vẽ kỹ thuật máy đo liều',
      description: 'Bản vẽ chi tiết máy đo liều bức xạ',
      createdBy: 'Lê Văn C',
      status: 'completed',
      statusText: 'Hoàn thành',
      createdDate: '23/09/2025',
      lastModified: '1 ngày trước',
      department: 'Phòng Kỹ thuật',
      type: 'Bản vẽ kỹ thuật',
      fileSize: '3.2 MB',
      tags: ['Máy đo liều', 'Kỹ thuật', 'Bảo trì']
    }
  ]

  // Thống kê
  const stats = [
    { label: 'Tổng bản vẽ', value: '24', change: '+8%' },
    { label: 'Đang chỉnh sửa', value: '6', change: '+2%' },
    { label: 'Đã hoàn thành', value: '15', change: '+5%' },
    { label: 'Đã chia sẻ', value: '12', change: '+3%' }
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
            <span className="text-gray-900 font-medium">Canvas</span>
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
                  <Palette className="w-10 h-10 text-[#004C99]" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                CÔNG CỤ VẼ VÀ CHỈNH SỬA
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tạo và chỉnh sửa các bản vẽ kỹ thuật, sơ đồ bố trí thiết bị với công cụ trực quan
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

            {/* Công cụ vẽ */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Công cụ vẽ</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" className="bg-transparent">
                    <Undo2 className="w-4 h-4 mr-2" />
                    Hoàn tác
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Redo2 className="w-4 h-4 mr-2" />
                    Làm lại
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                {[
                  { icon: Square, label: 'Hình vuông', color: 'text-blue-600' },
                  { icon: Circle, label: 'Hình tròn', color: 'text-green-600' },
                  { icon: Type, label: 'Văn bản', color: 'text-purple-600' },
                  { icon: Image, label: 'Hình ảnh', color: 'text-orange-600' },
                  { icon: Layers, label: 'Lớp', color: 'text-red-600' },
                  { icon: Settings, label: 'Cài đặt', color: 'text-gray-600' }
                ].map((tool, index) => (
                  <div key={index} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                    <tool.icon className={`w-8 h-8 ${tool.color} mb-2`} />
                    <span className="text-sm text-gray-700">{tool.label}</span>
                  </div>
                ))}
              </div>

              {/* Khu vực vẽ */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                  <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">Khu vực vẽ - Kéo thả công cụ vào đây</p>
                  <Button className="bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Bắt đầu vẽ
                  </Button>
                </div>
              </div>
            </div>

            {/* Danh sách bản vẽ */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Bản vẽ của tôi ({drawingsData.length})
                    </h2>
                    <p className="text-gray-600 text-sm mt-1">
                      Danh sách các bản vẽ đã tạo và đang chỉnh sửa
                    </p>
                  </div>
                  <Button className="bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo bản vẽ mới
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Tên bản vẽ
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Người tạo & Phòng ban
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Loại & Kích thước
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Ngày & Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {drawingsData.map((drawing) => (
                      <tr key={drawing.id} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 mb-1">
                              {drawing.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {drawing.description}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {drawing.tags.map((tag, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 font-medium">
                            {drawing.createdBy}
                          </div>
                          <div className="text-sm text-gray-500">
                            {drawing.department}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 mb-1">
                            {drawing.type}
                          </div>
                          <div className="text-sm text-gray-500">
                            {drawing.fileSize}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            drawing.status === 'completed' 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          }`}>
                            {drawing.statusText}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 mb-2">
                            {drawing.createdDate}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}