import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import TanstackProvider from "@/api/TanstackProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>

      <TanstackProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </TanstackProvider>


  </StrictMode>,
)

