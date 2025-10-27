/**
 * Trang chủ Landing Page với tiêu đề được cải thiện và hiệu ứng màu sắc
 */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle, FileText, Clock, Shield, Workflow, Zap } from 'lucide-react'

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    setLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
    const onStorage = () => setLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  const benefits = [
    {
      icon: FileText,
      title: 'Giảm khối lượng giấy tờ hành chính',
      description: 'Số hóa toàn bộ quy trình quản lý, loại bỏ hoàn toàn giấy tờ thủ công'
    },
    {
      icon: Clock,
      title: 'Giảm thời gian nhập liệu',
      description: 'Tự động hóa công tác báo cáo, tiết kiệm 80% thời gian xử lý'
    },
    {
      icon: Shield,
      title: 'Giảm thiểu rủi ro sai sót',
      description: 'Kiểm soát chặt chẽ dữ liệu với hệ thống cảnh báo thông minh'
    },
    {
      icon: Workflow,
      title: 'Tối ưu quy trình làm việc',
      description: 'Quy trình chuẩn hóa và minh bạch từng bước thực hiện'
    },
    {
      icon: Zap,
      title: 'Quy trình hiệu quả hơn',
      description: 'Tăng năng suất làm việc với tự động hóa toàn diện'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-[#004C99] via-[#0066CC] to-[#00B8B0] bg-clip-text text-transparent">
                HỆ THỐNG QUẢN LÝ
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#00B8B0] via-[#009999] to-[#004C99] bg-clip-text text-transparent mt-4 pb-4 block">
                AN TOÀN BỨC XẠ
              </span>
            </motion.h1>
            
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <span className="text-2xl md:text-3xl font-semibold text-[#00B8B0] bg-gradient-to-r from-[#00B8B0] to-[#004C99] bg-clip-text text-transparent">
                ACEView AI
              </span>
            </motion.div> */}
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Giải pháp số hóa toàn diện giúp tự động hóa công tác quản lý hồ sơ, 
              thiết bị, nhân sự và an toàn bức xạ.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/features"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white font-semibold rounded-xl hover:from-blue-700 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Khám phá hệ thống
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </motion.div>
            {!loggedIn && (
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-4 bg-white text-[#004C99] font-semibold rounded-xl border border-blue-200 hover:bg-blue-50 transition-all duration-300 shadow-sm"
                >
                  Đăng nhập
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Redesigned */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-[#004C99] to-[#00B8B0] bg-clip-text text-transparent">
                5 Lợi ích nổi bật
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Những cải tiến đột phá mang lại hiệu quả vượt trội trong quản lý an toàn bức xạ
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -8
                }}
                className="group relative"
              >
                {/* Number Badge */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-[#004C99] to-[#00B8B0] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-300 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl w-fit mx-auto">
                    <benefit.icon className="h-8 w-8 text-[#004C99]" />
                  </div>
                  
                  {/* Content */}
                  <div className="text-center flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>
                  
                  {/* Hover Effect Line */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-transparent via-[#004C99] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 bg-gradient-to-r from-[#004C99] to-[#00B8B0] rounded-3xl p-8 text-white shadow-2xl"
          >
            <div className="text-center max-w-4xl mx-auto">
              <CheckCircle className="h-16 w-16 mx-auto mb-6 text-blue-100" />
              <h3 className="text-3xl font-bold mb-6">Tích hợp toàn diện - Hiệu quả tối ưu</h3>
              <p className="text-blue-100 text-xl leading-relaxed">
                Tất cả 5 lợi ích được tích hợp đồng bộ trong một nền tảng duy nhất, 
                tạo thành hệ sinh thái quản lý thông minh giúp doanh nghiệp của bạn 
                đạt được hiệu suất tối đa với chi phí tối thiểu.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
