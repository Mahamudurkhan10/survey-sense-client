import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { NavLink } from "react-router-dom";
import { MdReportProblem } from "react-icons/md";


const Report = () => {
     const { user } = useAuth()
     const axiosPublic = useAxiosPublic()
     const { data: reports = [], } = useQuery({
          queryKey: ['reports', user?.email],
          queryFn: async () => {
               const res = await axiosPublic.get(`/report/${user?.email}`)


               return res.data;
          }
     })

     return (
          <div className="w-4/5 mx-auto">
               <div className="flex font-bold text-blue-800 justify-evenly my-4">
                    <h2 className="text7xl"> Reports </h2>
                    <h2 className="text5xl"> <MdReportProblem className="text-xl text-red-600"></MdReportProblem> Total Reports: {reports.length} </h2>
               </div>
               <div className="overflow-x-auto">
                    <table className="table  w-full">
                         {/* head */}
                         <thead className="font-bold text-xl">
                              <tr>
                                   <th></th>
                                   <th>Category</th>
                                   <th>Email</th>
                                    <th> Reason </th>
                                   <th> Title </th>
                                   <th> Deadline Date </th>
                                   <th> Create Date </th>
                                   <th> survey Card Details </th>

                              </tr>
                         </thead>
                         <tbody>
                              {/* row 1 */}
                              {
                                   reports.map((report, index) => <tr key={report._id}>
                                        <th>{index + 1}</th>
                                        <td> {report.category} </td>
                                        <td className="text-yellow-600 font-semibold"> {report.email} </td>
                                        <td> {report.reportData} </td>
                                        <td> {report.title} </td>
                                        <td> {report.deadline_date} </td>
                                        <td> {report.timestamp.toString().split("T")[0]}</td>
                                        <td> <NavLink to={`/surveyDetails/${report.surveyId}`}><button className="btn btn-success text-white "> Details </button></NavLink> </td>


                                   </tr>)
                              }


                         </tbody>
                    </table>
               </div >
          </div >
     );
};

export default Report;