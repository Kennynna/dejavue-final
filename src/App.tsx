import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './components/cart-context'
import { NotificationProvider } from './components/ui/notification-modal'
import Layout from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { useAuthInit } from './hooks/useAuthInit'
import HomePage from './pages/HomePage'
import CategoriesPage from './pages/CategoriesPage'
import CartPage from './pages/CartPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'

function App() {
  // Инициализация авторизации при загрузке приложения
  useAuthInit()

  return (
    <NotificationProvider>
      <CartProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </NotificationProvider>
  )
}

export default App

