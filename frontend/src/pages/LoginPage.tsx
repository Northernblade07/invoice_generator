import Eclipse from '@/components/Eclipse'
import { Input } from '@/components/ui/input'
import { login } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import ImageSlider from '@/components/ImageSlider'
import Logo from '@/components/Logo'

const LoginPage = () => {

  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })
  const queryClient = useQueryClient()

  const { mutate: loginMutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data)
      localStorage.setItem("token",data.token)
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
      navigate('/product')
    }
  })

  const handleLogin = (e:React.FormEvent) => {
    e.preventDefault();
    loginMutate(loginData)
  }
  return (
    <div className='relative z-0 bg-[#141414] h-screen flex items-center justify-center p-4 sm:p-6 md:p-8'>
      <div className=' flex flex-col lg:flex-row w-full max-w-screen mx-auto  rounded-xl  overflow-hidden '>
        {/* left side */}
        <div className='hidden lg:flex lg:w-1/2  items-center justify-center'>
          {/* <img src="/signup.png" alt="signup image" className='object-cover overflow-hidden absolute right-[11px] rounded-bl-[60px] rounded-tl-[60px] ' height={773} width={830} /> */}
          <ImageSlider/>
        </div>
        {/* right side  */}
        <div className='flex items-start w-[630px] lg:w-1/2 sm:p-4 flex-col gap' >

          <div className=' h-[579px] w-[565px]'>
            <form onSubmit={handleLogin} className='flex flex-col gap-3'>
              <div className='h-19 w-[215px] flex gap-4 items-center'>
                <div className='h-15 w-15'>
                  <Logo width={60} height={60}/>
                </div>
                <div>
                  <p className='text-white text-2xl'>
                    levitation
                  </p>
                  <p className='text-white/80'>infocus</p>
                </div>
              </div>

              <div className='space-y-6 w-[465] overflow-hidden'>
                <h2 className='text-5xl text-[#ffffff] font-semibold'>Sign Up to Begin Journey</h2>
                <p className='text-[#A7A7A7] '>this is a basic signup page</p>
              </div>

              <div className='space-y-6 mt-2'>

                <div className='form-control w-full'>
                  <label className="label">
                    <span className='text-white font-semibold text-sm '>
                      Email
                    </span>
                  </label>
                  <Input type="text" placeholder='enter your email' className='input text-white input-bordered bg-[#202020] w-full h-[60px]' value={loginData.email} onChange={(e) => setLoginData({
                    ...loginData, email: e.target.value
                  })} required />
                </div>

                <div className='form-control w-full'>
                  <label className="label">
                    <span className='text-white font-semibold text-sm '>
                      Password
                    </span>
                  </label>
                  <Input type="password" placeholder='enter your password' className='input text-white input-bordered bg-[#202020] w-full h-[60px]' value={loginData.password} onChange={(e) => setLoginData({
                    ...loginData, password: e.target.value
                  })} required />
                </div>
              </div>

              <div className='flex mt-4 gap-10'>

                <button className='btn bg-[#303030] text-[#CCF575] px-4 py-2 rounded-md' type='submit' >
                  {isPending ? (
                    <span className='loading loading-spinner loading-xs'>
                      loading...
                    </span>
                  ) : "Login"}
                </button>

                <div className='text-center mt-4'>
                  <Link className='text-[] hover:underline' to={'/register'}><p className='text-sm font-serif text-[#B8B8B8]'>Don't have an account?{" "} Create One</p> </Link>
                </div>
              </div>
            </form>

          </div>
        </div>

        
      </div>

      <Eclipse color='#4F59A8' blur='200px' className={'absolute  h-57 rotate-90 w-59  top-0 right-0'} />
      <Eclipse color='#CCF575' blur='300px' className={'absolute  bottom-0 left-0 h-55 w-64'} />
      {/* <Eclipse color='#CCF575' blur='200px' className={'z-0 absolute top-0 left-1/2 h-55 w-64 '} /> */}
    </div>
  )
}

export default LoginPage