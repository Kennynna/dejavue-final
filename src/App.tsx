import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './components/cart-context'
import Layout from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import CategoriesPage from './pages/CategoriesPage'
import CartPage from './pages/CartPage'

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}

export default App

