/**
 * Hệ thống báo cáo - Trang tạo và quản lý báo cáo
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Search, Plus, Download, Share, Edit, Trash2, FileText, BarChart3, Calendar, Users, Home, ChevronRight, ArrowLeft, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import FeatureSidebar from '../../components/FeatureSidebar'

interface Report {
  id: number
  title: string
  description: string
  type: 'periodic' | 'statistical' | 'export' | 'custom'
  lastGenerated: string
  status: 'draft' | 'published' | 'scheduled'
  schedule: string
  fileSize: string
  generatedBy: string
}

export default function Reporting() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState<'title' | 'type' | 'lastGenerated' | 'status' | 'schedule' | 'fileSize' | 'generatedBy'>('title')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const reports: Report[] = [
    {
      id: 1,
      title: 'Báo cáo liều lượng hàng tháng',
      description: 'Tổng hợp liều lượng phóng xạ của nhân viên tháng 09/2025',
      type: 'periodic',
      lastGenerated: '25/09/2025',
      status: 'published',
      schedule: 'Hàng tháng',
      fileSize: '2.4 MB',
      generatedBy: 'Nguyễn Văn A'
    },
    {
      id: 2,
      title: 'Thống kê sử dụng thiết bị',
      description: 'Phân tích tần suất sử dụng các máy X-quang và CT',
      type: 'statistical',
      lastGenerated: '24/09/2025',
      status: 'draft',
      schedule: 'Theo yêu cầu',
      fileSize: '1.8 MB',
      generatedBy: 'Trần Thị B'
    },
    {
      id: 3,
      title: 'Xuất dữ liệu tồn kho',
      description: 'Báo cáo tồn kho vật tư và thiết bị y tế',
      type: 'export',
      lastGenerated: '22/09/2025',
      status: 'published',
      schedule: 'Hàng tuần',
      fileSize: '3.1 MB',
      generatedBy: 'Lê Văn C'
    },
    {
      id: 4,
      title: 'Báo cáo đào tạo nhân sự',
      description: 'Thống kê kết quả đào tạo và chứng chỉ',
      type: 'custom',
      lastGenerated: '20/09/2025',
      status: 'scheduled',
      schedule: 'Hàng quý',
      fileSize: '4.2 MB',
      generatedBy: 'Phạm Thị D'
    }
  ]

  const types = [
    { id: 'all', name: 'Tất cả' },
    { id: 'periodic', name: 'Định kỳ' },
    { id: 'statistical', name: 'Thống kê' },
    { id: 'export', name: 'Xuất dữ liệu' },
    { id: 'custom', name: 'Tùy chỉnh' }
  ]

  const statusColors = {
    draft: 'bg-yellow-100 text-yellow-800',
    published: 'bg-green-100 text-green-800',
    scheduled: 'bg-blue-100 text-blue-800'
  }

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || report.type === selectedType
    return matchesSearch && matchesType
  })

  const parseDate = (d: string) => {
    const [day, month, year] = d.split('/').map(Number)
    return new Date(year, (month || 1) - 1, day || 1).getTime()
  }

  const statusOrder: Record<Report['status'], number> = {
    draft: 1,
    scheduled: 2,
    published: 3
  }

  const sortedReports = [...filteredReports].sort((a, b) => {
    let cmp = 0
    switch (sortBy) {
      case 'title':
        cmp = a.title.localeCompare(b.title)
        break
      case 'type':
        cmp = a.type.localeCompare(b.type)
        break
      case 'lastGenerated':
        cmp = parseDate(a.lastGenerated) - parseDate(b.lastGenerated)
        break
      case 'status':
        cmp = statusOrder[a.status] - statusOrder[b.status]
        break
      case 'schedule':
        cmp = a.schedule.localeCompare(b.schedule)
        break
      case 'fileSize':
        cmp = a.fileSize.localeCompare(b.fileSize)
        break
      case 'generatedBy':
        cmp = a.generatedBy.localeCompare(b.generatedBy)
        break
    }
    return sortDir === 'asc' ? cmp : -cmp
  })

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortBy(field); setSortDir('asc') }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-50 py-8 pt-28">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <FeatureSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
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
                <span className="text-gray-900 font-medium">Báo cáo</span>
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
                HỆ THỐNG BÁO CÁO
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Tạo, quản lý và xuất các báo cáo định kỳ, thống kê và tùy chỉnh
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng báo cáo</CardTitle>
                  <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <p className="text-xs text-gray-600">+12 tháng này</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đã xuất bản</CardTitle>
                  <Download className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">89</div>
                  <p className="text-xs text-gray-600">Đang sử dụng</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Bản nháp</CardTitle>
                  <Edit className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">24</div>
                  <p className="text-xs text-gray-600">Đang chỉnh sửa</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đã lên lịch</CardTitle>
                  <Calendar className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">43</div>
                  <p className="text-xs text-gray-600">Tự động tạo</p>
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
                      placeholder="Tìm kiếm báo cáo..."
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
                  Tạo báo cáo mới
                </Button>
              </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('title')}>
                          Tiêu đề
                          {sortBy !== 'title' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('type')}>
                          Loại
                          {sortBy !== 'type' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('lastGenerated')}>
                          Lần tạo cuối
                          {sortBy !== 'lastGenerated' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('status')}>
                          Trạng thái
                          {sortBy !== 'status' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('schedule')}>
                          Lịch trình
                          {sortBy !== 'schedule' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('fileSize')}>
                          Kích thước
                          {sortBy !== 'fileSize' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('generatedBy')}>
                          Tạo bởi
                          {sortBy !== 'generatedBy' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedReports.map(report => (
                      <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{report.title}</div>
                          <div className="text-xs text-gray-500">{report.description}</div>
                        </td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{types.find(t => t.id === report.type)?.name}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{report.lastGenerated}</div></td>
                        <td className="px-6 py-4"><Badge className={statusColors[report.status]}>{report.status === 'draft' ? 'Bản nháp' : report.status === 'published' ? 'Đã xuất bản' : 'Đã lên lịch'}</Badge></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{report.schedule}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{report.fileSize}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{report.generatedBy}</div></td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-transparent p-2"><Edit className="w-4 h-4" /></Button>
                            <Button variant="outline" size="sm" className="bg-transparent p-2"><Download className="w-4 h-4" /></Button>
                            <Button variant="outline" size="sm" className="bg-transparent p-2"><Share className="w-4 h-4" /></Button>
                            <Button variant="outline" size="sm" className="bg-transparent p-2"><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="hidden grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReports.map(report => (
                <Card key={report.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-gray-800">{report.title}</CardTitle>
                      <Badge className={statusColors[report.status]}>
                        {report.status === 'draft' && 'Bản nháp'}
                        {report.status === 'published' && 'Đã xuất bản'}
                        {report.status === 'scheduled' && 'Đã lên lịch'}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-700">
                      {report.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Loại: <strong>{types.find(t => t.id === report.type)?.name}</strong></span>
                        <span>Kích thước: <strong>{report.fileSize}</strong></span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Tạo lần cuối: <strong>{report.lastGenerated}</strong></span>
                        <span>Tạo bởi: <strong>{report.generatedBy}</strong></span>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Lịch trình: <strong>{report.schedule}</strong></span>
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
            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy báo cáo phù hợp
                </h3>
                <p className="text-gray-500">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
