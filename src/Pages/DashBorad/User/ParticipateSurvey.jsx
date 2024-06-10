import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";



const ParticipateSurvey = () => {
     const { user } = useAuth()
     const axiosPublic = useAxiosPublic()
     const { data: participates = [], } = useQuery({
          queryKey: ['participates', user?.email],
          queryFn: async () => {
               const res = await axiosPublic.get(`/responseMail/${user?.email}`)


               return res.data;
          }
         
     })
    
     return (
          <div>
                
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-green-600 mb-5"> Participate  Surveys </h1>
               </div>
               
               <div className="overflow-x-auto">
                    <table className="table w-5/6  mx-auto">
                         {/* head */}
                         <thead className="font-bold text-lg text-yellow-900">
                              <tr className="">
                                   <th></th>
                                   <th>Category</th>
                                   <th>Title</th>
                                   <th> Email </th>
                                   <th>Options</th>
                                   <th> Status </th>
                                   <th> Yes Vote </th>
                                   <th> No Vote </th>
                                   <th> Deadline Date </th>
                                   <th> Create Date </th>
                                   <th> vote </th>
                                   
                                 
                              </tr>
                         </thead>
                         <tbody>


                              {participates.map((survey, inx) => <>
                                   <tr key={survey._id} className="bg-base-200  border-blue-800">
                                        <th> {inx + 1} </th>
                                        <td className="text-blue-700 font-bold"> {survey.category} </td>
                                        <td> {survey.title} </td>
                                        <td className="text-yellow-800 font-bold"> {survey.email} </td>
                                        <td> {survey.options} </td>
                                        <td> {survey.status} </td>
                                        <td> {survey.yesVote} </td>
                                        <td> {survey.noVote} </td>
                                        <td> {survey.deadline_date} </td>
                                        <td> {survey.timestamp.toString().split("T")[0]} </td>
                                        <td> {survey.vote} </td>
                                   </tr>
                              </>)}



                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default ParticipateSurvey;