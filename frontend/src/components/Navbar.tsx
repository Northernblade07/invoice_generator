import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '@/lib/api'
import toast from 'react-hot-toast'
import { Button } from './ui/button'
const Navbar = () => {
 
  
    const queryClient = useQueryClient();

    const {mutate:logoutMutation} = useMutation({
        mutationFn:logout,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["authUser"]})
            toast.success("logout successfully")
        }
    }) 

  return (
    <div className='bg-[#1F1F1F] h-16 z-10 sticky'>
       <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center '>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-end '>

<div className='h-12 w-[141px] flex gap-4'>
<div className='bg-white w-10 h-10'></div>
                   <div>
                    <p className='text-white text-2xl'>
                       levitation
                      </p>  
                      <p className='text-white/80'>infocus</p>
                   </div>
</div>

                <div className='flex items-center  ml-auto'>
                <Button className='btn  btn-circle bg-[#CCF575] px-4 py-2 rounded-md w-20' onClick={logoutMutation}>login</Button>
                </div>
                {/* logout */}
            </div>
        </div>
    </nav>
    </div>
  )
}

export default Navbar