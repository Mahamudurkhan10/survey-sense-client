import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
     const axiosPublic = useAxiosPublic();
     const { refetch, data: users = [] } = useQuery({
          queryKey: ['users'],
          queryFn: async () => {
               const res = await axiosPublic.get(`/users`)
               return res.data
          }
     })
     const handleMakeUser = (e,user) => {
           e.preventDefault()
           const role = e.target.role.value;
           console.log(role);
          axiosPublic.patch(`/users/admin/${user?._id}`,{role})
               .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                         refetch()
                         Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: `${user.name} is an ${role} now`,
                              showConfirmButton: false,
                              timer: 1500
                         });
                    }
               })
     }
     return (
          <div>
               <div className="flex justify-evenly my-4">
                    <h2 className="text3xl"> All User </h2>
                    <h2 className="text3xl"> Total User: {users.length} </h2>
               </div>
               <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                         {/* head */}
                         <thead>
                              <tr>
                                   <th></th>
                                   <th>Name</th>
                                   <th>Email</th>
                                   <th>Role</th>

                              </tr>
                         </thead>
                         <tbody>
                              {/* row 1 */}
                              {
                                   users.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td> {user.email}  </td>
                                        <th>
                                             {user.role === 'admin' ? 'Admin' :
                                               user.role ==='surveyor' ? 'surveyor':
                                                  <div>
                                                       <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}><button className="btn bg-yellow-400 btn-xs text-white font-bold text-lg"> <FaUsers className="text-2xl"></FaUsers> </button> </button>
                                                       <dialog id="my_modal_1" className="modal">
                                                            <div className="modal-box">
                                                                 <form onSubmit={(e)=> handleMakeUser(e,user)}>
                                                                           <div>
                                                                      <label className="form-control w-full max-w-xs">
                                                                           <div className="label">
                                                                                <span className="label-text font-bold"> Change the user Role </span>

                                                                           </div>
                                                                           <select  required name="role" className="select select-bordered">
                                                                                <option disabled value={''} selected> select one </option>
                                                                                <option> admin </option>
                                                                                <option> surveyor</option>
                                                                           </select>

                                                                      </label>
                                                            </div>
                                                            <div>
                                                                 <button className="btn btn-success w-1/2 mt-5 btn-outline"> Submit </button>
                                                            </div>
                                                       </form>
                                                       <div className="modal-action">
                                                            <form method="dialog">

                                                                 <button className="btn">Close</button>
                                                            </form>
                                                       </div>
                                                  </div>
                                        </dialog>
                                   </div>
                                            
                                            }
                         </th>

                    </tr>)
                              }


               </tbody>
          </table>
          </div >
          </div >
     );
};

export default AllUsers;