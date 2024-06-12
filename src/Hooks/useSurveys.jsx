import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSurveys = (asc) => {
     const axiosPublic = useAxiosPublic()
     const { data: surveys=[], isPending: loading , refetch} = useQuery({
          queryKey: ['surveys'],
          queryFn: async () => {
               const res = await axiosPublic(`/surveys?sort=${asc ?'asc':'desc'}`)
               return res.data;
          }
     })
   return [surveys,loading,refetch]
};

export default useSurveys;