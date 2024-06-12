import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import useAuth from '../../../Hooks/useAuth';
import { NavLink } from 'react-router-dom';
const Banner = () => {
     const {user} = useAuth();
     return (
          <div className=' mb-5'>
               <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                         clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
               >
                    <SwiperSlide >
                         <img className=' h-[600px]  relative opacity-90 lg:w-full' src="https://i.ibb.co/CszV2BH/collage-customer-experience-concept.jpg" alt="" />
                         <div className='text-center absolute -mt-[400px] '>
                              <h1 className='lg:text-4xl text-3xl lg:w-3/4 mx-auto lg:-mr-[100px] font-extrabold text-blue-700'>Tell Us What You Think - Take Our Survey Now </h1>
                              {
                                   user?<>
                                   <button className='btn lg:-mr-[400px] border-b-4 btn-info uppercase text-white text-2xl font-semibold mt-5 '> WelCome </button>
                                   </>: <>
                                        <NavLink to={'/login'}><button className='btn btn-outline lg:-mr-[400px] border-b-4 btn-info uppercase text-white text-2xl font-semibold mt-5 '> Join Us  </button></NavLink>
                                   </>
                              }
                         </div>
                    </SwiperSlide>
                    <SwiperSlide >
                         <img className=' h-[600px] relative opacity-100 lg:w-full' src="https://i.ibb.co/mRcWrBV/planner-list-agendar-note-graphic.jpg" alt="" />
                         <div className='text-center absolute -mt-[400px] '>
                              <h1 className='lg:text-4xl text-3xl lg:w-3/4 mx-auto lg:-mr-[100px] font-extrabold text-blue-700'>Join the Conversation - Let Us Know How We're Doing </h1>
                              {
                                   user?<>
                                   <button className='btn lg:-mr-[400px] border-b-4 btn-error uppercase text-white text-2xl font-semibold mt-5 '> WelCome </button>
                                   </>: <>
                                        <NavLink to={'/login'}><button className='btn btn-outline lg:-mr-[400px] border-b-4 btn-error uppercase text-white text-2xl font-semibold mt-5 '> Join Us  </button></NavLink>
                                   </>
                              }
                         </div>
                    </SwiperSlide>
                    <SwiperSlide >
                         <img className=' h-[600px] relative opacity-100 lg:w-full' src="https://i.ibb.co/4VY05tj/collage-customer-experience-concept-2.jpg" alt="" />
                         <div className=' lg:ml-[100px] ml-[50px]  lg:w-3/5 mx-auto absolute -mt-[400px] '>
                              <h1 className='lg:text-4xl  text-2xl font-extrabold -mr-[100px] text-green-600'>Be Heard - Participate in Our Community  Feedback Survey </h1>
                              {
                                   user?<>
                                   <button className='btn lg:-mr-[400px] border-b-4 btn-success uppercase text-white text-2xl font-semibold mt-5 '> WelCome </button>
                                   </>: <>
                                        <NavLink to={'/login'}><button className='btn btn-outline lg:-mr-[400px] border-b-4 btn-info uppercase text-white text-2xl font-semibold mt-5 '> Join Us  </button></NavLink>
                                   </>
                              }
                         </div>
                    </SwiperSlide>

                    



               </Swiper>
          </div>
     );
};

export default Banner;