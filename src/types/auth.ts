// Типы для аутентификации

export interface UserRole {
  id: number
  name: string
  type: string
}

export interface User {
  id: number
  username: string
  email: string
  provider?: string
  confirmed?: boolean
  blocked?: boolean
  createdAt?: string
  updatedAt?: string
  role?: UserRole
}

export interface LoginCredentials {
  identifier: string
  password: string
}

export interface LoginResponse {
  jwt: string
  user: User
}

export interface UserMeResponse {
  id: number
  username: string
  email: string
  role: UserRole
}

export interface AuthState {
  user: User | null
  role: UserRole | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  setRole: (role: UserRole | null) => void
  checkAuth: () => Promise<void>
  setLoading: (loading: boolean) => void
}

export type AuthStore = AuthState & AuthActions

