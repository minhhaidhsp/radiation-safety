/**
 * Dữ liệu mock cho các tính năng hệ thống
 */
import { 
  FileText, 
  Library, 
  Palette, 
  UserCheck, 
  FileCheck, 
  Package,
  GraduationCap,
  Cpu,
  List,
  BarChart,
  AlertTriangle,
  Trash2
} from 'lucide-react'

export const features = [
  {
    id: 1,
    title: 'Biểu mẫu',
    path: 'Forms',
    description: 'Tạo và quản lý biểu mẫu điện tử',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    id: 2,
    title: 'Thư viện tài liệu',
    path: 'Library',
    description: 'Lưu trữ và chia sẻ tài liệu an toàn',
    icon: Library,
    color: 'text-green-600'
  },
  {
    id: 3,
    title: 'Thiết kế',
    path: 'Canvas',
    description: 'Chỉnh sửa sơ đồ và hình ảnh trực tiếp',
    icon: Palette,
    color: 'text-purple-600'
  },
  {
    id: 4,
    title: 'Đo liều phóng xạ',
    path: 'Dosimetry',
    description: 'Quản lý và giám sát liều phóng xạ của nhân viên',
    icon: UserCheck,
    color: 'text-red-600'
  },
  {
    id: 5,
    title: 'Giấy phép',
    path: 'Permits',
    description: 'Quản lý thông tin và điều kiện cấp phép',
    icon: FileCheck,
    color: 'text-orange-600'
  },
  {
    id: 6,
    title: 'Theo dõi tồn kho',
    path: 'Inventory',
    description: 'Kiểm kê và theo dõi nguồn phóng xạ',
    icon: Package,
    color: 'text-indigo-600'
  },
  {
    id: 7,
    title: 'Đào tạo',
    path: 'Training',
    description: 'Quản lý khóa học và chứng chỉ an toàn bức xạ',
    icon: GraduationCap,
    color: 'text-pink-600'
  },
  {
    id: 8,
    title: 'Quản lý máy móc',
    path: 'Machines',
    description: 'Theo dõi thông tin thiết bị và vị trí',
    icon: Cpu,
    color: 'text-teal-600'
  },
  {
    id: 9,
    title: 'Danh mục thiết bị',
    path: 'Equipment',
    description: 'Lưu trữ danh mục và lịch sử mượn/trả thiết bị',
    icon: List,
    color: 'text-yellow-600'
  },
  {
    id: 10,
    title: 'Báo cáo',
    path: 'Reporting',
    description: 'Tạo và xuất báo cáo tùy chỉnh, gửi tự động',
    icon: BarChart,
    color: 'text-cyan-600'
  },
  {
    id: 11,
    title: 'Quản lý sự cố', 
    path: 'Incidents',
    description: 'Ghi nhận và theo dõi các sự cố, cảnh báo',
    icon: AlertTriangle,
    color: 'text-rose-600'
  },
  {
    id: 12,
    title: 'Quản lý chất thải',
    path: 'Waste',
    description: 'Theo dõi, xử lý và lưu trữ chất thải phóng xạ',
    icon: Trash2,
    color: 'text-gray-600'
  }
]
