/**
 * Dosimetry feature page - Đo liều nhân sự
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Search, Plus, Download, Users, Calendar, AlertTriangle, Home, ChevronRight, ArrowLeft } from 'lucide-react'
import FeatureLayout from '../../components/FeatureLayout'

interface DosimetryRecord {
  id: number
  employeeName: string
  department: string
  currentDose: string
  monthlyLimit: string
  lastMeasurement: string
  status: 'safe' | 'warning' | 'critical'
}

export default function Dosimetry() {
  const [searchQuery, setSearchQuery] = useState('')

  const records: DosimetryRecord[] = [
    {
      id: 1,
      employeeName: 'Nguyễn Văn A',
      department: 'X-quang',
      currentDose: '2.1 mSv',
      monthlyLimit: '20 mSv',
      lastMeasurement: '25/09/2025',
      status: 'safe'
    },
    {
      id: 2,
      employeeName: 'Trần Thị B',
      department: 'CT Scan',
      currentDose: '15.8 mSv',
      monthlyLimit: '20 mSv',
      lastMeasurement: '24/09/2025',
      status: 'warning'
    },
    {
      id: 3,
      employeeName: 'Lê Văn C',
      department: 'X-quang',
      currentDose: '18.5 mSv',
      monthlyLimit: '20 mSv',
      lastMeasurement: '24/09/2025',
      status: 'warning'
    },
    {
      id: 4,
      employeeName: 'Phạm Thị D',
      department: 'Nuclear Medicine',
      currentDose: '19.9 mSv',
      monthlyLimit: '20 mSv',
      lastMeasurement: '23/09/2025',
      status: 'critical'
    }
  ]

  const statusColors = {
    safe: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800'
  }

  const statusLabels = {
    safe: 'An toàn',
    warning: 'Cảnh báo',
    critical: 'Nguy hiểm'
  }

  const filteredRecords = records.filter(record =>
    record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
                <span className="text-gray-900 font-medium">Đo liều phóng xạ</span>
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
                ĐO LIỀU PHÓNG XẠ
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Theo dõi và quản lý liều lượng bức xạ của nhân viên
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng nhân viên</CardTitle>
                  <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">48</div>
                  <p className="text-xs text-gray-600">Đang theo dõi</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Trạng thái an toàn</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">42</div>
                  <p className="text-xs text-gray-600">Trong giới hạn</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cảnh báo</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">4</div>
                  <p className="text-xs text-gray-600">Gần giới hạn</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-red-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nguy hiểm</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">2</div>
                  <p className="text-xs text-gray-600">Vượt giới hạn</p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Tìm kiếm nhân viên..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 border-gray-300 rounded-xl"
                  />
                </div>
                
                <Button className="bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm bản ghi mới
                </Button>
              </div>
            </div>

            {/* Records Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nhân viên</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phòng ban</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Liều hiện tại</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Giới hạn tháng</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Đo lần cuối</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Trạng thái</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredRecords.map(record => (
                      <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{record.department}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{record.currentDose}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{record.monthlyLimit}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{record.lastMeasurement}</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={statusColors[record.status]}>
                            {statusLabels[record.status]}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Download className="w-4 h-4" />
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

              {/* Empty State */}
              {filteredRecords.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Không tìm thấy bản ghi phù hợp
                  </h3>
                  <p className="text-gray-500">
                    Thử thay đổi từ khóa tìm kiếm
                  </p>
                </div>
              )}
            </div>
    </FeatureLayout>
  )
}
