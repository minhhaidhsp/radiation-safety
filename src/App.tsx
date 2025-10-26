/**
 * Main application routing file
 * Defines all routes and protected route logic
 */
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Features from './pages/Features'
import Login from './pages/Login'
import Forms from './pages/features/Forms'
import Library from './pages/features/Library'
import Canvas from './pages/features/Canvas'
import Dosimetry from './pages/features/Dosimetry'
import Permits from './pages/features/Permits'
import Inventory from './pages/features/Inventory'
import Machines from './pages/features/Machines'
import Equipment from './pages/features/Equipment'
import Reporting from './pages/features/Reporting'
import Incidents from './pages/features/Incidents'
import Waste from './pages/features/Waste'
import Training from './pages/features/Training'

/**
 * Protected route component to check authentication
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
      setIsAuthenticated(loggedIn)
    }
    
    checkAuth()
    window.addEventListener('storage', checkAuth)
    
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004C99] mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra xác thực...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/features" 
              element={
                <ProtectedRoute>
                  <Features />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/forms" 
              element={
                <ProtectedRoute>
                  <Forms />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/library" 
              element={
                <ProtectedRoute>
                  <Library />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/canvas" 
              element={
                <ProtectedRoute>
                  <Canvas />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/dosimetry" 
              element={
                <ProtectedRoute>
                  <Dosimetry />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/permits" 
              element={
                <ProtectedRoute>
                  <Permits />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/inventory" 
              element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/machines" 
              element={
                <ProtectedRoute>
                  <Machines />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/equipment" 
              element={
                <ProtectedRoute>
                  <Equipment />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/reporting" 
              element={
                <ProtectedRoute>
                  <Reporting />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/incidents" 
              element={
                <ProtectedRoute>
                  <Incidents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/waste" 
              element={
                <ProtectedRoute>
                  <Waste />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/features/training" 
              element={
                <ProtectedRoute>
                  <Training />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}