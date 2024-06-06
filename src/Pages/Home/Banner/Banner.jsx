import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
const Banner = () => {
     return (
          <div className=''>
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
                         <img className=' h-[600px] relative opacity-90 w-full' src="https://i.ibb.co/CszV2BH/collage-customer-experience-concept.jpg" alt="" />
                         <div className='text-center absolute -mt-[400px] '>
                              <h1 className='text-4xl w-3/4 mx-auto -mr-[100px] font-extrabold text-blue-700'>Tell Us What You Think - Take Our Survey Now </h1>
                              <button className='btn btn-outline -mr-[400px] border-b-4 btn-info uppercase text-white text-2xl font-semibold mt-5 '> Join Us  </button>
                         </div>
                    </SwiperSlide>
                    <SwiperSlide >
                         <img className=' h-[600px] relative opacity-100 w-full' src="https://i.ibb.co/mRcWrBV/planner-list-agendar-note-graphic.jpg" alt="" />
                         <div className='text-center absolute -mt-[400px] '>
                              <h1 className='text-4xl w-3/4 mx-auto -mr-[100px] font-extrabold text-blue-700'>Join the Conversation - Let Us Know How We're Doing </h1>
                              <button className='btn  -mr-[400px] border-b-4 btn-error text-white text-2xl font-semibold mt-5 '> Join Us  </button>
                         </div>
                    </SwiperSlide>
                    <SwiperSlide >
                         <img className=' h-[600px] relative opacity-100 w-full' src="https://i.ibb.co/4VY05tj/collage-customer-experience-concept-2.jpg" alt="" />
                         <div className=' ml-[100px]  w-3/5 mx-auto absolute -mt-[400px] '>
                              <h1 className='text-4xl  font-extrabold -mr-[100px] text-green-600'>Be Heard - Participate in Our Community  Feedback Survey </h1>
                              <button className='btn btn-outline  border-b-4 btn-info text-white text-2xl font-semibold mt-5 '> Join Us  </button>
                         </div>
                    </SwiperSlide>

                    {/* <SwiperSlide >
                         <img className='h-[600px] opacity-100 w-full' src="https://i.ibb.co/rQDjLHh/tiny-business-people-using-rating-site-vote-people-computer-screen-rating-site-professional-rank-sit.jpg" alt="" />
                       
                    </SwiperSlide> */}



               </Swiper>
          </div>
     );
};

export default Banner;