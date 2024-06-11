import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";


const ResponseSurvey = () => {
     const axiosSecure = useAxiosSecure()
     const { data: responseSurvey = [], isPending: loading, refetch } = useQuery({
          queryKey: ['responseSurvey'],
          queryFn: async () => {
               const res = await axiosSecure.get(`/response`)


               return res.data;
          }
     })
     return (
          <div>
               <div className="ml-6">

                    <div className="overflow-x-auto">
                         <div className="text-center">
                              <h1 className="text-3xl font-bold text-blue-600 mb-5">  Responses Surveys </h1>
                         </div>
                         <table className="table w-5/6  mx-auto">
                              {/* head */}
                              <thead className="font-bold text-lg bg-blue-700 opacity-70 text-white">
                                   <tr className="">
                                        <th></th>
                                        <th>Category</th>
                                        <th>Title</th>

                                        <th> Yes Vote </th>
                                        <th> No Vote </th>

                                        <th> Create Date </th>
                                        <th> Details </th>
                                   </tr>
                              </thead>
                              <tbody>


                                   {responseSurvey.map((survey, inx) => <>
                                        <tr key={survey._id} className="bg-slate-50  text-sm border-green-400 font-semibold ">
                                             <th> {inx + 1} </th>
                                             <td className="text-blue-700 font-bold"> {survey.category} </td>
                                             <td> {survey.title} </td>

                                             <td className="flex items-center justify-center gap-2"> <FaThumbsUp></FaThumbsUp> {survey.yesVote} </td>

                                             <td > <h1 className="flex items-center justify-center  gap-2"> <FaThumbsDown></FaThumbsDown> {survey.noVote}</h1> </td>

                                             <td> {survey.timestamp.toString().split("T")[0]} </td>
                                             <td> <Link to={`/dashboard/responseDetails/${survey.resId}`}><button className="btn btn-info text-yellow-300"> Details </button></Link> </td>
                                        </tr>
                                   </>)}



                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
};

export default ResponseSurvey;