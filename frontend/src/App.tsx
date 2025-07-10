import React from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { Toaster} from 'react-hot-toast'
import ProductPage from './pages/ProductPage'
import { useQuery } from '@tanstack/react-query'
import { getAuthUser } from './lib/api'
import PageLoader from './components/PageLoader'
const App = () => {
  const {data:authUser , isLoading} = useQuery({
    queryKey:['authUser'],
    queryFn:getAuthUser,
    retry:false
  })
  const isAuthenticate = Boolean(authUser)
  console.log(isAuthenticate)
  if (isLoading) return <PageLoader/>;
  return (
    <div className='min-h-screen'>
  <Navbar/>
  <Routes>
    <Route element={!isAuthenticate?<RegisterPage/>:<Navigate to={'/product'}/>} path='/register'/>
     <Route element={!isAuthenticate?<LoginPage/>:<Navigate to={'/product'}/>} path='/login'/>
      <Route element={isAuthenticate?<ProductPage/>:<Navigate to={'/login'}/>} path='/product'/>
       {/* <Route element={<RegisterPage/>} path='/register'/> */}

  </Routes>
   <Toaster/>
    </div>
  )
}

export default App