/**
 * Library feature page - Thư viện tài liệu
 */
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { FileText, Download, Eye, BookOpen, Home, ChevronRight, ArrowLeft, LayoutGrid, Table as TableIcon, Upload, ArrowUp, ArrowDown } from 'lucide-react'
import FeatureLayout from '../../components/FeatureLayout'
import { Input } from '../../components/ui/input'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '../../components/ui/drawer'

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
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all'|'pdf'|'doc'|'video'>('all')
  const [view, setView] = useState<'grid'|'table'>('grid')
  const [sortBy, setSortBy] = useState<'title'|'uploadDate'|'downloads'>('uploadDate')
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('desc')
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null)

  const documents: Document[] = [
    {
      id: 1,
      title: 'HÆ°á»›ng dáº«n an toÃ n bá»©c xáº¡',
      description: 'TÃ i liá»‡u hÆ°á»›ng dáº«n Ä‘áº§y Ä‘á»§ vá» an toÃ n bá»©c xáº¡ trong cÃ´ng nghiá»‡p',
      category: 'safety',
      fileSize: '2.4 MB',
      uploadDate: '25/09/2025',
      downloads: 156,
      type: 'pdf'
    },
    {
      id: 2,
      title: 'Quy trÃ¬nh xá»­ lÃ½ sá»± cá»‘',
      description: 'Quy trÃ¬nh chi tiáº¿t xá»­ lÃ½ cÃ¡c sá»± cá»‘ bá»©c xáº¡',
      category: 'procedure',
      fileSize: '1.8 MB',
      uploadDate: '24/09/2025',
      downloads: 89,
      type: 'pdf'
    },
    {
      id: 3,
      title: 'Video Ä‘Ã o táº¡o an toÃ n',
      description: 'Video hÆ°á»›ng dáº«n thá»±c hÃ nh an toÃ n bá»©c xáº¡',
      category: 'training',
      fileSize: '45.2 MB',
      uploadDate: '22/09/2025',
      downloads: 234,
      type: 'video'
    },
    {
      id: 4,
      title: 'Biá»ƒu máº«u bÃ¡o cÃ¡o Ä‘á»‹nh ká»³',
      description: 'Máº«u bÃ¡o cÃ¡o Ä‘á»‹nh ká»³ an toÃ n bá»©c xáº¡',
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

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    const list = documents.filter(d =>
      (typeFilter === 'all' || d.type === typeFilter) &&
      (q === '' || d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q))
    )

    const parseDate = (d: string) => {
      const [dd, mm, yyyy] = d.split('/').map(Number)
      return new Date(yyyy, (mm||1)-1, dd||1).getTime()
    }

    const sorted = [...list].sort((a,b)=>{
      let cmp = 0
      switch (sortBy) {
        case 'title': cmp = a.title.localeCompare(b.title); break
        case 'uploadDate': cmp = parseDate(a.uploadDate) - parseDate(b.uploadDate); break
        case 'downloads': cmp = a.downloads - b.downloads; break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return sorted
  }, [documents, search, typeFilter, sortBy, sortDir])

  return (
    <FeatureLayout>
            {/* Breadcrumb vÃ  nÃºt Back */}
            <div className="flex items-center justify-between mb-8">
              <nav className="flex items-center space-x-2 text-sm text-gray-600">
                <Link to="/" className="flex items-center hover:text-gray-900 transition-colors">
                  <Home className="w-4 h-4 mr-2" />
                  Trang chủ
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link to="/features" className="hover:text-gray-900 transition-colors">
                CÃ¡c chá»©c nÄƒng
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">ThÆ° viá»‡n tÃ i liá»‡u</span>
              </nav>

              <Link
                to="/features"
                className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 text-[#004C99] hover:from-blue-100 hover:to-teal-100 transition-all duration-300 rounded-lg border border-blue-200 hover:border-blue-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay láº¡i
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#004C99] to-[#00B8B0] bg-clip-text text-transparent">
                THÆ¯ VIá»†N TÃ€I LIá»†U
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Kho tÃ i liá»‡u, hÆ°á»›ng dáº«n vÃ  biá»ƒu máº«u vá» an toÃ n bá»©c xáº¡
              </p>
            </div>

            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-3 items-center w-full md:w-auto">
                  <div className="relative w-full md:w-96">
                    <Input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Tìm tài li?u..." className="pl-10" />
                    <Eye className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <Button variant="outline" className="bg-transparent" onClick={()=>setTypeFilter('all')}>Tất cả</Button>
                  <Button variant="outline" className={(typeFilter==='pdf' ? 'border-blue-200 text-[#004C99] ' : '') + 'bg-transparent'} onClick={()=>setTypeFilter('pdf')}>PDF</Button>
                  <Button variant="outline" className={(typeFilter==='doc' ? 'border-blue-200 text-[#004C99] ' : '') + 'bg-transparent'} onClick={()=>setTypeFilter('doc')}>DOC</Button>
                  <Button variant="outline" className={(typeFilter==='video' ? 'border-blue-200 text-[#004C99] ' : '') + 'bg-transparent'} onClick={()=>setTypeFilter('video')}>Video</Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="bg-transparent" onClick={()=>setSortDir(sortDir==='asc'?'desc':'asc')}>
                    {(sortDir==='asc'? <ArrowUp className="w-4 h-4 mr-2" /> : <ArrowDown className="w-4 h-4 mr-2" />)} Sắp xếp
                  </Button>
                  <Button className="bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white">
                    <Upload className="w-4 h-4 mr-2" /> T?i lên
                  </Button>
                </div>
              </div>
            </div>            {/* Documents Grid */}
            <div className="hidden">
              {filtered.map(doc => {
                const IconComponent = typeIcons[doc.type]
                return (
                  <Card key={doc.id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-xl transition-all duration-300" onClick={() => setPreviewDoc(doc)} role="button">
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
                          <span>KÃ­ch thÆ°á»›c: <strong>{doc.fileSize}</strong></span>
                          <span>Táº£i xuá»‘ng: <strong>{doc.downloads}</strong></span>
                        </div>
                        
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>NgÃ y upload: <strong>{doc.uploadDate}</strong></span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="bg-transparent flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Xem trÆ°á»›c
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
    
            {/* Documents Table */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tiêu đề</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Loại</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Danh mục</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kích thước</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tải xuống</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Upload</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filtered.map(doc => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 text-sm font-medium text-gray-900">{doc.title}</td>
                        <td className="px-6 py-3 text-sm"><Badge className={typeColors[doc.type]}>{doc.type.toUpperCase()}</Badge></td>
                        <td className="px-6 py-3 text-sm text-gray-700">{doc.category}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{doc.fileSize}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{doc.downloads}</td>
                        <td className="px-6 py-3 text-sm text-gray-700">{doc.uploadDate}</td>
                        <td className="px-6 py-3">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="bg-transparent"><Eye className="w-4 h-4" /></Button>
                            <Button variant="outline" size="sm" className="bg-transparent"><Download className="w-4 h-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>            {/* Preview Drawer */}
            <Drawer open={!!previewDoc} onOpenChange={(o)=>!o && setPreviewDoc(null)}>
              <DrawerContent className="max-w-3xl mx-auto">
                <DrawerHeader>
                  <DrawerTitle>{previewDoc?.title}</DrawerTitle>
                  <DrawerDescription>{previewDoc?.description}</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-4 text-sm text-gray-700">
                  <div className="grid grid-cols-2 gap-3">
                    <div>Loại: <Badge className={previewDoc ? typeColors[previewDoc.type] : ''}>{previewDoc?.type.toUpperCase()}</Badge></div>
                    <div>Kích thu?c: <strong>{previewDoc?.fileSize}</strong></div>
                    <div>Danh mục: <strong>{previewDoc?.category}</strong></div>
                    <div>Upload: <strong>{previewDoc?.uploadDate}</strong></div>
                    <div>Tải xuống: <strong>{previewDoc?.downloads}</strong></div>
                  </div>
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border">Khu v?c xem nhanh (mock preview)</div>
                </div>
                <DrawerFooter>
                  <Button className="bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white">T?i xu?ng</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Ðóng</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer></FeatureLayout>
  )
}



