/**
 * Equipment feature page - Danh mục thiết bị
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Search, Plus, Settings, Calendar, AlertTriangle, Home, ChevronRight, ArrowLeft, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import FeatureLayout from '../../components/FeatureLayout'

interface Equipment {
  id: number
  name: string
  model: string
  serialNumber: string
  department: string
  lastMaintenance: string
  nextMaintenance: string
  status: 'operational' | 'maintenance' | 'out_of_service'
}

export default function Equipment() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState<'name' | 'model' | 'serialNumber' | 'department' | 'lastMaintenance' | 'nextMaintenance' | 'status'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const equipmentList: Equipment[] = [
    {
      id: 1,
      name: 'Máy X-quang Digital',
      model: 'DRX-5000',
      serialNumber: 'XRG-2024-001',
      department: 'X-quang',
      lastMaintenance: '15/09/2025',
      nextMaintenance: '15/12/2025',
      status: 'operational'
    },
    {
      id: 2,
      name: 'Máy CT Scan 64 lát',
      model: 'CT-64S',
      serialNumber: 'CTS-2024-002',
      department: 'CT Scan',
      lastMaintenance: '10/09/2025',
      nextMaintenance: '10/10/2025',
      status: 'maintenance'
    },
    {
      id: 3,
      name: 'Máy MRI 1.5T',
      model: 'MRI-1500',
      serialNumber: 'MRI-2024-003',
      department: 'MRI',
      lastMaintenance: '20/08/2025',
      nextMaintenance: '20/11/2025',
      status: 'operational'
    },
    {
      id: 4,
      name: 'Máy X-quang Mobile',
      model: 'Mobile-XR',
      serialNumber: 'MXR-2024-004',
      department: 'Cấp cứu',
      lastMaintenance: '05/07/2025',
      nextMaintenance: '05/10/2025',
      status: 'out_of_service'
    }
  ]

  const statusColors = {
    operational: 'bg-green-100 text-green-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    out_of_service: 'bg-red-100 text-red-800'
  }

  const statusLabels = {
    operational: 'Đang hoạt động',
    maintenance: 'Bảo trì',
    out_of_service: 'Ngừng hoạt động'
  }

  const statusFilters = [
    { id: 'all', name: 'Tất cả' },
    { id: 'operational', name: 'Đang hoạt động' },
    { id: 'maintenance', name: 'Bảo trì' },
    { id: 'out_of_service', name: 'Ngừng hoạt động' }
  ]

  const filteredEquipment = equipmentList.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         equipment.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         equipment.serialNumber.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || equipment.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const parseDate = (d: string) => {
    const [day, month, year] = d.split('/').map(Number)
    return new Date(year, (month || 1) - 1, day || 1).getTime()
  }

  const statusOrder: Record<Equipment['status'], number> = {
    operational: 1,
    maintenance: 2,
    out_of_service: 3
  }

  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    let cmp = 0
    switch (sortBy) {
      case 'name':
        cmp = a.name.localeCompare(b.name)
        break
      case 'model':
        cmp = a.model.localeCompare(b.model)
        break
      case 'serialNumber':
        cmp = a.serialNumber.localeCompare(b.serialNumber)
        break
      case 'department':
        cmp = a.department.localeCompare(b.department)
        break
      case 'lastMaintenance':
        cmp = parseDate(a.lastMaintenance) - parseDate(b.lastMaintenance)
        break
      case 'nextMaintenance':
        cmp = parseDate(a.nextMaintenance) - parseDate(b.nextMaintenance)
        break
      case 'status':
        cmp = statusOrder[a.status] - statusOrder[b.status]
        break
    }
    return sortDir === 'asc' ? cmp : -cmp
  })

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortBy(field); setSortDir('asc') }
  }

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

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#004C99] to-[#00B8B0] bg-clip-text text-transparent">
                DANH MỤC THIẾT BỊ
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Quản lý và theo dõi thiết bị y tế sử dụng bức xạ
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng thiết bị</CardTitle>
                  <Settings className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">42</div>
                  <p className="text-xs text-gray-600">Đang quản lý</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
                  <Settings className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">35</div>
                  <p className="text-xs text-gray-600">Hoạt động tốt</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đang bảo trì</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">4</div>
                  <p className="text-xs text-gray-600">Cần theo dõi</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ngừng hoạt động</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <p className="text-xs text-gray-600">Cần sửa chữa</p>
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
                      placeholder="Tìm kiếm thiết bị..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 border-gray-300 rounded-xl"
                    />
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {statusFilters.map(filter => (
                      <Button
                        key={filter.id}
                        variant={selectedStatus === filter.id ? "default" : "outline"}
                        className="bg-transparent"
                        onClick={() => setSelectedStatus(filter.id)}
                      >
                        {filter.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm thiết bị mới
                </Button>
              </div>
            </div>

            {/* Equipment Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('name')}>
                          Thiết bị
                          {sortBy !== 'name' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('model')}>
                          Model
                          {sortBy !== 'model' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('serialNumber')}>
                          Serial
                          {sortBy !== 'serialNumber' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('department')}>
                          Phòng ban
                          {sortBy !== 'department' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('lastMaintenance')}>
                          Bảo trì gần nhất
                          {sortBy !== 'lastMaintenance' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('nextMaintenance')}>
                          Kế tiếp
                          {sortBy !== 'nextMaintenance' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('status')}>
                          Trạng thái
                          {sortBy !== 'status' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedEquipment.map(equipment => (
                      <tr key={equipment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{equipment.name}</div>
                        </td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{equipment.model}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{equipment.serialNumber}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{equipment.department}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{equipment.lastMaintenance}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{equipment.nextMaintenance}</div></td>
                        <td className="px-6 py-4">
                          <Badge className={statusColors[equipment.status]}>{statusLabels[equipment.status]}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Settings className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Calendar className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Equipment Grid */}
            <div className="hidden grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEquipment.map(equipment => (
                <Card key={equipment.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-gray-800">{equipment.name}</CardTitle>
                      <Badge className={statusColors[equipment.status]}>
                        {statusLabels[equipment.status]}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-700">
                      {equipment.model} - {equipment.serialNumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Phòng ban:</span>
                        <strong>{equipment.department}</strong>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Bảo trì lần cuối:</span>
                        <strong>{equipment.lastMaintenance}</strong>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Bảo trì tiếp theo:</span>
                        <strong className={
                          equipment.status === 'maintenance' ? 'text-yellow-600' :
                          equipment.status === 'out_of_service' ? 'text-red-600' : 'text-gray-900'
                        }>
                          {equipment.nextMaintenance}
                        </strong>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="bg-transparent flex-1">
                          <Settings className="w-4 h-4 mr-2" />
                          Chi tiết
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Calendar className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredEquipment.length === 0 && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy thiết bị phù hợp
                </h3>
                <p className="text-gray-500">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                </p>
              </div>
            )}
    </FeatureLayout>
  )
}
