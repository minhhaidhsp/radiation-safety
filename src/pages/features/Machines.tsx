/**
 * Trang quản lý máy móc
 * Theo dõi và quản lý các thiết bị máy móc trong hệ thống
 */
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Plus, Cpu, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import FeatureSidebar from '../../components/FeatureSidebar'

interface Machine {
  id: string
  name: string
  type: string
  status: 'operational' | 'maintenance' | 'out-of-service'
  lastMaintenance: string
  nextMaintenance: string
  location: string
  operator: string
}

export default function Machines() {
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  
  const machinesData: Machine[] = [
    {
      id: '1',
      name: 'Máy X-quang di động',
      type: 'Chẩn đoán',
      status: 'operational',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      location: 'Phòng khám A',
      operator: 'Nguyễn Văn A'
    },
    {
      id: '2',
      name: 'Máy CT Scanner',
      type: 'Chẩn đoán',
      status: 'maintenance',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-01-25',
      location: 'Khoa Chẩn đoán',
      operator: 'Trần Thị B'
    },
    {
      id: '3',
      name: 'Máy gia tốc tuyến tính',
      type: 'Điều trị',
      status: 'operational',
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-02-12',
      location: 'Khoa Xạ trị',
      operator: 'Lê Văn C'
    }
  ]

  const stats = {
    total: machinesData.length,
    operational: machinesData.filter(m => m.status === 'operational').length,
    maintenance: machinesData.filter(m => m.status === 'maintenance').length
  }

  const filteredData = machinesData.filter(machine =>
    machine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    machine.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 bg-green-50'
      case 'maintenance': return 'text-yellow-600 bg-yellow-50'
      case 'out-of-service': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return 'Hoạt động'
      case 'maintenance': return 'Bảo trì'
      case 'out-of-service': return 'Ngừng hoạt động'
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
                <span className="text-[#004C99]">Quản lý máy móc</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Quản lý máy móc</h1>
                  <p className="text-gray-600 mt-2">Theo dõi và quản lý các thiết bị máy móc trong hệ thống</p>
                </div>
                <Button className="bg-[#004C99] hover:bg-[#003366]">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm máy móc
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tổng số máy</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Cpu className="w-6 h-6 text-[#004C99]" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">{stats.operational}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Đang bảo trì</p>
                    <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.maintenance}</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-xl">
                    <Clock className="w-6 h-6 text-yellow-600" />
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
                    placeholder="Tìm kiếm máy móc, loại thiết bị..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-transparent">Tất cả</Button>
                  <Button variant="outline" className="bg-transparent">Chẩn đoán</Button>
                  <Button variant="outline" className="bg-transparent">Điều trị</Button>
                </div>
              </div>
            </div>

            {/* Machines Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Tên máy</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Loại</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Trạng thái</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Vị trí</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Người vận hành</th>
                      <th className="text-left py-4 px-6 text-sm font-medium text-gray-900">Bảo trì gần nhất</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.map((machine) => (
                      <tr key={machine.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <p className="font-medium text-gray-900">{machine.name}</p>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {machine.type}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(machine.status)}`}>
                            {getStatusText(machine.status)}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-gray-600">{machine.location}</p>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-gray-600">{machine.operator}</p>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <p className="text-sm text-gray-900">{machine.lastMaintenance}</p>
                            <p className="text-xs text-gray-500">Tiếp theo: {machine.nextMaintenance}</p>
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