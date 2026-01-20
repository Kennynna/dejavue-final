import axios from 'axios'
import Cookies from 'js-cookie'

// Используем переменные из .env
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:1337/api'

// Имя куки для JWT токена
export const TOKEN_KEY = 'auth_token'

// Создаём инстанс axios
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Экспортируем endpoints из env
export const API_ENDPOINTS = {
  AUTH: import.meta.env.VITE_AUTH || '/auth',
  LOCAL: import.meta.env.VITE_LOCAL || '/local',
  ROLE: import.meta.env.VITE_ROLE || '/users/me?populate=role',
  PRODUCTS: import.meta.env.VITE_ALL_PRODUCTS || '/products',
  ORDERS: import.meta.env.VITE_ORDER || '/orders',
}

// Interceptor для автоматического добавления токена
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor для обработки ответов и ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Если 401 — токен невалидный, удаляем его
    if (error.response?.status === 401) {
      Cookies.remove(TOKEN_KEY)
    }
    return Promise.reject(error)
  }
)

export default apiClient

