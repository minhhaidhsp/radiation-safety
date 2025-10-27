/**
 * Canvas feature page - Công cụ vẽ và chỉnh sửa
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Search, Plus, Download, Share, Edit, Trash2, Image, Layers, Home, ChevronRight, ArrowLeft } from 'lucide-react'
import FeatureLayout from '../../components/FeatureLayout'

interface CanvasProject {
  id: number
  title: string
  description: string
  lastModified: string
  size: string
  type: string
  status: 'draft' | 'published' | 'archived'
}

export default function Canvas() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const projects: CanvasProject[] = [
    {
      id: 1,
      title: 'Sơ đồ bố trí phòng X-quang',
      description: 'Bản vẽ chi tiết bố trí thiết bị và khu vực an toàn',
      lastModified: '25/09/2025',
      size: '2.4 MB',
      type: 'layout',
      status: 'published'
    },
    {
      id: 2,
      title: 'Biểu đồ liều lượng tháng',
      description: 'Theo dõi liều lượng phóng xạ hàng tháng',
      lastModified: '24/09/2025',
      size: '1.8 MB',
      type: 'chart',
      status: 'draft'
    },
    {
      id: 3,
      title: 'Sơ đồ thoát hiểm',
      description: 'Đường thoát hiểm và vị trí thiết bị an toàn',
      lastModified: '22/09/2025',
      size: '3.1 MB',
      type: 'safety',
      status: 'published'
    },
    {
      id: 4,
      title: 'Bản vẽ kỹ thuật máy CT',
      description: 'Bản vẽ kỹ thuật chi tiết máy chụp CT',
      lastModified: '20/09/2025',
      size: '4.2 MB',
      type: 'technical',
      status: 'archived'
    }
  ]

  const types = [
    { id: 'all', name: 'Tất cả' },
    { id: 'layout', name: 'Bố trí' },
    { id: 'chart', name: 'Biểu đồ' },
    { id: 'safety', name: 'An toàn' },
    { id: 'technical', name: 'Kỹ thuật' }
  ]

  const statusColors = {
    draft: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800'
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || project.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <FeatureLayout>
            {/* Breadcrumb và nút Back */}
            <div className="flex items-center justify-between mb-8">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link to="/" className="flex items-center hover:text-gray-900 transition-colors">
                  <Home className="w-4 h-4 mr-2" />
                  Trang chủ
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link to="/features" className="hover:text-gray-900 transition-colors">
                Các chức năng
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">Công cụ vẽ và chỉnh sửa</span>
              </nav>

              <Link
                to="/features"
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 text-[#004C99] hover:from-blue-100 hover:to-teal-100 transition-all duration-300 rounded-lg border border-blue-200 hover:border-blue-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#004C99] to-[#00B8B0] bg-clip-text text-transparent">
                CÔNG CỤ VẼ VÀ CHỈNH SỬA
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Tạo và chỉnh sửa các bản vẽ kỹ thuật, sơ đồ bố trí thiết bị
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng dự án</CardTitle>
                  <Layers className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <p className="text-xs text-gray-600">+3 tháng này</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đã xuất bản</CardTitle>
                  <Download className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <p className="text-xs text-gray-600">Đang sử dụng</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bản nháp</CardTitle>
                  <Edit className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">4</div>
                  <p className="text-xs text-gray-600">Đang chỉnh sửa</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dung lượng</CardTitle>
                  <Image className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">42MB</div>
                  <p className="text-xs text-gray-600">Tổng cộng</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Tìm kiếm dự án..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 border-gray-300 rounded-xl"
                    />
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {types.map(type => (
                      <Button
                        key={type.id}
                        variant={selectedType === type.id ? "default" : "outline"}
                        className="bg-transparent"
                        onClick={() => setSelectedType(type.id)}
                      >
                        {type.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo dự án mới
                </Button>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map(project => (
                <Card key={project.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-gray-800">{project.title}</CardTitle>
                      <Badge className={statusColors[project.status]}>
                        {project.status === 'draft' && 'Bản nháp'}
                        {project.status === 'published' && 'Đã xuất bản'}
                        {project.status === 'archived' && 'Đã lưu trữ'}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-700">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Loại: <strong>{types.find(t => t.id === project.type)?.name}</strong></span>
                        <span>Kích thước: <strong>{project.size}</strong></span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Sửa lần cuối: <strong>{project.lastModified}</strong></span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="bg-transparent flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy dự án phù hợp
                </h3>
                <p className="text-gray-500">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                </p>
              </div>
            )}
    </FeatureLayout>
  )
}
