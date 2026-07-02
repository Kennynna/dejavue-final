import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'
import './index.css'
import TanstackProvider from '@/api/TanstackProvider.tsx'

registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TanstackProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TanstackProvider>
  </StrictMode>,
)

