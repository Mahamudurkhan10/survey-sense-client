import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios'; // Axios for HTTP requests
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Fetch users data
  const { refetch, data: oldUsers = [] } = useQuery({
    queryKey: ['oldUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    }
  });

  useEffect(() => {
    setUsers(oldUsers);
  }, [oldUsers]);

  const handleFilter = (filter) => {
     if(filter ==='All'){
      setUsers(oldUsers)
     }
     else {
      const roleFilter = oldUsers.filter(user => user.role === filter);
      setUsers(roleFilter);
    }
  };

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
              axiosSecure.delete(`/users/${_id}`)
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

  const handleMakeUser = (e) => {
    e.preventDefault();
    const role = e.target.role.value;
    const userId = selectedUser?._id;
    if (!userId) return;

    axiosSecure.patch(`/users/admin/${userId}`, { role })
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch();
          setSelectedUser(null);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `User is now a ${role}`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  };

  return (
    <div>
      <div className="flex justify-evenly text-yellow-700 font-bold my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className='text-center mt-3 mb-9'>
        <div className="dropdown dropdown-right">
          <div onClick={()=> handleFilter('All')} tabIndex={0} role="button" className="btn text-white btn-success px-7 m-1">See User</div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li onClick={() => handleFilter('admin')}><a>Admin</a></li>
            <li onClick={() => handleFilter('surveyor')}><a>Surveyor</a></li>
            <li onClick={() => handleFilter('user')}><a>User</a></li>
            <li onClick={() => handleFilter('proUser')}><a>Pro User</a></li>
          </ul>
        </div>
      </div>
      
      <div className="overflow-x-auto w-4/5 mx-auto">
        <table className="table w-full">
          <thead className='text-xl font-semibold bg-slate-400 text-white'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Make Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className='text-sm font-medium'>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === 'admin' || user.role === 'surveyor' ? (
                    <button onClick={() => setSelectedUser(user)} className='btn text-blue-600 btn-ghost'>{user.role}</button>
                  ) : (
                    <button
                      className="btn bg-yellow-400 btn-xs text-white font-bold text-lg"
                      onClick={() => setSelectedUser(user)}
                    >
                      <FaUsers className="text-2xl" />
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={()=>handleDelete(user._id)} className="btn bg-red-500 btn-xs text-white font-bold text-lg">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <dialog id="role_modal" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Change Role for {selectedUser.name}</h3>
            <form onSubmit={handleMakeUser}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-bold">Select Role</span>
                </label>
                <select required name="role" className="select select-bordered">
                  <option value="" disabled selected>Select one</option>
                  <option value="admin">Admin</option>
                  <option value="surveyor">Surveyor</option>
                </select>
              </div>
              <div className="modal-action">
                <button className="btn btn-success mt-5 w-24" type="submit">Submit</button>
                <button className="btn mt-5 w-24" type="button" onClick={() => setSelectedUser(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AllUsers;
