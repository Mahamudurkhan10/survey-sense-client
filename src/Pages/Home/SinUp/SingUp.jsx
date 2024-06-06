import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";



const SingUp = () => {
      const {createUser,updateUserProfile}= useAuth();
     const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
     const navigate = useNavigate()
     const location = useLocation()
      const axiosPublic = useAxiosPublic()
     const form = location.state?.form?.pathname || "/";
     const onSubmit = data => {

          console.log(data)
          createUser(data.email,data.password)
       
          .then(result =>{
               const loggedUser = result.user;
               console.log(loggedUser);
              updateUserProfile(data.name, data.photoURL)
          })
          .then(()=>{
               const userInfo = {
                    name : data.name,
                  
                    email: data.email,
                    role:'user',
               }

               axiosPublic.post('/users',userInfo)
               .then(res =>{
                    if(res.data.insertedId){
                         console.log('user added to the database');
                         reset()
                         Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "User created Successfully",
                              showConfirmButton: false,
                              timer: 1500
                            });
                            navigate(form,{replace:true})
                    }
               })

           
          })
          .catch(error => console.log(error))
     };
     console.log(watch("example"));
     return (
          <>
        
               <div className="hero pt-24 min-h-screen bg-base-200">
                    <div className="hero-content w-3/4 mx-auto flex-col lg:flex-row-reverse">
                         <div className="text-center lg:text-left">
                              <h1 className="text-5xl font-bold">SingUp  now!</h1>
                              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                         </div>
                         <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" {...register("name", { required: true })} name="name" placeholder="Name please" className="input input-bordered" />
                                        {errors.name && <span className="text-red-500">This field is required</span>}
                                   </div>
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Photo Url</span>
                                        </label>
                                        <input type="text" {...register("PhotoURL", { required: true })} placeholder="photo Url" className="input input-bordered" />
                                        {errors.photoURL && <span className="text-red-500">Photo URL is required</span>}
                                   </div>
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                                        {errors.email && <span className="text-red-500">Email is required</span>}
                                   </div>
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Password</span>
                                        </label>
                                        <input type="password" {...register("password", { required: true, minLength: 6, pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$)/, maxLength: 20 })} name="password" placeholder="password" className="input input-bordered" />
                                        {errors.password?.type === 'required' && <p className="text-red-600">password is required</p>}
                                        {errors.password?.type === 'minLength' && <p className="text-red-600">password must be 6 character</p>}
                                        {errors.password?.type === 'maxLength' && <p className="text-red-600">password must be less than 20 character</p>}
                                        {errors.password?.type === 'pattern' && <p className="text-red-600">password must have one uppercase ,one lowercase ,one number and one special character</p>}

                                   </div>
                                   <div className="form-control mt-6">
                                        <input type="submit" value="SignUp" className="btn btn-info border-b-4 btn-outline" />
                                   </div>
                              </form>
                         <p className='text-center mb-3'> Already Have an Account?? <Link className='text-lg text-green-500 font-bold' to={'/login'}> Login Here </Link> </p>
                              
                              <div className="">
                                    <SocialLogin></SocialLogin>
                              </div>

                         </div>
                    </div>
               </div>
          </>
     );
};

export default SingUp;