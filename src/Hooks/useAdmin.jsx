import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
     const axiosSecure = useAxiosSecure()
     const {user}= useAuth();
     
     const {  data: admin,isPending:isAdminLoading} = useQuery({
          queryKey: ['admin',user?.email],
          queryFn: async ()=>{
               const res = await axiosSecure.get(`/users/admin/${user.email}`)
            
               return res.data?.admin; 
          }
     })
     
     return {admin,isAdminLoading}
};

export default useAdmin;