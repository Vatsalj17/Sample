import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CurrentUserProvider } from './Components/CurrentUserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrentUserProvider>
    <App />
    </CurrentUserProvider>
  </StrictMode>,
)
