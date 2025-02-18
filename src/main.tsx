import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/themeContext.tsx'
import { LoadingProvider } from './context/loadingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LoadingProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </LoadingProvider>
    </ThemeProvider>
  </StrictMode>,
)
