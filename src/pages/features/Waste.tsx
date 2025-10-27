/**
 * Quản lý chất thải - Trang theo dõi và xử lý chất thải phóng xạ
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Search, Plus, Download, Share, Edit, Trash2, Trash, AlertTriangle, Package, Home, ChevronRight, ArrowLeft, Calendar, MapPin, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import FeatureLayout from '../../components/FeatureLayout'

interface WasteItem {
  id: number
  name: string
  description: string
  category: string
  quantity: number
  radioactivity: string
  location: string
  storedDate: string
  disposalDate: string
  status: 'stored' | 'processing' | 'disposed'
}

export default function Waste() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'quantity' | 'radioactivity' | 'location' | 'storedDate' | 'disposalDate' | 'status'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const wasteItems: WasteItem[] = [
    {
      id: 1,
      name: 'Chất thải phóng xạ rắn',
      description: 'Vật liệu nhiễm xạ từ thiết bị X-quang',
      category: 'solid',
      quantity: 25,
      radioactivity: 'Thấp',
      location: 'Kho chất thải A',
      storedDate: '25/09/2025',
      disposalDate: '25/12/2025',
      status: 'stored'
    },
    {
      id: 2,
      name: 'Chất thải lỏng nhiễm xạ',
      description: 'Dung dịch xử lý phim nhiễm xạ',
      category: 'liquid',
      quantity: 120,
      radioactivity: 'Trung bình',
      location: 'Bể chứa B',
      storedDate: '24/09/2025',
      disposalDate: '24/10/2025',
      status: 'processing'
    },
    {
      id: 3,
      name: 'Vật liệu bảo hộ nhiễm xạ',
      description: 'Áo chì, găng tay đã qua sử dụng',
      category: 'protection',
      quantity: 45,
      radioactivity: 'Thấp',
      location: 'Kho chất thải C',
      storedDate: '22/09/2025',
      disposalDate: '22/08/2025',
      status: 'disposed'
    },
    {
      id: 4,
      name: 'Nguồn phóng xạ hết hạn',
      description: 'Nguồn phóng xạ y tế đã hết hiệu lực',
      category: 'sources',
      quantity: 8,
      radioactivity: 'Cao',
      location: 'Kho an toàn D',
      storedDate: '20/09/2025',
      disposalDate: '20/11/2025',
      status: 'stored'
    }
  ]

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'solid', name: 'Chất thải rắn' },
    { id: 'liquid', name: 'Chất thải lỏng' },
    { id: 'protection', name: 'Vật liệu bảo hộ' },
    { id: 'sources', name: 'Nguồn phóng xạ' }
  ]

  const statusColors = {
    stored: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    disposed: 'bg-green-100 text-green-800'
  }

  const statusLabels = {
    stored: 'Đang lưu trữ',
    processing: 'Đang xử lý',
    disposed: 'Đã tiêu hủy'
  }

  const radioactivityColors = {
    'Thấp': 'bg-green-100 text-green-800',
    'Trung bình': 'bg-yellow-100 text-yellow-800',
    'Cao': 'bg-red-100 text-red-800'
  }

  const filteredItems = wasteItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const parseDate = (d: string) => {
    const [day, month, year] = d.split('/').map(Number)
    return new Date(year, (month || 1) - 1, day || 1).getTime()
  }

  const radioOrder: Record<string, number> = { 'Thấp': 1, 'Trung bình': 2, 'Cao': 3 }
  const statusOrder: Record<WasteItem['status'], number> = { stored: 1, processing: 2, disposed: 3 }

  const sortedItems = [...filteredItems].sort((a, b) => {
    let cmp = 0
    switch (sortBy) {
      case 'name': cmp = a.name.localeCompare(b.name); break
      case 'category': cmp = a.category.localeCompare(b.category); break
      case 'quantity': cmp = a.quantity - b.quantity; break
      case 'radioactivity':
        cmp = (radioOrder[a.radioactivity] ?? 0) - (radioOrder[b.radioactivity] ?? 0)
        break
      case 'location': cmp = a.location.localeCompare(b.location); break
      case 'storedDate': cmp = parseDate(a.storedDate) - parseDate(b.storedDate); break
      case 'disposalDate': cmp = parseDate(a.disposalDate) - parseDate(b.disposalDate); break
      case 'status': cmp = statusOrder[a.status] - statusOrder[b.status]; break
    }
    return sortDir === 'asc' ? cmp : -cmp
  })

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortBy(field); setSortDir('asc') }
  }

  const totalItems = wasteItems.length
  const storedItems = wasteItems.filter(item => item.status === 'stored').length
  const processingItems = wasteItems.filter(item => item.status === 'processing').length
  const disposedItems = wasteItems.filter(item => item.status === 'disposed').length
  const totalQuantity = wasteItems.reduce((sum, item) => sum + item.quantity, 0)

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
                <span className="text-gray-900 font-medium">Quản lý chất thải</span>
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
                QUẢN LÝ CHẤT THẢI
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Theo dõi và quản lý chất thải phóng xạ, vật liệu nhiễm xạ
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng chất thải</CardTitle>
                  <Trash className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
                  <p className="text-xs text-gray-600">Loại chất thải</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đang lưu trữ</CardTitle>
                  <Package className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{storedItems}</div>
                  <p className="text-xs text-gray-600">Chờ xử lý</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đang xử lý</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{processingItems}</div>
                  <p className="text-xs text-gray-600">Trong quá trình</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đã tiêu hủy</CardTitle>
                  <Trash2 className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{disposedItems}</div>
                  <p className="text-xs text-gray-600">Hoàn thành</p>
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
                      placeholder="Tìm kiếm chất thải..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 border-gray-300 rounded-xl"
                    />
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {categories.map(category => (
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
                  Thêm chất thải
                </Button>
              </div>
            </div>

            {/* Waste Items Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('name')}>
                          Tên
                          {sortBy !== 'name' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('category')}>
                          Loại
                          {sortBy !== 'category' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('quantity')}>
                          Số lượng
                          {sortBy !== 'quantity' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Mức phóng xạ</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Vị trí</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ngày lưu</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ngày xử lý</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Trạng thái</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedItems.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{categories.find(c => c.id === item.category)?.name}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{item.quantity}</div></td>
                        <td className="px-6 py-4"><Badge className={radioactivityColors[item.radioactivity as keyof typeof radioactivityColors]}>{item.radioactivity}</Badge></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{item.location}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{item.storedDate}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{item.disposalDate}</div></td>
                        <td className="px-6 py-4"><Badge className={statusColors[item.status]}>{statusLabels[item.status]}</Badge></td>
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

            {/* Waste Items Grid */}
            <div className="hidden grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredItems.map(item => (
                <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-gray-800">{item.name}</CardTitle>
                      <div className="flex gap-2">
                        <Badge className={radioactivityColors[item.radioactivity as keyof typeof radioactivityColors]}>
                          {item.radioactivity}
                        </Badge>
                        <Badge className={statusColors[item.status]}>
                          {statusLabels[item.status]}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-gray-700">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Số lượng: <strong>{item.quantity} đơn vị</strong></span>
                        <span>Loại: <strong>{categories.find(c => c.id === item.category)?.name}</strong></span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          Vị trí: <strong className="ml-1">{item.location}</strong>
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Lưu trữ: <strong className="ml-1">{item.storedDate}</strong>
                        </span>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Ngày tiêu hủy: <strong>{item.disposalDate}</strong></span>
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
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Trash className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy chất thải phù hợp
                </h3>
                <p className="text-gray-500">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                </p>
              </div>
            )}
    </FeatureLayout>
  )
}
