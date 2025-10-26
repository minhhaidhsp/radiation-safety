/**
 * Trang quản lý tồn kho
 * Hiển thị danh sách vật tư, thiết bị và theo dõi số lượng tồn kho
 */
import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Search, Plus, Package, TrendingUp, AlertTriangle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import FeatureSidebar from '../../components/FeatureSidebar'

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  minStock: number
  unit: string
  lastUpdated: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

export default function Inventory() {
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  
  const inventoryData: InventoryItem[] = [
    {
      id: '1',
      name: 'Vật liệu che chắn chì',
      category: 'Vật tư',
      quantity: 150,
      minStock: 50,
      unit: 'tấm',
      lastUpdated: '2024-01-15',
      status: 'in-stock'
    },
    {
      id: '2',
      name: 'Găng tay phóng xạ',
      category: 'PPE',
      quantity: 25,
      minStock: 30,
      unit: 'đôi',
      lastUpdated: '2024-01-16',
      status: 'low-stock'
    },
    {
      id: '3',
      name: 'Máy đo liều cá nhân',
      category: 'Thiết bị',
      quantity: 45,
      minStock: 20,
      unit: 'cái',
      lastUpdated: '2024-01-14',
      status: 'in-stock'
    }
  ]

  const stats = {
    totalItems: inventoryData.length,
    lowStock: inventoryData.filter(item => item.status === 'low-stock').length,
    outOfStock: inventoryData.filter(item => item.status === 'out-of-stock').length
  }

  const filteredData = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'text-green-600 bg-green-50'
      case 'low-stock': return 'text-yellow-600 bg-yellow-50'
      case 'out-of-stock': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock': return 'Đủ tồn kho'
      case 'low-stock': return 'Sắp hết'
      case 'out-of-stock': return 'Hết hàng'
      default: return 'Không xác định'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FeatureSidebar />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Link to="/features" className="hover:text-[#004C99]">Tính năng</Link>
                <span>›</span>
                <span className="text-[#004C99]">Theo dõi tồn kho</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Theo dõi tồn kho</h1>
                  <p className="text-gray-600 mt-2">Quản lý vật tư, thiết bị và theo dõi số lượng tồn kho</p>
                </div>
                <Button className="bg-[#004C99] hover:bg-[#003366]">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm vật tư
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tổng số vật tư</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalItems}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Package className="w-6 h-6 text-[#004C99]" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sắp hết hàng</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.lowStock}</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Đã hết hàng</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{stats.outOfStock}</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm vật tư, thiết bị..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-transparent">Tất cả</Button>
                  <Button variant="outline" className="bg-transparent">Vật tư</Button>
                  <Button variant="outline" className="bg-transparent">Thiết bị</Button>
                </div>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Tên vật tư</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Danh mục</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Số lượng</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Tồn kho tối thiểu</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Trạng thái</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Cập nhật</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.unit}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className="font-medium text-gray-900">{item.quantity}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-gray-600">{item.minStock}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusText(item.status)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-500">{item.lastUpdated}</p>
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