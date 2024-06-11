import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const AllPayments = () => {
     const axiosSecure = useAxiosSecure()
     const { data: payments = [], refetch } = useQuery({
          queryKey: ['payments'],
          queryFn: async () => {
               const res = await axiosSecure.get(`/payments`);
               return res.data;
          }
     });
     return (
          <div>

               <div className="overflow-x-auto ml-6">
                     <div className="text-center mt-5 mb-5">
                         <h1 className="text-4xl font-semibold text-orange-400 uppercase"> Here All <span className="text-yellow-800">Payments</span> </h1>
                     </div>
                    <table className="table w-5/6  mx-auto">
                         {/* head */}
                         <thead className="font-bold text-lg bg-yellow-800  text-white">
                              <tr className="">
                                   <th>No</th>
                                   <th> Email </th>
                                   <th> Date </th>
                                   <th> Price </th>
                                  
                              </tr>
                         </thead>
                         <tbody>


                              {payments.map((payment, inx) => <>
                                   <tr key={payment._id} className="bg-slate-200  text-lg font-medium  ">
                                        <th> {inx + 1} </th>
                                        <td className="text-yellow-600"> {payment.email} </td>
                                        <td> {payment.date.toString().split("T")[0]} </td>
                                        <td className="text-blue-700"> ${payment.price} </td>
                                   </tr>
                              </>)}



                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default AllPayments;