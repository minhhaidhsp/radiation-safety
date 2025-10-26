/**
 * Component thanh điều hướng chính với hiệu ứng cải tiến và xử lý trạng thái đăng nhập
 */
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Kiểm tra trạng thái đăng nhập
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false')
    setIsLoggedIn(false)
    navigate('/')
    setIsMenuOpen(false)
  }

  const navigation = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Chức năng', href: '/features' },
    ...(isLoggedIn 
      ? [{ name: 'Đăng xuất', href: '#', onClick: handleLogout }]
      : [{ name: 'Đăng nhập', href: '/login' }]
    )
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/80' 
        : 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#004C99] to-[#00B8B0] bg-clip-text text-transparent">
                ACEView AI
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              item.onClick ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-300 group text-gray-700 hover:text-[#004C99] flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004C99] to-[#00B8B0] transition-all duration-300 group-hover:w-full"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                    location.pathname === item.href
                      ? 'text-[#004C99] font-semibold'
                      : 'text-gray-700 hover:text-[#004C99]'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#004C99] to-[#00B8B0] transition-all duration-300 group-hover:w-full ${
                    location.pathname === item.href ? 'w-full' : ''
                  }`}></span>
                  
                  {/* Hiệu ứng hover background */}
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </Link>
              )
            ))}
            {isLoggedIn && (
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <User className="w-4 h-4" />
                <span>Admin User</span>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-teal-50 text-gray-700 hover:text-[#004C99] transition-all duration-300 hover:shadow-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/80">
            <div className="px-2 pt-2 pb-4 space-y-2">
              {navigation.map((item) => (
                item.onClick ? (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 text-gray-700 hover:text-[#004C99] hover:bg-gray-50 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                      location.pathname === item.href
                        ? 'text-[#004C99] bg-gradient-to-r from-blue-50 to-teal-50 shadow-inner'
                        : 'text-gray-700 hover:text-[#004C99] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              {isLoggedIn && (
                <div className="px-4 py-3 flex items-center text-gray-700">
                  <User className="w-4 h-4 mr-2" />
                  <span>Admin User</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}