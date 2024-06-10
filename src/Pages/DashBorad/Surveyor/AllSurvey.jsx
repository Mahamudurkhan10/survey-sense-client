import { MdUpdate } from "react-icons/md";
import useSurveys from "../../../Hooks/useSurveys";
import { FaThumbsUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const AllSurvey = () => {
     const [surveys] = useSurveys()
     console.log(surveys);
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
                                   <th> Status </th>
                                   <th> Vote </th>
                                   <th> Deadline Date </th>
                                   <th> Create Date </th>
                                   <th> Update </th>
                              </tr>
                         </thead>
                         <tbody>


                              {surveys.map((survey, inx) => <>
                                   <tr key={survey._id} className="bg-base-200 border border-blue-800">
                                        <th> {inx + 1} </th>
                                        <td className="text-blue-700 font-bold"> {survey.category} </td>
                                        <td> {survey.title} </td>
                                        <td> {survey.options} </td>
                                        <td> {survey.status} </td>
                                        <td className="flex items-center justify-center"> <FaThumbsUp></FaThumbsUp> {survey.vote} </td>
                                        <td> {survey.deadline_date} </td>
                                        <td> {survey.timestamp} </td>
                                        <td> <NavLink to={`/dashboard/update/${survey._id}`} className="flex items-center"> <button className="btn btn-error"> <MdUpdate></MdUpdate> Update </button> </NavLink> </td>
                                   </tr>
                              </>)}



                         </tbody>
                    </table>
               </div>
          </div>

     );
};

export default AllSurvey;