import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import useSurveys from "../../Hooks/useSurveys";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
import SurveyTab from "./SurveyTab";
import 'react-tabs/style/react-tabs.css';
import { TbUTurnLeft } from "react-icons/tb";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet";

const Survey = () => {
     const [asc,setAsc] = useState(true)
     const {user} = useAuth()
     const categories = ['Employee Engagement', 'Customer Satisfaction', 'Product Feedback', 'Training and Development', 'Health and Wellness', 'Work-Life Balance']
     const { category } = useParams();
     const initialIndex = categories.indexOf(category)
     const [tabIndex, setTabIndex] = useState(initialIndex)
     const [survey,,refetch] = useSurveys(asc)
     const Employee = survey.filter(item => item.category === 'Employee Engagement')
     const Satisfaction = survey.filter(item => item.category === 'Customer Satisfaction')
     const Feedback = survey.filter(item => item.category === 'Product Feedback')
     const Training = survey.filter(item => item.category === 'Training and Development')
     const Health = survey.filter(item => item.category === 'Health and Wellness')
     const Work = survey.filter(item => item.category === 'Work-Life Balance')

     return (
          <div className="">
               
               <div>
               <Helmet>
                    <title> Survey </title>
               </Helmet>
                    <div className="mb-5">
                         <div className="hero h-[550px]" style={{ opacity: 90, backgroundImage: 'url(https://i.ibb.co/HP9cSJF/customer-experience-creative-collage.jpg)' }}>
                              <div className="hero-overlay bg-opacity-60"></div>
                              <div className="hero-content text-center text-neutral-content">
                                   <div className="max-w-md">
                                        <h1 className="mb-5 text-sky-300 text-5xl font-bold uppercase"> Surveys Here </h1>
                                        <p className="mb-5">We value your feedback and would love to hear your thoughts.
                                             Please take a moment to complete our brief survey.</p>
                                             {
                                   user?<>
                                   <button className='btn lg:-mr-[100px] border-b-4 btn-success uppercase text-white text-2xl font-semibold mt-5 '> WelCome </button>
                                   </>: <>
                                        <NavLink to={'/login'}><button className='btn btn-outline lg:-mr-[400px] border-b-4 btn-info uppercase text-white text-2xl font-semibold mt-5 '> Join Us  </button></NavLink>
                                   </>
                              }
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="text-center">
                         <h1 className=" lg:text-4xl text-3xl font-bold uppercase text-blue-900 mb-5 "> All Surveys Are here </h1>
                         <p className="lg:w-3/5 font-medium text-sm mx-auto text-center "> Exciting news! A new survey card is now available, offering fresh opportunities to share your opinions and shape the future. Don't miss out on this chance to make your voice heard! </p>
                    </div>
                    <div className="divider divider-info"></div>
               </div>


               <div >
                    <div>
                         <button className="btn btn-success text-white font-semibold" onClick={()=>setAsc(!asc)}> <span className="text-sm font-semibold text-yellow-700">  Vote: </span>
                              {asc?'low to high':'high to low'} 
                         </button>
                    </div>
                    <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                         <TabList className={'grid grid-cols-2 lg:grid-cols-6 text-xs lg:text-[17px] gap-4 justify-between font-semibold p-3 text-blue-500'}>
                              <Tab >Employee Engagement</Tab>
                              <Tab>Customer Satisfaction</Tab>
                              <Tab>Product Feedback </Tab>
                              <Tab>Training and Development</Tab>
                              <Tab>Health and Wellness</Tab>
                              <Tab>Work-Life Balance</Tab>

                         </TabList>
                         <TabPanel>
                              <SurveyTab refetch={refetch} survey={Employee}></SurveyTab>
                         </TabPanel>
                         <TabPanel>
                              <SurveyTab refetch={refetch}  survey={Satisfaction}></SurveyTab>
                         </TabPanel>
                         <TabPanel>
                              <SurveyTab refetch={refetch}  survey={Feedback}></SurveyTab>
                         </TabPanel>
                         <TabPanel>
                              <SurveyTab refetch={refetch}  survey={Training}></SurveyTab>
                         </TabPanel>
                         <TabPanel>
                              <SurveyTab refetch={refetch}  survey={Health}></SurveyTab>
                         </TabPanel>
                         <TabPanel>
                              <SurveyTab refetch={refetch}  survey={Work}></SurveyTab>
                         </TabPanel>
                    </Tabs>
               </div>
          </div>


     );
};

export default Survey;