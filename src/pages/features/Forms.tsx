/**
 * Forms feature page - Quáº£n lÃ½ biá»ƒu máº«u
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Search, Plus, FileText, Download, Edit, Users, Calendar, Home, ChevronRight, ArrowLeft } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs'
import FeatureLayout from '../../components/FeatureLayout'

interface FormTemplate {
  id: number
  title: string
  description: string
  category: string
  submissions: number
  lastUpdated: string
  status: 'active' | 'draft' | 'archived'
}

export default function Forms() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeTab, setActiveTab] = useState<'templates'|'submissions'>('templates')

  // Tạm thời chuẩn hóa các chuỗi tiếng Việt bị lỗi mã hóa
  const normalizeVN = (s: string) => {
    const map: Record<string, string> = {
      'Bieu mau kiem tra an toan': 'Biểu mẫu kiểm tra an toàn',
    'Bao cao su co': 'Báo cáo sự cố',
    'Dang ky su dung thiet bi': 'Đăng ký sử dụng thiết bị',
    'Bieu mau dao tao': 'Biểu mẫu đào tạo',
    'Danh gia dinh ky cac tieu chuan an toan buc xa': 'Đánh giá định kỳ các tiêu chuẩn an toàn bức xạ',
    'Ghi nhan va bao cao cac su co lien quan den buc xa': 'Ghi nhận và báo cáo các sự cố liên quan đến bức xạ',
    'Dang ky va theo doi su dung thiet bi buc xa': 'Đăng ký và theo dõi sử dụng thiết bị bức xạ',
    'Danh gia va theo doi dao tao an toan buc xa': 'Đánh giá và theo dõi đào tạo an toàn bức xạ'
    }
    return map[s] ?? s
  }

  const formTemplates: FormTemplate[] = [
  {
    id: 1,
    title: 'Biểu mẫu kiểm tra an toàn',
    description: 'Đánh giá định kỳ các tiêu chuẩn an toàn bức xạ',
    category: 'safety',
    submissions: 45,
    lastUpdated: '25/09/2025',
    status: 'active'
  },
  {
    id: 2,
    title: 'Báo cáo sự cố',
    description: 'Ghi nhận và báo cáo các sự cố liên quan đến bức xạ',
    category: 'incident',
    submissions: 12,
    lastUpdated: '24/09/2025',
    status: 'active'
  },
  {
    id: 3,
    title: 'Đăng ký sử dụng thiết bị',
    description: 'Đăng ký và theo dõi sử dụng thiết bị bức xạ',
    category: 'equipment',
    submissions: 89,
    lastUpdated: '22/09/2025',
    status: 'active'
  },
  {
    id: 4,
    title: 'Biểu mẫu đào tạo',
    description: 'Đánh giá và theo dõi đào tạo an toàn bức xạ',
    category: 'training',
    submissions: 67,
    lastUpdated: '20/09/2025',
    status: 'draft'
  }
]

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'safety', name: 'An toàn' },
    { id: 'incident', name: 'Sự cố' },
    { id: 'equipment', name: 'Thiết bị' },
    { id: 'training', name: 'Đào tạo' }
  ]

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    archived: 'bg-gray-100 text-gray-800'
  }

  const displayTemplates = formTemplates.map(t => ({
    ...t,
    title: normalizeVN(t.title),
    description: normalizeVN(t.description)
  }))

  const displayCategories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'safety', name: 'An toàn' },
    { id: 'incident', name: 'Sự cố' },
    { id: 'equipment', name: 'Thiết bị' },
    { id: 'training', name: 'Đào tạo' }
  ]

  const filteredForms = displayTemplates.filter(form => {
    const matchesSearch = form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <FeatureLayout>
            {/* Breadcrumb vÃ  nÃºt Back */}
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
                <span className="text-gray-900 font-medium">Quản lý biểu mẫu</span>
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
                QUẢN LÝ BIỂU MẪU
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Tạo và quản lý các biểu mẫu, báo cáo an toàn bức xạ
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng biểu mẫu</CardTitle>
                  <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <p className="text-xs text-gray-600">+2 tháng này</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <p className="text-xs text-gray-600">Đang sử dụng</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Lượt gửi</CardTitle>
                  <Download className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">213</div>
                  <p className="text-xs text-gray-600">Tháng này</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cập nhật gần nhất</CardTitle>
                  <Calendar className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">Hôm nay</div>
                  <p className="text-xs text-gray-600">25/09/2025</p>
                </CardContent>
              </Card>
            </div>

            

              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="templates">Mẫu biểu</TabsTrigger>
                <TabsTrigger value="submissions">Lượt nộp</TabsTrigger>
              </TabsList>

              <TabsContent value="templates">
                {/* Search and Filter */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-4 flex-1">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="text"
                          placeholder="Tìm kiếm biểu mẫu..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-3 border-gray-300 rounded-xl"
                        />
                      </div>
                               
                  <div className="flex gap-2 flex-wrap">
                    {displayCategories.map(category => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        className="bg-transparent"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo biểu mẫu mới
                </Button>
              </div>
            </div>

            {/* Forms Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tên biểu mẫu</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Danh mục</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Lượt nộp</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cập nhật</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredForms.map(form => (
                      <tr key={form.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 text-sm font-medium text-gray-900">{form.title}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{displayCategories.find(c => c.id === form.category)?.name}</td>
                        <td className="px-6 py-3 text-sm"><Badge className={statusColors[form.status]}>{form.status === 'active' ? 'Đang hoạt động' : form.status === 'draft' ? 'Bản nháp' : 'Đã lưu trữ'}</Badge></td>
                        <td className="px-6 py-3 text-sm text-gray-700">{form.submissions}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{form.lastUpdated}</td>
                        <td className="px-6 py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-transparent"><Edit className="w-4 h-4" /></Button>
                            <Button variant="outline" size="sm" className="bg-transparent"><Download className="w-4 h-4" /></Button>
                            <Button variant="outline" size="sm" className="bg-transparent"><Users className="w-4 h-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Empty State */}
            {filteredForms.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  KhÃ´ng tÃ¬m tháº¥y biá»ƒu máº«u phÃ¹ há»£p
                </h3>
                <p className="text-gray-500">
                  Thá»­ thay Ä‘á»•i tá»« khÃ³a tÃ¬m kiáº¿m hoáº·c bá»™ lá»c
                </p>
              </div>
            )}              </TabsContent>

              <TabsContent value="submissions">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Danh sách Lượt nộp</h3>
                        <p className="text-sm text-gray-600">D? li?u mô ph?ng</p>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input placeholder="Tìm theo Người nộp..." className="pl-10 w-64" />
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Mẫu</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Người nộp</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phòng ban</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tr?ng thái</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Thời gian</th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hành d?ng</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {
                          [
                            {
                              id: 'SUB-001',
                              template: 'Báo cáo sự cố',
                              user: 'Trần Thị B',
                              dept: 'CT Scan',
                              status: 'Đã duyệt',
                              time: '25/09/2025'
                            },
                            {
                              id: 'SUB-002',
                              template: 'Kiểm tra an toàn',
                              user: 'Nguyễn Văn A',
                              dept: 'X-quang',
                              status: 'Đang xử lý',
                              time: '24/09/2025'
                            },
                            {
                              id: 'SUB-003',
                              template: 'Đăng ký sử dụng thiết bị',
                              user: 'Lê Văn C',
                              dept: 'MRI',
                              status: 'Từ chối',
                              time: '23/09/2025'
                            }
                          ] .map(row => (
                            <tr key={row.id} className="hover:bg-gray-50">
                              <td className="px-6 py-3 text-sm font-medium text-gray-900">{row.id}</td>
                              <td className="px-6 py-3 text-sm text-gray-700">{row.template}</td>
                              <td className="px-6 py-3 text-sm text-gray-700">{row.user}</td>
                              <td className="px-6 py-3 text-sm text-gray-700">{row.dept}</td>
                              <td className="px-6 py-3 text-sm text-gray-700">{row.status}</td>
                              <td className="px-6 py-3 text-sm text-gray-700">{row.time}</td>
                              <td className="px-6 py-3">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" className="bg-transparent"><FileText className="w-4 h-4" /></Button>
                                  <Button variant="outline" size="sm" className="bg-transparent"><Download className="w-4 h-4" /></Button>
                                </div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
    </FeatureLayout>
  )
}







