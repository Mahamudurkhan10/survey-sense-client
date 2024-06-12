import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const SingUp = () => {
    const { createUser, updateUserProfile } = useAuth();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
       console.log(data.name);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                return updateUserProfile(data.name, data.photoURL); // Ensure this function returns a promise
            })
            .then(() => {
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    role: 'user',
                };

                return axiosPublic.post('/users', userInfo);
            })
            .then(res => {
                if (res.data.insertedId) {
                    console.log('User added to the database');
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User created successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(from, { replace: true });
                }
            })
            .catch(error => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
    };

    console.log(watch("photoURL")); // Ensure this watches the correct field name

    return (
        <div className="hero pt-24 min-h-screen bg-base-200">
            <div className="hero-content w-3/4 mx-auto flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                    <p className="py-6">Welcome to our platform! We value your experience and make joining us as easy as possible.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                            {errors.photoURL && <span className="text-red-500">Photo URL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered" />
                            {errors.email && <span className="text-red-500">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", { 
                                required: true, 
                                minLength: 6, 
                                maxLength: 20, 
                                pattern: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$)/ 
                            })} placeholder="Password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must include one uppercase letter, one lowercase letter, one number, and one special character</p>}
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" value="Sign Up" className="btn btn-info border-b-4 btn-outline" />
                        </div>
                    </form>
                    <p className='text-center mb-3'>Already have an account? <Link className='text-lg text-green-500 font-bold' to={'/login'}>Login Here</Link></p>
                    <div>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingUp;
