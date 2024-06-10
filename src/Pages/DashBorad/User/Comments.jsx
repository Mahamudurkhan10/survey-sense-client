import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaThumbsUp } from "react-icons/fa6";


const Comments = () => {
     const { user } = useAuth()
     const axiosPublic = useAxiosPublic()
     const { data: comments = [], isPending: loading, refetch } = useQuery({
          queryKey: ['comments', user?.email],
          queryFn: async () => {
               const res = await axiosPublic.get(`/comments/${user.email}`)


               return res.data;
          }
     })
     return (
          <div className="">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-5"> My Comments </h1>
               </div>
               <div className=" ml-5 overflow-x-auto">
                    <table className="table  w-full">
                         {/* head */}
                         <thead className="font-bold text-xl">
                              <tr>
                                   <th></th>
                                   <th>Category</th>
                                   <th> Title </th>
                                   <th> Email </th>
                                   <th className="text-blue-500"> My Comments </th>
                                   <th> Vote </th>
                              

                              </tr>
                         </thead>
                         <tbody>
                              {/* row 1 */}
                              {
                                  comments.map((com, index) => <tr key={com._id}>
                                        <th>{index + 1}</th>
                                         <td> {com.category} </td>
                                         <td> {com.title} </td>
                                         <td> {com?.email} </td>
                                         <td className="text-blue-600 font-semibold"> {com?.comment} </td>
                                         <td className="flex"> <FaThumbsUp></FaThumbsUp> {com.vote}  </td>


                                   </tr>)
                              }


                         </tbody>
                    </table>
               </div >
          </div>
     );
};

export default Comments;