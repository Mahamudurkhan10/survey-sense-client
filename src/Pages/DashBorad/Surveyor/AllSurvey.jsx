import { MdDelete, MdUpdate } from "react-icons/md";
import useSurveys from "../../../Hooks/useSurveys";
import { FaThumbsUp } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const AllSurvey = () => {
     const [surveys,,refetch] = useSurveys()
     const axiosSecure = useAxiosSecure()
     console.log(surveys);
     const handleDelete = (_id) => {
          Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete it!"
          }).then((result) => {
               if (result.isConfirmed) {
                    axiosSecure.delete(`/surveys/${_id}`)
                         .then(res => {
                              if (res.data.deletedCount > 0) {
                                   refetch()
                                   Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                   });
                              }
                              
                         })
      
               }
          });
      }  
     return (
          <div>
               <div className="text-center mt-6">
                    <h1 className="text-3xl font-bold text-blue-600 mb-5"> Update  Survey </h1>
               </div>
               <div className="overflow-x-auto">
                    <table className="table w-3/4 mx-auto">
                         {/* head */}
                         <thead className="font-bold text-lg bg-green-700 text-yellow-600">
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
                                   <th>  </th>
                              </tr>
                         </thead>
                         <tbody>


                              {surveys.map((survey, inx) => <>
                                   <tr key={survey._id} className="bg-base-200 border border-b-4 border-blue-200">
                                        <th> {inx + 1} </th>
                                        <td className="text-blue-700 font-bold"> {survey.category} </td>
                                        <td> {survey.title} </td>
                                        <td> {survey.options} </td>
                                        <td> {survey.status} </td>
                                        <td className="flex items-center justify-center"> <FaThumbsUp></FaThumbsUp> {survey.vote} </td>
                                        <td> {survey.deadline_date} </td>
                                        <td> {survey.timestamp} </td>
                                        <td> <NavLink to={`/dashboard/update/${survey._id}`} className="flex items-center"> <button className="btn bg-green-500 btn-xs text-white font-bold text-lg"> <MdUpdate></MdUpdate> </button> </NavLink> </td>
                                        <td>
                                             <button onClick={() => handleDelete(survey._id)} className="btn bg-red-500 btn-xs text-white font-bold text-lg">
                                                  <MdDelete />
                                             </button>
                                        </td>
                                   </tr>
                              </>)}



                         </tbody>
                    </table>
               </div>
          </div>

     );
};

export default AllSurvey;