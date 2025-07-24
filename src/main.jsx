import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import AuthProvider from './Component/AuthProvider/authprovider.jsx'
import { RouterProvider } from 'react-router'
import { router } from './Component/Router/router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router ={ router} />
   </AuthProvider>
  </StrictMode>,
)
