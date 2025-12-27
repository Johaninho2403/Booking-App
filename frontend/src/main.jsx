import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './router/router.jsx'
import { RouterProvider } from 'react-router-dom'
import AppContextProvider from './context/AppContextProvider.jsx'
import {ToastContainer} from 'react-toastify'

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <ToastContainer autoClose={2000} pauseOnHover={false}/>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </AppContextProvider>
);
