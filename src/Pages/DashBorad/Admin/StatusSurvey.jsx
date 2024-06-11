
import useSurveys from "../../../Hooks/useSurveys";
import { FaThumbsUp } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { BiUpvote } from "react-icons/bi";



const StatusSurvey = () => {
     const [surveys] = useSurveys();
     const axiosSecure = useAxiosSecure();

     const handleFeedBack = (e, survey) => {
          e.preventDefault()

          const feedback = e.target.feedback.value;
          const newId = survey._id;
          const title = survey.title;
          const category = survey.category;
          const createTime = survey.timestamp;
          const status = survey.status;
          const mainFeedBack = { feedback, newId, title, category, createTime, status }
          axiosSecure.post(`/feedback`, mainFeedBack)
               .then(res => {
                    if (res.data.insertedId) {
                         Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: ` survey is updated `,
                              showConfirmButton: false,
                              timer: 1500
                         });
                         e.target.reset();

                    }
               })
     }
     return (
          <div className="ml-6">
               <div className="text-center">
                    <h1 className="text-3xl mt-6 font-bold text-green-600 mb-5">  Status Of Surveys </h1>
               </div>
               <div className="overflow-x-auto">
                    <table className="table w-3/4 mx-auto">
                         {/* head */}
                         <thead className="font-bold text-lg text-yellow-900">
                              <tr className="">
                                   <th></th>
                                   <th>Category</th>
                                   <th>Title</th>

                                   <th className="text-xl font-bold text-green-700"> Status </th>
                                   <th> Vote </th>
                                   <th> Create Date </th>
                                   <th> FeedBack </th>

                              </tr>
                         </thead>
                         <tbody>


                              {surveys.map((survey, inx) => <>
                                   <tr key={survey._id} className="bg-base-200 border border-blue-800">
                                        <th> {inx + 1} </th>
                                        <td className="text-blue-700 font-bold"> {survey.category} </td>
                                        <td> {survey.title} </td>

                                        <td className="text-yellow-700 text-lg font-semibold"> {survey.status} </td>
                                        <td className="flex items-center justify-center"> <BiUpvote className="text-lg text-green-600"></BiUpvote> {survey.vote} </td>

                                        <td> {survey.timestamp.toString().split("T")[0]} </td>
                                        <td> {
                                             survey.status === 'publish' ? <></> : <>
                                                  <button className="btn btn-info" onClick={() => document.getElementById('my_modal_5').showModal()}> FeedBack</button>
                                                  <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                       <div className="modal-box">
                                                            <form onSubmit={(e) => handleFeedBack(e, survey)} action="">

                                                                 <div>
                                                                      <label className="label" htmlFor=""> FeedBack </label>
                                                                      <textarea required name="feedback" className="textarea textarea-accent" placeholder="type here "></textarea>
                                                                 </div>

                                                                 <input className="btn mt-3  btn-success btn-outline" type="submit" value="Submit" />
                                                            </form>
                                                            <div className="modal-action">
                                                                 <form method="dialog">
                                                                      {/* if there is a button in form, it will close the modal */}
                                                                      <button className="btn">Close</button>
                                                                 </form>
                                                            </div>
                                                       </div>
                                                  </dialog>
                                             </>
                                        } </td>


                                   </tr>
                              </>)}



                         </tbody>
                    </table>
               </div>
          </div>
     );
};

export default StatusSurvey;