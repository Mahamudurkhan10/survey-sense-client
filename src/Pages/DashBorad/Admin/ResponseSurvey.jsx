import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


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
               <div>

<div className="overflow-x-auto">
<div className="text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-5">  Responses Surveys </h1>
               </div>
     <table className="table w-5/6  mx-auto">
          {/* head */}
          <thead className="font-bold text-lg text-yellow-900">
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
                    <tr key={survey._id} className="bg-base-200  text-sm font-semibold ">
                         <th> {inx + 1} </th>
                         <td className="text-blue-700 font-bold"> {survey.category} </td>
                         <td> {survey.title} </td>
                         
                         <td> {survey.yesVote} </td>
                         <td> {survey.noVote} </td>
                      
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

export default ResponseSurvey;