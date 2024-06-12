import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";



const FeedBack = () => {
     const axiosSecure = useAxiosSecure();
     const { data: feedbacks = [], isPending: loading, refetch } = useQuery({
          queryKey: ['feedbacks'],
          queryFn: async () => {
               const res = await axiosSecure.get(`/feedback`)


               return res.data;
          }
     })
     return (
          <div>
               <div className="text-center mt-6">
                    <h1 className="text-3xl font-bold text-green-600 mb-5">  Survey FeedBack </h1>
               </div>
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