import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const SurveyResponse = () => {
     const axiosSecure = useAxiosSecure();
     const { data: responses = [], isPending: loading, refetch } = useQuery({
          queryKey: ['responses'],
          queryFn: async () => {
               const res = await axiosSecure.get(`/response`)


               return res.data;
          }
     })
     return (
          <div>
               <div>
                    <div className="text-center mt-5">
                         <h1 className="text-3xl font-bold text-green-600 mb-5 uppercase">  Survey response </h1>
                    </div>
                    <div className="overflow-x-auto">
                         <table className="table w-5/6  mx-auto">
                              {/* head */}
                              <thead className="font-bold text-lg bg-sky-700  text-yellow-600">
                                   <tr className="">
                                        <th></th>
                                        <th>Category</th>
                                        <th>Title</th>
                                        

                                        <th> Deadline Date </th>
                                        <th> Create Date </th>
                                        <th> Details </th>
                                   </tr>
                              </thead>
                              <tbody>


                                   {responses.map((survey, inx) => <>
                                        <tr key={survey._id} className="bg-base-200  border-blue-800">
                                             <th> {inx + 1} </th>
                                             <td className="text-blue-700 font-bold"> {survey.category} </td>
                                             <td> {survey.title} </td>
                                           

                                             <td> {survey.deadline_date} </td>
                                             <td> {survey.timestamp.toString().split("T")[0]} </td>
                                             <td> <Link to={`/dashboard/responseDetails/${survey.resId}`}><button className="btn btn-info btn-outline"> Details </button></Link> </td>
                                        </tr>
                                   </>)}



                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
};

export default SurveyResponse;