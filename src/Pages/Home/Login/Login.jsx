import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";


const Login = () => {
      const {singIn} = useAuth();
     const navigate = useNavigate()
     const location = useLocation()
     const form = location.state?.form?.pathname || "/";
     const handleLogin = (event) => {
          event.preventDefault();

          const email = event.target.email.value;
          const password = event.target.password.value;
          console.log(email, password);
          singIn(email, password)
               .then(result => {
                    const user = result.user;
                    console.log(user);
                    Swal.fire({
                         title: "User login successfully",
                         showClass: {
                              popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `
                         },
                         hideClass: {
                              popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `
                         }
                    });
                    navigate(form, { replace: true })

               })
     }
     return (
          <div className="hero min-h-screen  bg-blue-100">
               <div className="hero-content w-3/4 mx-auto  flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                         <h1 className="text-5xl font-bold">Login now!</h1>
                         <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                         <form onSubmit={handleLogin} className="card-body">
                              <div className="form-control">
                                   <label className="label">
                                        <span className="label-text">Email</span>
                                   </label>
                                   <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                              </div>
                              <div className="form-control">
                                   <label className="label">
                                        <span className="label-text">Password</span>
                                   </label>
                                   <input type="password" name="password" placeholder="password" className="input input-bordered" required />

                              </div>
                              
                              <div className="form-control mt-6">
                                   <input  type="submit" value="Login" className="btn btn-success" />
                              </div>
                         </form>
                         <p className='text-center '> New User?? <Link className='text-lg text-green-500 font-bold' to={'/singUp'}> Create Account </Link> </p>

                         <div >
                              <SocialLogin></SocialLogin>
                         </div>

                    </div>



               </div>
          </div>
     );
};

export default Login;