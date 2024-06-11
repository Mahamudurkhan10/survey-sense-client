
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";










export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
     const axiosPublic = useAxiosPublic();
     const [user, setUser]= useState(null);
     const [loading, setLoading] = useState(true)
     const googleProvider = new GoogleAuthProvider

     const googleLogin=()=>{
          setLoading(true)
          return signInWithPopup(auth,googleProvider)
     } 
     const createUser = (email, password)=>{
          setLoading(true)
          return createUserWithEmailAndPassword(auth, email,password)
     }
     const singIn = (email , password) =>{
          setLoading(true)
          return signInWithEmailAndPassword(auth, email, password)
     }
     const logOut = ()=>{
          setLoading(true)
          return signOut(auth)
     }
     const updateUserProfile = (name, photoURL)=>{
          updateProfile(auth.currentUser, {
               displayName: name, photoURL: photoURL
             })
     }
     useEffect(()=>{
          const unSubscribe = onAuthStateChanged(auth, currentUser =>{
               setUser(currentUser)
               console.log('currentUser', currentUser);
               if(currentUser){
                    // get token and store
                    const userInfo = {email: currentUser.email};
                    axiosPublic.post('/jwt',userInfo)
                    .then(res =>{
                         if(res.data.token){
                              localStorage.setItem('access-token',res.data.token);
                         }
                    })
               }
               else{
                    // remove token
                    localStorage.removeItem('access-token')
               }
               setLoading(false)
          })
          return ()=>{
               return unSubscribe();
          }
     },[])
     const authInfo = {
          user,
          loading,
          createUser,
          singIn,
          logOut,
          updateUserProfile,
          googleLogin
     }
     return (
          <AuthContext.Provider value={authInfo}>
               {children}
          </AuthContext.Provider>
     );
};

export default AuthProvider;