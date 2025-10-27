/**
 * Permits feature page - Quản lý giấy phép
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Search, Plus, FileText, Calendar, AlertTriangle, Home, ChevronRight, ArrowLeft, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import FeatureLayout from '../../components/FeatureLayout'

interface Permit {
  id: number
  permitNumber: string
  type: string
  holder: string
  issueDate: string
  expiryDate: string
  status: 'active' | 'expiring' | 'expired' | 'renewal'
}

export default function Permits() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState<'permitNumber' | 'type' | 'holder' | 'issueDate' | 'expiryDate' | 'status'>('permitNumber')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const permits: Permit[] = [
    {
      id: 1,
      permitNumber: 'GP-2024-001',
      type: 'Sử dụng thiết bị X-quang',
      holder: 'Bệnh viện Đa khoa Tỉnh',
      issueDate: '15/01/2024',
      expiryDate: '14/01/2025',
      status: 'active'
    },
    {
      id: 2,
      permitNumber: 'GP-2024-002',
      type: 'Vận chuyển chất phóng xạ',
      holder: 'Công ty Dược phẩm A',
      issueDate: '20/02/2024',
      expiryDate: '19/02/2025',
      status: 'expiring'
    },
    {
      id: 3,
      permitNumber: 'GP-2023-015',
      type: 'Sử dụng máy CT Scan',
      holder: 'Bệnh viện Chuyên khoa B',
      issueDate: '10/12/2023',
      expiryDate: '09/12/2024',
      status: 'expired'
    },
    {
      id: 4,
      permitNumber: 'GP-2024-003',
      type: 'Xử lý chất thải phóng xạ',
      holder: 'Trung tâm Y tế C',
      issueDate: '05/03/2024',
      expiryDate: '04/03/2025',
      status: 'renewal'
    }
  ]

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    expiring: 'bg-yellow-100 text-yellow-800',
    expired: 'bg-red-100 text-red-800',
    renewal: 'bg-blue-100 text-blue-800'
  }

  const statusLabels = {
    active: 'Đang hiệu lực',
    expiring: 'Sắp hết hạn',
    expired: 'Đã hết hạn',
    renewal: 'Đang gia hạn'
  }

  const statusFilters = [
    { id: 'all', name: 'Tất cả' },
    { id: 'active', name: 'Đang hiệu lực' },
    { id: 'expiring', name: 'Sắp hết hạn' },
    { id: 'expired', name: 'Đã hết hạn' },
    { id: 'renewal', name: 'Đang gia hạn' }
  ]

  const filteredPermits = permits.filter(permit => {
    const matchesSearch = permit.permitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         permit.holder.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         permit.type.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || permit.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const parseDate = (d: string) => {
    const [day, month, year] = d.split('/').map(Number)
    return new Date(year, (month || 1) - 1, day || 1).getTime()
  }

  const statusOrder: Record<Permit['status'], number> = {
    active: 1,
    expiring: 2,
    renewal: 3,
    expired: 4
  }

  const sortedPermits = [...filteredPermits].sort((a, b) => {
    let cmp = 0
    switch (sortBy) {
      case 'permitNumber':
        cmp = a.permitNumber.localeCompare(b.permitNumber)
        break
      case 'type':
        cmp = a.type.localeCompare(b.type)
        break
      case 'holder':
        cmp = a.holder.localeCompare(b.holder)
        break
      case 'issueDate':
        cmp = parseDate(a.issueDate) - parseDate(b.issueDate)
        break
      case 'expiryDate':
        cmp = parseDate(a.expiryDate) - parseDate(b.expiryDate)
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
                <span className="text-gray-900 font-medium">Quản lý giấy phép</span>
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
                QUẢN LÝ GIẤY PHÉP
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Theo dõi và quản lý giấy phép sử dụng bức xạ và thiết bị
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng giấy phép</CardTitle>
                  <FileText className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <p className="text-xs text-gray-600">Đang quản lý</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đang hiệu lực</CardTitle>
                  <FileText className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <p className="text-xs text-gray-600">Hoạt động tốt</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sắp hết hạn</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">3</div>
                  <p className="text-xs text-gray-600">Cần gia hạn</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đã hết hạn</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <p className="text-xs text-gray-600">Cần xử lý</p>
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
                      placeholder="Tìm kiếm giấy phép..."
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
                  Thêm giấy phép mới
                </Button>
              </div>
            </div>

            {/* Permits Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('permitNumber')}>
                          Số giấy phép
                          {sortBy !== 'permitNumber' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('type')}>
                          Loại
                          {sortBy !== 'type' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('holder')}>
                          Chủ sở hữu
                          {sortBy !== 'holder' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('issueDate')}>
                          Ngày cấp
                          {sortBy !== 'issueDate' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        <button className="inline-flex items-center gap-1" onClick={() => handleSort('expiryDate')}>
                          Ngày hết hạn
                          {sortBy !== 'expiryDate' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}
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
                    {sortedPermits.map(permit => (
                      <tr key={permit.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{permit.permitNumber}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">{permit.type}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">{permit.holder}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-700">{permit.issueDate}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`${permit.status === 'expiring' ? 'text-yellow-700' : permit.status === 'expired' ? 'text-red-700' : 'text-gray-700'} text-sm`}>{permit.expiryDate}</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={statusColors[permit.status]}>
                            {statusLabels[permit.status]}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <FileText className="w-4 h-4" />
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

              <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-gray-600">
                    Hiển thị {sortedPermits.length} trong tổng số {permits.length} giấy phép
                  </p>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" className="bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Xuất danh sách
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {sortedPermits.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Không tìm thấy giấy phép phù hợp</h3>
                <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
              </div>
            )}

            {/* Permits Grid */}
            <div className="hidden grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredPermits.map(permit => (
                <Card key={permit.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-gray-800">{permit.permitNumber}</CardTitle>
                      <Badge className={statusColors[permit.status]}>
                        {statusLabels[permit.status]}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-700">
                      {permit.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Chủ sở hữu:</span>
                        <strong>{permit.holder}</strong>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Ngày cấp:</span>
                        <strong>{permit.issueDate}</strong>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Ngày hết hạn:</span>
                        <strong className={
                          permit.status === 'expiring' ? 'text-yellow-600' :
                          permit.status === 'expired' ? 'text-red-600' : 'text-gray-900'
                        }>
                          {permit.expiryDate}
                        </strong>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="bg-transparent flex-1">
                          <FileText className="w-4 h-4 mr-2" />
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
            {false && filteredPermits.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy giấy phép phù hợp
                </h3>
                <p className="text-gray-500">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                </p>
              </div>
            )}
    </FeatureLayout>
  )
}
