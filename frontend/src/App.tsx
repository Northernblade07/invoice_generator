import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ProductPage from './pages/ProductPage'
import { Toaster} from 'react-hot-toast'
const App = () => {
  return (
    <div className='min-h-screen'>
  <Navbar/>
  <Routes>
    <Route element={<RegisterPage/>} path='/register'/>
     <Route element={<LoginPage/>} path='/login'/>
      <Route element={<ProductPage/>} path='/product'/>
       {/* <Route element={<RegisterPage/>} path='/register'/> */}

  </Routes>
   <Toaster/>
    </div>
  )
}

export default App