import Cookies from 'js-cookie'
import apiClient, { TOKEN_KEY, API_ENDPOINTS } from './api'
import type { LoginCredentials, LoginResponse, UserMeResponse } from '@/types/auth'

// Настройки для куки
const COOKIE_OPTIONS: Cookies.CookieAttributes = {
  expires: 7, // 7 дней
  secure: window.location.protocol === 'https:', // Secure только на HTTPS
  sameSite: 'strict',
}

export const authService = {
  /**
   * Шаг 1: Авторизация пользователя
   * POST /auth/local
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      `${API_ENDPOINTS.AUTH}${API_ENDPOINTS.LOCAL}`,
      credentials
    )
    
    // Сохраняем JWT в куки
    Cookies.set(TOKEN_KEY, response.data.jwt, COOKIE_OPTIONS)
    
    return response.data
  },

  /**
   * Шаг 2: Получение данных пользователя с ролью
   * GET /users/me?populate=role
   */
  async fetchUserWithRole(): Promise<UserMeResponse> {
    const response = await apiClient.get<UserMeResponse>(API_ENDPOINTS.ROLE)
    return response.data
  },

  /**
   * Выход из системы
   */
  logout(): void {
    Cookies.remove(TOKEN_KEY)
  },

  /**
   * Проверка наличия токена
   */
  getToken(): string | undefined {
    return Cookies.get(TOKEN_KEY)
  },

  /**
   * Проверка авторизации
   */
  isAuthenticated(): boolean {
    return !!this.getToken()
  },
}

export default authService

