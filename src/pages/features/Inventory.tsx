/**
 * Inventory feature page - Theo dõi tồn kho và quản lý vật tư
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Search, Plus, Download, Share, Edit, Trash2, Package, Layers, Home, ChevronRight, ArrowLeft, BarChart3, AlertTriangle } from 'lucide-react'
import FeatureSidebar from '../../components/FeatureSidebar'

interface InventoryItem {
  id: number
  name: string
  description: string
  category: string
  quantity: number
  minStock: number
  location: string
  lastUpdated: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const inventoryItems: InventoryItem[] = [
    {
      id: 1,
      name: 'Vật tư X-quang',
      description: 'Phim X-quang các loại, chất cản quang',
      category: 'xray',
      quantity: 150,
      minStock: 50,
      location: 'Kho A - Kệ 3',
      lastUpdated: '25/09/2025',
      status: 'in-stock'
    },
    {
      id: 2,
      name: 'Thiết bị bảo hộ',
      description: 'Áo chì, kính bảo hộ, găng tay',
      category: 'protection',
      quantity: 25,
      minStock: 30,
      location: 'Kho B - Kệ 1',
      lastUpdated: '24/09/2025',
      status: 'low-stock'
    },
    {
      id: 3,
      name: 'Hóa chất xử lý',
      description: 'Dung dịch phát triển, cố định phim',
      category: 'chemicals',
      quantity: 0,
      minStock: 10,
      location: 'Kho C - Kệ 2',
      lastUpdated: '22/09/2025',
      status: 'out-of-stock'
    },
    {
      id: 4,
      name: 'Vật tư tiêu hao',
      description: 'Kim tiêm, bơm tiêm, dây truyền',
      category: 'consumables',
      quantity: 200,
      minStock: 100,
      location: 'Kho A - Kệ 4',
      lastUpdated: '20/09/2025',
      status: 'in-stock'
    }
  ]

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'xray', name: 'Vật tư X-quang' },
    { id: 'protection', name: 'Bảo hộ' },
    { id: 'chemicals', name: 'Hóa chất' },
    { id: 'consumables', name: 'Tiêu hao' }
  ]

  const statusColors = {
    'in-stock': 'bg-green-100 text-green-800',
    'low-stock': 'bg-yellow-100 text-yellow-800',
    'out-of-stock': 'bg-red-100 text-red-800'
  }

  const statusLabels = {
    'in-stock': 'Đủ tồn kho',
    'low-stock': 'Sắp hết',
    'out-of-stock': 'Hết hàng'
  }

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalItems = inventoryItems.length
  const lowStockItems = inventoryItems.filter(item => item.status === 'low-stock').length
  const outOfStockItems = inventoryItems.filter(item => item.status === 'out-of-stock').length
  const totalQuantity = inventoryItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 pt-28">
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
                <span className="text-gray-900 font-medium">Theo dõi tồn kho</span>
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
                THEO DÕI TỒN KHO
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Quản lý kho vật tư, nguyên liệu và sản phẩm phóng xạ
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng mặt hàng</CardTitle>
                  <Package className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{totalItems}</div>
                  <p className="text-xs text-gray-600">Mặt hàng trong kho</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng số lượng</CardTitle>
                  <Layers className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{totalQuantity}</div>
                  <p className="text-xs text-gray-600">Đơn vị tồn kho</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sắp hết hàng</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{lowStockItems}</div>
                  <p className="text-xs text-gray-600">Cần bổ sung</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Hết hàng</CardTitle>
                  <BarChart3 className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{outOfStockItems}</div>
                  <p className="text-xs text-gray-600">Cần đặt hàng</p>
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
                      placeholder="Tìm kiếm mặt hàng..."
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
                  Thêm mặt hàng
                </Button>
              </div>
            </div>

            {/* Inventory Items Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredItems.map(item => (
                <Card key={item.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-gray-800">{item.name}</CardTitle>
                      <Badge className={statusColors[item.status]}>
                        {statusLabels[item.status]}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-700">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Số lượng: <strong>{item.quantity}/{item.minStock}</strong></span>
                        <span>Vị trí: <strong>{item.location}</strong></span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Loại: <strong>{categories.find(c => c.id === item.category)?.name}</strong></span>
                        <span>Cập nhật: <strong>{item.lastUpdated}</strong></span>
                      </div>

                      {/* Stock Level Indicator */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.status === 'in-stock' ? 'bg-green-500' :
                            item.status === 'low-stock' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ 
                            width: `${Math.min(100, (item.quantity / item.minStock) * 100)}%` 
                          }}
                        />
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
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy mặt hàng phù hợp
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