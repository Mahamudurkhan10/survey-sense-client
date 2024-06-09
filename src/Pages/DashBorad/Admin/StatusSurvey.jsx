import { NavLink } from "react-router-dom";
import useSurveys from "../../../Hooks/useSurveys";
import { FaThumbsUp } from "react-icons/fa";


const StatusSurvey = () => {
     const [surveys] = useSurveys();
     return (
          <div>
               
               <div className="overflow-x-auto">
                    <table className="table w-3/4 mx-auto">
                         {/* head */}
                         <thead className="font-bold text-lg text-yellow-900">
                              <tr className="">
                                   <th></th>
                                   <th>Category</th>
                                   <th>Title</th>
                                   <th>Options</th>
                                   <th className="text-xl font-bold text-green-700"> Status </th>
                                   <th> Vote </th>
                                   <th> Deadline Date </th>
                                   <th> Create Date </th>
                                
                              </tr>
                         </thead>
                         <tbody>


                              {surveys.map((survey, inx) => <>
                                   <tr key={survey._id} className="bg-base-200 border border-blue-800">
                                        <th> {inx + 1} </th>
                                        <td className="text-blue-700 font-bold"> {survey.category} </td>
                                        <td> {survey.title} </td>
                                        <td> {survey.options} </td>
                                        <td className="text-blue-700 font-semibold"> {survey.status} </td>
                                        <td className="flex items-center justify-center"> <FaThumbsUp></FaThumbsUp> {survey.vote} </td>
                                        <td> {survey.deadline_date} </td>
                                        <td> {survey.timestamp.toString().split("T")[0]} </td>
                                       
                                   </tr>
                              </>)}



                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default StatusSurvey;