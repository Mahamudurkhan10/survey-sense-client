import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";


const PrivateAdminRoutes = ({children}) => {
     const { admin, isAdminLoading } = useAdmin();
     const { user, loading } = useAuth();
     const location = useLocation()

     if (loading || isAdminLoading) {
          return <div>
               <span className="loading loading-spinner text-primary"></span>
               <span className="loading loading-spinner text-secondary"></span>
               <span className="loading loading-spinner text-accent"></span>
               <span className="loading loading-spinner text-neutral"></span>
               <span className="loading loading-spinner text-info"></span>
               <span className="loading loading-spinner text-success"></span>
               <span className="loading loading-spinner text-warning"></span>
               <span className="loading loading-spinner text-error"></span>
          </div>
     }
     if (user && admin) {
          return children;
     }
     return <Navigate to={'/login'} state={{ form: location }} replace></Navigate>
};

export default PrivateAdminRoutes;