import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useSurveyor = () => {
     const axiosSecure = useAxiosSecure()
     const {user}= useAuth();
     
     const {  data: surveyor,isPending:isSurveyorLoading} = useQuery({
          queryKey: ['surveyor',user?.email],
          queryFn: async ()=>{
               const res = await axiosSecure.get(`/users/surveyor/${user?.email}`)
            
               return res.data?.surveyor; 
          }
     })
     
     return { surveyor, isSurveyorLoading}
};

export default useSurveyor;