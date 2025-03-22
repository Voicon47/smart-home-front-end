import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/themeContext.tsx'
import { LoadingProvider } from './context/loadingContext.tsx'
import { AuthProvider } from './context/authContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <LoadingProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </LoadingProvider>
      </ThemeProvider>
      </AuthProvider>
  </StrictMode>,
)
