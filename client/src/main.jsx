import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />    
    </BrowserRouter>
  </AuthProvider>,
)
