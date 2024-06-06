import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const Update = () => {
     const axiosPublic = useAxiosPublic()
     const {title,description,deadline_date,_id} =useLoaderData()
     const handleUpdateForm = (e)=>{
          e.preventDefault();
          const title = e.target.title.value;
          const description = e.target.description.value;
          const category = e.target.category.value;
          const options = e.target.option.value;
          const deadline_date = e.target.date.value;
          
          const surveyData = {title,description,category,deadline_date,options}
          axiosPublic.patch(`/update/${_id}`,surveyData)
          .then(res =>{
               if(res.data.modifiedCount){
                    Swal.fire({
                         position: "top-end",
                         icon: "success",
                         title: ` survey is updated ` ,
                         showConfirmButton: false,
                         timer: 1500
                    });
               }
          })
     }
     return (
          <div className=" ml-10 ">
               <div className="text-center">
                    <h1 className="text-3xl font-bold text-blue-600 mb-5"> Create A Survey </h1>
               </div>
               <form onSubmit={handleUpdateForm} className="w-2/3  p-5 mx-auto card bg-blue-50">

                <div className="grid grid-cols-2  gap-4 ">
                <div>
                         <label className="form-control ">
                              <div className="label">
                                   <span className="label-text font-bold"> Title</span>
                              </div>
                              <input type="text" name="title" placeholder="Type here" defaultValue={title} className="input input-bordered" />

                         </label>
                    </div>
                    <div>
                         <label className="form-control ">
                              <div className="label">
                                   <span className="label-text font-bold"> Description </span>
                              </div>
                              <input type="text" name="description" placeholder="Type here" defaultValue={description} className="input input-bordered " />

                         </label>
                    </div>
                    <div>
                    <label className="form-control w-full max-w-xs">
                         <div className="label">
                              <span className="label-text font-bold"> Option </span>
                             
                         </div>
                         <select   required name="option" className="select select-bordered">
                              <option selected disabled value={''} > Select one  </option>
                              <option> Yes</option>
                              <option> No</option>
                             
                         </select>
                      
                    </label>
                    </div>
                    <div>
                    <label className="form-control w-full max-w-xs">
                         <div className="label">
                              <span className="label-text font-bold"> Category </span>
                             
                         </div>
                         <select name="category" required className="select select-bordered" >
                                
                              <option value={''} disabled selected > Select A Category </option>
                              <option> Employee Engagement </option>
                              <option> Customer Satisfaction </option>
                              <option> Product Feedback </option>
                              <option> Training and Development </option>
                              <option> Health and Wellness </option>
                              <option> Work-Life Balance </option>
                              
                             
                         </select>
                      
                    </label>
                    </div>
                    <div>
                         <label className="form-control ">
                              <div className="label">
                                   <span className="label-text font-bold"> Dateline </span>
                              </div>
                              <input type="date" name="date" placeholder="Type here" defaultValue={deadline_date} className="input input-bordered " />

                         </label>
                    </div>
                </div>
                  <div className="text-center">
                    <input className="btn btn-success w-1/2 text-white mt-4" type="submit" value="Create" />
                  </div>
                
               </form>


          </div>
     );
};

export default Update;