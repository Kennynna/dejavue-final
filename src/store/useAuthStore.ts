import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import authService from '@/services/auth.service'
import type { AuthStore, LoginCredentials, UserRole } from '@/types/auth'

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      // Начальное состояние
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,

      // Установка состояния загрузки
      setLoading: (loading: boolean) => {
        set({ isLoading: loading }, false, 'setLoading')
      },

      // Установка роли
      setRole: (role: UserRole | null) => {
        set({ role }, false, 'setRole')
      },

      // Авторизация (двухэтапная)
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true }, false, 'login/start')

        try {
          // Шаг 1: Получаем JWT
          const loginResponse = await authService.login(credentials)

          // Шаг 2: Получаем данные пользователя с ролью
          const userWithRole = await authService.fetchUserWithRole()

          set(
            {
              user: {
                ...loginResponse.user,
                role: userWithRole.role,
              },
              role: userWithRole.role,
              isAuthenticated: true,
              isLoading: false,
            },
            false,
            'login/success'
          )
        } catch (error) {
          set({ isLoading: false }, false, 'login/error')
          throw error
        }
      },

      // Выход из системы
      logout: () => {
        authService.logout()
        set(
          {
            user: null,
            role: null,
            isAuthenticated: false,
          },
          false,
          'logout'
        )
      },

      // Проверка авторизации при загрузке приложения
      checkAuth: async () => {
        const token = authService.getToken()

        if (!token) {
          set({ isAuthenticated: false, isLoading: false }, false, 'checkAuth/noToken')
          return
        }

        set({ isLoading: true }, false, 'checkAuth/start')

        try {
          // Если токен есть, запрашиваем данные пользователя
          const userWithRole = await authService.fetchUserWithRole()

          set(
            {
              user: {
                id: userWithRole.id,
                username: userWithRole.username,
                email: userWithRole.email,
                role: userWithRole.role,
              },
              role: userWithRole.role,
              isAuthenticated: true,
              isLoading: false,
            },
            false,
            'checkAuth/success'
          )
        } catch (error) {
          // Токен невалидный — выходим
          authService.logout()
          set(
            {
              user: null,
              role: null,
              isAuthenticated: false,
              isLoading: false,
            },
            false,
            'checkAuth/error'
          )
        }
      },
    }),
    { name: 'auth-store' }
  )
)

export default useAuthStore

