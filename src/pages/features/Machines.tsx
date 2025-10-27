/**
 * Quản lý máy móc - Trang quản lý thông tin máy móc và thiết bị
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Search, Plus, Download, Share, Edit, Trash2, Cpu, Home, ChevronRight, ArrowLeft, Calendar, Wrench, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import FeatureSidebar from '../../components/FeatureSidebar'

interface Machine {
  id: number
  name: string
  description: string
  lastMaintenance: string
  nextMaintenance: string
  status: 'operational' | 'maintenance' | 'out_of_service'
  type: string
  location: string
}

export default function Machines() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'location' | 'lastMaintenance' | 'nextMaintenance' | 'status'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const machines: Machine[] = [
    {
      id: 1,
      name: 'Máy X-quang Digital',
      description: 'Máy chụp X-quang kỹ thuật số công nghệ mới',
      lastMaintenance: '15/09/2025',
      nextMaintenance: '15/12/2025',
      status: 'operational',
      type: 'xray',
      location: 'Phòng X-quang 1'
    },
    {
      id: 2,
      name: 'Máy CT Scanner 64 lát',
      description: 'Máy chụp cắt lớp vi tính 64 dãy detector',
      lastMaintenance: '10/09/2025',
      nextMaintenance: '10/12/2025',
      status: 'maintenance',
      type: 'ct',
      location: 'Phòng CT Scan'
    },
    {
      id: 3,
      name: 'Máy MRI 1.5 Tesla',
      description: 'Máy cộng hưởng từ 1.5 Tesla',
      lastMaintenance: '20/08/2025',
      nextMaintenance: '20/11/2025',
      status: 'operational',
      type: 'mri',
      location: 'Phòng MRI'
    },
    {
      id: 4,
      name: 'Máy siêu âm màu',
      description: 'Máy siêu âm Doppler màu 4D',
      lastMaintenance: '05/09/2025',
      nextMaintenance: '05/12/2025',
      status: 'out_of_service',
      type: 'ultrasound',
      location: 'Phòng Siêu âm'
    }
  ]

  const types = [
    { id: 'all', name: 'Tất cả' },
    { id: 'xray', name: 'X-quang' },
    { id: 'ct', name: 'CT Scan' },
    { id: 'mri', name: 'MRI' },
    { id: 'ultrasound', name: 'Siêu âm' }
  ]

  const statusColors = {
    operational: 'bg-green-100 text-green-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    out_of_service: 'bg-red-100 text-red-800'
  }

  const statusLabels = {
    operational: 'Đang hoạt động',
    maintenance: 'Đang bảo trì',
    out_of_service: 'Ngừng hoạt động'
  }

  const filteredMachines = machines.filter(machine => {
    const matchesSearch = machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         machine.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'all' || machine.type === selectedType
    return matchesSearch && matchesType
  })

  const parseDate = (d: string) => {
    const [day, month, year] = d.split('/').map(Number)
    return new Date(year, (month || 1) - 1, day || 1).getTime()
  }

  const statusOrder: Record<Machine['status'], number> = {
    operational: 1,
    maintenance: 2,
    out_of_service: 3
  }

  const sortedMachines = [...filteredMachines].sort((a, b) => {
    let cmp = 0
    switch (sortBy) {
      case 'name':
        cmp = a.name.localeCompare(b.name)
        break
      case 'type':
        cmp = a.type.localeCompare(b.type)
        break
      case 'location':
        cmp = a.location.localeCompare(b.location)
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
    if (sortBy === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortDir('asc')
    }
  }

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
                <span className="text-gray-900 font-medium">Quản lý máy móc</span>
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
                QUẢN LÝ MÁY MÓC
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Quản lý thông tin máy móc, thiết bị và lịch bảo trì
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng máy móc</CardTitle>
                  <Cpu className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <p className="text-xs text-gray-600">+2 tháng này</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
                  <Wrench className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <p className="text-xs text-gray-600">76% tổng số</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đang bảo trì</CardTitle>
                  <Wrench className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">4</div>
                  <p className="text-xs text-gray-600">Cần theo dõi</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ngừng hoạt động</CardTitle>
                  <Wrench className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">2</div>
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
                      placeholder="Tìm kiếm máy móc..."
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
                  Thêm máy móc
                </Button>
              </div>
            </div>

            {/* Machines Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('name')}>
                          Tên máy
                          {sortBy !== 'name' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('type')}>
                          Loại
                          {sortBy !== 'type' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('location')}>
                          Vị trí
                          {sortBy !== 'location' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
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
                    {sortedMachines.map(machine => (
                      <tr key={machine.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{machine.name}</div>
                          <div className="text-xs text-gray-500">{machine.description}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">{types.find(t => t.id === machine.type)?.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">{machine.location}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">{machine.lastMaintenance}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">{machine.nextMaintenance}</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={statusColors[machine.status]}> {statusLabels[machine.status]} </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Wrench className="w-4 h-4" />
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

            {/* Machines Grid */}
            <div className="hidden grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredMachines.map(machine => (
                <Card key={machine.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-gray-800">{machine.name}</CardTitle>
                      <Badge className={statusColors[machine.status]}>
                        {statusLabels[machine.status]}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-700">
                      {machine.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Loại: <strong>{types.find(t => t.id === machine.type)?.name}</strong></span>
                        <span>Vị trí: <strong>{machine.location}</strong></span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Bảo trì gần nhất: <strong className="ml-1">{machine.lastMaintenance}</strong>
                        </span>
                        <span className="flex items-center">
                          <Wrench className="w-4 h-4 mr-1" />
                          Bảo trì tiếp theo: <strong className="ml-1">{machine.nextMaintenance}</strong>
                        </span>
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
            {filteredMachines.length === 0 && (
              <div className="text-center py-12">
                <Cpu className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy máy móc phù hợp
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
