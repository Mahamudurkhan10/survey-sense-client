import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";

import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllUsers = () => {

  const axiosSecure = useAxiosSecure()
  const [selectedUser, setSelectedUser] = useState(null); 

  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    }
  });

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
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th> Current role </th>
              <th> Make Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td> {user.role} </td>
              
                <td>
                  {user.role === 'admin' || user.role === 'surveyor' ? (
                    <button  onClick={() => setSelectedUser(user)} className='btn text-blue-600 btn-ghost'>{user.role}</button>
                  ) : (
                    <>
                      <button
                        className="btn bg-yellow-400 btn-xs text-white font-bold text-lg"
                        onClick={() => setSelectedUser(user)}
                      >
                        <FaUsers className="text-2xl" />
                      </button>
                    </>
                  )}
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
