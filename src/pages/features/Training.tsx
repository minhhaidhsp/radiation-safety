/**
 * Training feature page - Quản lý đào tạo an toàn bức xạ
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Input } from '../../components/ui/input'
import { Search, Plus, Download, Share, Edit, Trash2, GraduationCap, Users, Calendar, Clock, Home, ChevronRight, ArrowLeft, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import FeatureSidebar from '../../components/FeatureSidebar'

interface TrainingCourse {
  id: number
  title: string
  description: string
  category: string
  participants: number
  instructor: string
  startDate: string
  duration: string
  status: 'upcoming' | 'ongoing' | 'completed'
}

export default function Training() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'title' | 'category' | 'participants' | 'instructor' | 'startDate' | 'duration' | 'status'>('title')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const courses: TrainingCourse[] = [
    {
      id: 1,
      title: 'An toàn bức xạ cơ bản',
      description: 'Khóa đào tạo về nguyên tắc an toàn bức xạ cơ bản',
      category: 'safety',
      participants: 24,
      instructor: 'TS. Nguyễn Văn A',
      startDate: '01/10/2025',
      duration: '3 ngày',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Vận hành máy X-quang',
      description: 'Đào tạo vận hành và bảo trì máy X-quang',
      category: 'operation',
      participants: 18,
      instructor: 'KS. Trần Thị B',
      startDate: '28/09/2025',
      duration: '2 ngày',
      status: 'ongoing'
    },
    {
      id: 3,
      title: 'Xử lý sự cố bức xạ',
      description: 'Đào tạo xử lý các tình huống khẩn cấp',
      category: 'emergency',
      participants: 32,
      instructor: 'ThS. Lê Văn C',
      startDate: '25/09/2025',
      duration: '1 ngày',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Cập nhật quy định mới',
      description: 'Cập nhật các quy định an toàn bức xạ mới nhất',
      category: 'regulation',
      participants: 15,
      instructor: 'TS. Phạm Thị D',
      startDate: '05/10/2025',
      duration: '1 ngày',
      status: 'upcoming'
    }
  ]

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'safety', name: 'An toàn' },
    { id: 'operation', name: 'Vận hành' },
    { id: 'emergency', name: 'Khẩn cấp' },
    { id: 'regulation', name: 'Quy định' }
  ]

  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    ongoing: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  }

  const statusLabels = {
    upcoming: 'Sắp diễn ra',
    ongoing: 'Đang diễn ra',
    completed: 'Đã hoàn thành'
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const parseDate = (d: string) => {
    const [day, month, year] = d.split('/').map(Number)
    return new Date(year, (month || 1) - 1, day || 1).getTime()
  }

  const statusOrder: Record<TrainingCourse['status'], number> = {
    upcoming: 1,
    ongoing: 2,
    completed: 3
  }

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    let cmp = 0
    switch (sortBy) {
      case 'title': cmp = a.title.localeCompare(b.title); break
      case 'category': cmp = a.category.localeCompare(b.category); break
      case 'participants': cmp = a.participants - b.participants; break
      case 'instructor': cmp = a.instructor.localeCompare(b.instructor); break
      case 'startDate': cmp = parseDate(a.startDate) - parseDate(b.startDate); break
      case 'duration': cmp = a.duration.localeCompare(b.duration); break
      case 'status': cmp = statusOrder[a.status] - statusOrder[b.status]; break
    }
    return sortDir === 'asc' ? cmp : -cmp
  })

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    else { setSortBy(field); setSortDir('asc') }
  }

  const totalCourses = courses.length
  const ongoingCourses = courses.filter(course => course.status === 'ongoing').length
  const upcomingCourses = courses.filter(course => course.status === 'upcoming').length
  const completedCourses = courses.filter(course => course.status === 'completed').length

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
                <span className="text-gray-900 font-medium">Đào tạo</span>
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
                QUẢN LÝ ĐÀO TẠO
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Quản lý các khóa đào tạo an toàn bức xạ và chứng chỉ
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tổng khóa học</CardTitle>
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{totalCourses}</div>
                  <p className="text-xs text-gray-600">Khóa đào tạo</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đang diễn ra</CardTitle>
                  <Users className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{ongoingCourses}</div>
                  <p className="text-xs text-gray-600">Đang giảng dạy</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-yellow-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sắp diễn ra</CardTitle>
                  <Calendar className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{upcomingCourses}</div>
                  <p className="text-xs text-gray-600">Đang chuẩn bị</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đã hoàn thành</CardTitle>
                  <Clock className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-600">{completedCourses}</div>
                  <p className="text-xs text-gray-600">Khóa đã kết thúc</p>
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
                      placeholder="Tìm kiếm khóa học..."
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
                  Thêm khóa học
                </Button>
              </div>
            </div>

            {/* Courses Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"><button className="inline-flex items-center gap-1" onClick={() => handleSort('title')}>Khoá học {sortBy !== 'title' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}</button></th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"><button className="inline-flex items-center gap-1" onClick={() => handleSort('category')}>Loại {sortBy !== 'category' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}</button></th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"><button className="inline-flex items-center gap-1" onClick={() => handleSort('participants')}>Học viên {sortBy !== 'participants' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}</button></th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"><button className="inline-flex items-center gap-1" onClick={() => handleSort('instructor')}>Giảng viên {sortBy !== 'instructor' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}</button></th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"><button className="inline-flex items-center gap-1" onClick={() => handleSort('startDate')}>Ngày bắt đầu {sortBy !== 'startDate' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}</button></th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"><button className="inline-flex items-center gap-1" onClick={() => handleSort('duration')}>Thời lượng {sortBy !== 'duration' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}</button></th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"><button className="inline-flex items-center gap-1" onClick={() => handleSort('status')}>Trạng thái {sortBy !== 'status' ? <ArrowUpDown className="w-4 h-4 text-gray-400" /> : (sortDir === 'asc' ? <ArrowUp className="w-4 h-4 text-gray-600" /> : <ArrowDown className="w-4 h-4 text-gray-600" />)}</button></th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedCourses.map(course => (
                      <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4"><div className="text-sm font-semibold text-gray-900">{course.title}</div><div className="text-xs text-gray-500">{course.description}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{categories.find(c => c.id === course.category)?.name}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{course.participants}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{course.instructor}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{course.startDate}</div></td>
                        <td className="px-6 py-4"><div className="text-sm text-gray-700">{course.duration}</div></td>
                        <td className="px-6 py-4"><Badge className={statusColors[course.status]}>{statusLabels[course.status]}</Badge></td>
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

            {/* Courses Grid */}
            <div className="hidden grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCourses.map(course => (
                <Card key={course.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-gray-800">{course.title}</CardTitle>
                      <Badge className={statusColors[course.status]}>
                        {statusLabels[course.status]}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-700">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Loại: <strong>{categories.find(c => c.id === course.category)?.name}</strong></span>
                        <span>Học viên: <strong>{course.participants}</strong></span>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Giảng viên: <strong>{course.instructor}</strong></span>
                        <span>Thời lượng: <strong>{course.duration}</strong></span>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Ngày bắt đầu: <strong>{course.startDate}</strong></span>
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
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Không tìm thấy khóa học phù hợp
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
