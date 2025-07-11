import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '@/lib/api'
import toast from 'react-hot-toast'
import { Button } from './ui/button'
import { useLocation, useNavigate } from 'react-router'
import Logo from './Logo'
const Navbar = () => {
 const navigate = useNavigate();
 const location = useLocation();

     const isSignupPage = location.pathname?.startsWith("/register");
      const isLoginPage= location.pathname?.startsWith("/login");
      const isProductPage =location.pathname?.startsWith("/");
  
    const queryClient = useQueryClient();

    const {mutate:logoutMutation} = useMutation({
        mutationFn:logout,
        onSuccess:()=>{
            localStorage.removeItem("token");
            queryClient.invalidateQueries({queryKey:["authUser"]})
            toast.success("logout successfully")
            navigate('/login');
        }
    }) 


  return (
    <div className='bg-[#1F1F1F] h-16 z-10 sticky'>
       <nav className='bg-base-200 sticky top-0 z-30 h-16 flex items-center '>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-end '>

<div className='h-12 w-[141px] flex items-center gap-4'>
<div className='w-10 h-[35px]'>
  <Logo width={35} height={35}/>
</div>
                   <div>
                    <p className='text-white text-2xl'>
                       levitation
                      </p>  
                      <p className='text-white/80'>infocus</p>
                   </div>
</div>

                <div className='flex items-center  ml-auto'>
                 {isSignupPage ? (
                <Button onClick={() => navigate("/login")} className="bg-[#CCF575] text-black rounded-md px-4 py-2">
                  Login
                </Button>
              ) : isLoginPage ? (
                <Button onClick={() => navigate("/register")} className="bg-[#292C20] text-[#CCF575] border border-[#CCF575] rounded-md px-4 py-2">
                  Connecting People With Technology
                </Button>
              ) : isProductPage ? (
                <Button onClick={() => logoutMutation()} className="bg-[#CCF575] text-black rounded-md px-4 py-2">
                  Logout
                </Button>
              ) : null}   
                {/* <Button className='btn  btn-circle bg-[#CCF575] px-4 py-2 rounded-md w-20' onClick={()=>logoutMutation}>logout</Button> */}
                </div>
                {/* logout */}
            </div>
        </div>
    </nav>
    </div>
  )
}

export default Navbar