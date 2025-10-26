# ACEView AI - Hệ Thống Quản Lý An Toàn Bức Xạ

![ACEView AI](https://sider.ai/autoimage/radiation%20safety)

## 📋 Giới thiệu

ACEView AI là hệ thống quản lý an toàn bức xạ toàn diện, cung cấp giải pháp số hóa cho việc quản lý hồ sơ, thiết bị, nhân sự và an toàn bức xạ. Ứng dụng giúp tự động hóa công tác quản lý, giảm thiểu giấy tờ và tối ưu hóa quy trình làm việc.

## 🚀 Tính năng chính

- **Quản lý biểu mẫu điện tử**
- **Thư viện tài liệu an toàn**
- **Đo liều phóng xạ nhân sự**
- **Quản lý giấy phép và thiết bị**
- **Theo dõi tồn kho nguồn phóng xạ**
- **Báo cáo và phân tích dữ liệu**
- **Quản lý sự cố và chất thải**
- **Đào tạo an toàn bức xạ**

## 🛠 Công nghệ sử dụng

### Frontend Framework
- **React**: 18.3.1
- **TypeScript**: Full type safety
- **React Router**: 7.5.3 (Client-side routing)

### Styling & UI
- **Tailwind CSS**: 3.4.17 (Utility-first CSS framework)
- **shadcn/ui**: Modern component library
- **Lucide React**: 0.503.0 (Icon library)
- **Framer Motion**: 12.17.0 (Animations)

### Build Tools & Development
- **esbuild**: 0.25.4 (Fast bundler)
- **PostCSS**: 8.5.3 (CSS processing)
- **Autoprefixer**: 10.4.21 (CSS vendor prefixes)

### State Management & Forms
- **Zustand**: 5.0.5 (State management)
- **React Hook Form**: 7.56.1 (Form handling)
- **Zod**: 3.24.3 (Schema validation)

### Additional Libraries
- **date-fns**: 3.6.0 (Date utilities)
- **Recharts**: 2.15.3 (Data visualization)
- **Sonner**: 2.0.3 (Toast notifications)
- **clsx**: 2.1.1 (Conditional className)

## 📦 Cài đặt và Chạy dự án

### Prerequisites
- Node.js 18+ 
- npm hoặc yarn

### Installation
```bash
# Clone repository
git clone <repository-url>
cd web-creator

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🚀 Deployment trên Vercel

### Tự động deploy từ GitHub
1. Push code lên GitHub repository
2. Kết nối repository với Vercel
3. Vercel sẽ tự động detect và deploy

### Cấu hình build trên Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables
Không cần environment variables cho phiên bản hiện tại.

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   └── FeatureSidebar.tsx
├── pages/              # Application pages
│   ├── features/       # Feature-specific pages
│   ├── Home.tsx        # Landing page
│   └── Login.tsx       # Authentication
├── data/               # Static data and mockups
├── lib/                # Utility functions
└── App.tsx             # Main application router
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#004C99`
- **Secondary Teal**: `#00B8B0`
- **Accent Colors**: Multiple gradient combinations

### Typography
- **Headings**: Bold gradients and modern fonts
- **Body**: Clean, readable text with proper hierarchy

### Components
- Fully responsive design
- Mobile-first approach
- Accessible UI components

## 🔧 Scripts có sẵn

```json
{
  "dev": "node scripts/build.mjs",
  "build": "node scripts/build.mjs --production"
}
```

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📞 Support

Để hỗ trợ kỹ thuật hoặc báo cáo lỗi, vui lòng tạo issue trên GitHub repository.

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

---

**Developed with ❤️ for Radiation Safety Management**