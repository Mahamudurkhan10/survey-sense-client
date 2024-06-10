import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

 

const FeedBack = () => {
     const axiosPublic = useAxiosPublic()
     const { data: feedbacks=[], isPending: loading , refetch} = useQuery({
          queryKey: ['feedbacks'],
          queryFn: async () => {
               const res = await axiosPublic.get(`/feedback`)


               return res.data;
          }
     }) 
     return (
          <div>
                   <div className="overflow-x-auto">
                         <table className="table w-5/6  mx-auto">
                              {/* head */}
                              <thead className="font-bold text-lg text-yellow-900">
                                   <tr className="">
                                        <th></th>
                                        <th> Title </th>
                                        <th> Category </th>
                                        <th> Status </th>
                                        <th> FeedBacks </th>
                                   </tr>
                              </thead>
                              <tbody>


                                   {feedbacks.map((survey, inx) => <>
                                        <tr key={survey._id} className="  ">
                                             <th> {inx + 1} </th>
                                             <td> {survey.title} </td>
                                             <td> {survey.category} </td>
                                             <td> {survey.status} </td>
                                             <td className="text-sm font-bold text-yellow-600"> {survey.feedback} </td>
                                        </tr>
                                   </>)}



                              </tbody>
                         </table>
                    </div>
          </div>
     );
};

export default FeedBack;