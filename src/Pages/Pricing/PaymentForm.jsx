import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const PaymentForm = () => {
     const [Error,setError]= useState('')
     const [clientSecret,setClientSecret]=useState('')
     const [transitionId, setTransitionId] = useState()
     const stripe = useStripe();
     const elements = useElements();
     const axiosPublic = useAxiosPublic()
    
     const {user} = useAuth()
     const price = 79;
     useEffect(()=>{
        
         axiosPublic.post('/create-payment-intent',{price})
          .then( res =>{
               console.log(res.data.clientSecret);
               setClientSecret(res.data.clientSecret)
          })
        
     },[axiosPublic,price])
     const handleSubmit = async (event) => {
          event.preventDefault();
          if (!stripe || !elements) {
               return
          }
          const card = elements.getElement(CardElement)
          if (card == null) {
               return
          }
          const { error, paymentMethod } = await stripe.createPaymentMethod({
               type: 'card',
               card
          })
          if(error){
               console.log('payment error',error);
              setError(error.message);
          }
          else{
               console.log('payment method',paymentMethod);
               setError('')
          }
          const {paymentIntent,error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
               payment_method:{
                    card:card,
                    billing_details:{
                         email: user?.email || 'anonymous',
                         name: user?.displayName || 'anonymous'
                    }
               }
          })
          if(confirmError){
               console.log('confirm error');

          }
          else{
               console.log('payment intent', paymentIntent);
               if(paymentIntent.status === 'succeeded'){
                    setTransitionId(paymentIntent.id)
                    // now save payment in database
                    const payment = {
                         email: user?.email,
                         price: 79 ,
                         transitionId: paymentIntent.id,
                         date : new Date(),
                        
                       
                    }
                    const res = await axiosPublic.post('/payments',payment)
                  

                   
                    if(res.data?.insertedId){
                        
                         Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: ` payment done successfully ` ,
                              showConfirmButton: false,
                              timer: 1500
                         }); 
                         const role = 'proUser'
                         axiosPublic.patch(`/userRoleUpdate/${user?.email}`,{role})
                         .then(res =>{
                              if(res.data.modifiedCount >0){
                                   Swal.fire({
                                        position: "top-start",
                                        icon: "success",
                                        title: ` payment done successfully ` ,
                                        showConfirmButton: false,
                                        timer: 1500
                                   });
                              }
                         })
                    }
               }
          }
     }
     return (
          <div className="pt-24">
               <form className="ml-12" onSubmit={handleSubmit}>
               <CardElement
                    options={{
                         style: {
                              base: {
                                   fontSize: '16px',
                                   color: '#424770',
                                   '::placeholder': {
                                        color: '#aab7c4',
                                   },
                              },
                              invalid: {
                                   color: '#9e2146',
                              },
                         },
                    }}
               />
               <button className="btn btn-primary btn-sm mt-3" type="submit" disabled={!stripe} >
                    Pay
               </button>
               <p className="text-red-600"> {Error} </p>
               <p className="text-green-600"> {transitionId} </p>
          </form>
          </div>
     );
};

export default PaymentForm;