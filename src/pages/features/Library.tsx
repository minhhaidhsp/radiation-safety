/**
 * Library feature page - Thư viện tài liệu
 */
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { FileText, Download, Eye, BookOpen, Home, ChevronRight, ArrowLeft } from 'lucide-react'
import FeatureLayout from '../../components/FeatureLayout'

interface Document {
  id: number
  title: string
  description: string
  category: string
  fileSize: string
  uploadDate: string
  downloads: number
  type: 'pdf' | 'doc' | 'video'
}

export default function Library() {
  const documents: Document[] = [
    {
      id: 1,
      title: 'Hướng dẫn an toàn bức xạ',
      description: 'Tài liệu hướng dẫn đầy đủ về an toàn bức xạ trong công nghiệp',
      category: 'safety',
      fileSize: '2.4 MB',
      uploadDate: '25/09/2025',
      downloads: 156,
      type: 'pdf'
    },
    {
      id: 2,
      title: 'Quy trình xử lý sự cố',
      description: 'Quy trình chi tiết xử lý các sự cố bức xạ',
      category: 'procedure',
      fileSize: '1.8 MB',
      uploadDate: '24/09/2025',
      downloads: 89,
      type: 'pdf'
    },
    {
      id: 3,
      title: 'Video đào tạo an toàn',
      description: 'Video hướng dẫn thực hành an toàn bức xạ',
      category: 'training',
      fileSize: '45.2 MB',
      uploadDate: '22/09/2025',
      downloads: 234,
      type: 'video'
    },
    {
      id: 4,
      title: 'Biểu mẫu báo cáo định kỳ',
      description: 'Mẫu báo cáo định kỳ an toàn bức xạ',
      category: 'forms',
      fileSize: '0.8 MB',
      uploadDate: '20/09/2025',
      downloads: 67,
      type: 'doc'
    }
  ]

  const typeIcons = {
    pdf: FileText,
    doc: FileText,
    video: BookOpen
  }

  const typeColors = {
    pdf: 'bg-red-100 text-red-800',
    doc: 'bg-blue-100 text-blue-800',
    video: 'bg-purple-100 text-purple-800'
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
                <span className="text-gray-900 font-medium">Thư viện tài liệu</span>
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
                THƯ VIỆN TÀI LIỆU
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Kho tài liệu, hướng dẫn và biểu mẫu về an toàn bức xạ
              </p>
            </div>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {documents.map(doc => {
                const IconComponent = typeIcons[doc.type]
                return (
                  <Card key={doc.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl text-gray-800">{doc.title}</CardTitle>
                        <Badge className={typeColors[doc.type]}>
                          {doc.type.toUpperCase()}
                        </Badge>
                      </div>
                      <CardDescription className="text-gray-700">
                        {doc.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Kích thước: <strong>{doc.fileSize}</strong></span>
                          <span>Tải xuống: <strong>{doc.downloads}</strong></span>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Ngày upload: <strong>{doc.uploadDate}</strong></span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="bg-transparent flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Xem trước
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <IconComponent className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
    </FeatureLayout>
  )
}
