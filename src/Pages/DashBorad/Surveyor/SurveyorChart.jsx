import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useState } from "react";
import Chart from "../../Shared/Chart/Chart";
import { FaThumbsUp } from "react-icons/fa6";
import { FaThumbsDown } from "react-icons/fa";



const SurveyorChart = () => {
     const [click, setClick] = useState(true)

     const axiosPublic = useAxiosPublic()
     const { data: surveys = [], isPending: loading, refetch } = useQuery({
          queryKey: ['surveys'],
          queryFn: async () => {
               const res = await axiosPublic.get(`/totalVotesByCategory`)


               return res.data;
          }
     })


     return (
          <div>
               <div className="flex justify-end w-3/4 mx-auto mt-7 ">
                    <button className="btn btn-success text-white font-bold text-xl" onClick={() => setClick(!click)}> {click ? 'chart' : 'table'} </button>
               </div>
               {
                    click ? <div>
                         <div className="text-center mb-7 text-4xl font-bold text-blue-700">
                              <h1> Survey ChartView </h1>
                         </div>
                         <h1 className="w-3/4 mx-auto"> <Chart data={surveys}></Chart> </h1>
                         <div className="w-3/4 mx-auto text-xl font-bold"   >
                              <h1 > pv : <span className="text-2xl font-semibold text-purple-700"> yesVote </span> </h1>
                              <h1> uv : <span className="text-2xl font-semibold text-green-600"> noVote </span> </h1>
                         </div>
                    </div> : <div>
                         <div className="text-center mb-7 text-4xl font-bold text-blue-700">
                              <h1> Survey table </h1>
                         </div>
                         <div className="overflow-x-auto">
                              <table className="table w-5/6  mx-auto">
                                   {/* head */}
                                   <thead className="font-bold text-lg text-yellow-900">
                                        <tr className="">
                                             <th></th>
                                             <th> Category </th>
                                             <th> Yes Vote</th>
                                             <th> No Vote</th>
                                             <th> Total Vote </th>
                                        </tr>
                                   </thead>
                                   <tbody>


                                        {surveys.map((survey, inx) => <>
                                             <tr key={survey._id} className="bg-base-200  border-blue-800">
                                                  <th> {inx + 1} </th>
                                                  <td> {survey.category} </td>
                                                  <td className="flex items-center gap-2"> <FaThumbsUp></FaThumbsUp> {survey.totalYesVote} </td>
                                                  <td  > <span className="flex items-center gap-2"><FaThumbsDown></FaThumbsDown> {survey.totalNoVote}</span> </td>
                                                  <td className="text-sm text-green-700 font-bold"> {survey.totalVote} </td>


                                             </tr>
                                        </>)}



                                   </tbody>
                              </table>
                         </div>
                    </div>
               }


          </div>
     );
};

export default SurveyorChart;