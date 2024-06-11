import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { FaGoogle } from "react-icons/fa";


const SocialLogin = () => {
     const { googleLogin } = useAuth()
     const axiosPublic = useAxiosPublic()
     const navigate = useNavigate()
     const handleGoogleLogin = () => {
          googleLogin()
               .then(result => {
                    console.log(result.user);
                    const userInfo = {
                         email: result.user?.email,
                         name: result.user?.displayName

                    }
                    axiosPublic.post('/users', userInfo)
                         .then(res => {
                              console.log(res.data);
                              navigate('/')
                         })
               })
     }
     return (
          <div>
               <div className="mb-5">
                    <div className="divider"></div>
                    <h1 className="font-bold text-center text-yellow-500 mb-3">  Social Account ----- </h1>

                    <div className="text-center ">
                         <button onClick={handleGoogleLogin} className="mr-6 btn  text-green-400 font-bold"> <FaGoogle className="text-xl "></FaGoogle> Google</button>

                    </div>
               </div>
          </div>
     );
};

export default SocialLogin;