import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

/**
 * Хук для инициализации аутентификации при загрузке приложения
 */
export function useAuthInit() {
  const { checkAuth, isLoading, isAuthenticated } = useAuthStore()
  const initialized = useRef(false)

  useEffect(() => {
    // Проверяем авторизацию только один раз при монтировании
    if (!initialized.current) {
      initialized.current = true
      checkAuth()
    }
  }, [checkAuth])

  return { isLoading, isAuthenticated }
}

export default useAuthInit

