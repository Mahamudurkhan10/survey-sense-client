import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaThumbsUp } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ResponseDetails = () => {
     const responseOne = useLoaderData();
     const axiosSecure = useAxiosSecure();
     const { data: voteResponses = [], isPending: loading, refetch } = useQuery({
          queryKey: ['voteResponses'],
          queryFn: async () => {
               const res = await axiosSecure.get(`/response/${responseOne.resId}`)


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
                                        <th>Email</th>
                                        <th> Name </th>
                                         <th> Vote </th>
                                   </tr>
                              </thead>
                              <tbody>


                                   {voteResponses.map((survey, inx) => <>
                                        <tr key={survey._id} className="bg-base-200  border-blue-800">
                                             <th> {inx + 1} </th>
                                             <td> {survey.email} </td>
                                             <td> {survey.name} </td>
                                             <td className="flex gap-2" >  {survey.vote} <FaThumbsUp className="text-blue-600"></FaThumbsUp> </td>
                                        </tr>
                                   </>)}



                              </tbody>
                         </table>
                    </div>
          </div>
     );
};

export default ResponseDetails;