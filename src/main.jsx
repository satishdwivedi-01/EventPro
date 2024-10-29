import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import SignUp from './components/SignUp'
import User from './components/User'
import App from './App'
import Login from './components/Login'
import AdminLogin from './components/AdminLogin'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Admin from './components/Admin'

import { createBrowserRouter,RouterProvider } from 'react-router-dom'    

const router= createBrowserRouter([   
  { path : '/',
    element :<> <Nav/> <App/>  <Footer/> </> 
  } ,

  { path : '/SignUp',
    element :<>  <SignUp/> </> 
  } ,
  { path : '/Login',
    element :<>  <Login/> </> 
  } ,
  { path : '/:usermail',
    element :<>  <User/> </> 
  } ,
  { path : '/adminLogin',
    element :<>  <AdminLogin/> </> 
  } ,
  { path : '/admin',
    element :<>  <Admin/> </> 
  } ,
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <RouterProvider router={router} />  

  </StrictMode>,
)
