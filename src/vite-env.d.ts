/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_ALL_PRODUCTS: string
  readonly VITE_GET_ROLE: string
  readonly VITE_ORDER: string
  readonly VITE_AUTH: string
  readonly VITE_LOCAL: string
  readonly VITE_ROLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

