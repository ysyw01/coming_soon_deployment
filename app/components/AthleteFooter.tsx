"use client";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import ContactForm from "./ContactForm";

export default function AthleteFooter() {
  return (
    <div id="footer" className="  overflow-x-hidden bg-black">
      {/* Skewed Background */}
      

      {/* Content Wrapper (Moved to Bottom) */}
      <div className="relative z-10  mx-auto flex flex-col justify-end h-full">
        <div className="flex flex-col md:flex-row justify-between items-center  px-20">
        
          
        <div className="flex md:flex-row flex-col mt-32 md:space-x-7 items-center md:items-end justify-end">  
          {/* <div className="bg-lightPrimary rounded-full p-20">
            <span>YSYW</span>
          </div> */}
           <div className="flex md:flex-col  text-lg text-white mt-4 md:mt-0">
  {[FaInstagram, FaTwitter, FaLinkedin, FaFacebook].map((Icon, index) => (
    <div
      key={index}
      className="p-3 rounded-full bg-transparent hover:bg-lightPrimary transition duration-300 ease-in-out"
    >
      <Icon className="cursor-pointer text-white hover:text-white" />
    </div>
  ))}
</div>
<ul className="overflow-hidden flex-col items-start justify-end mt-4 md:mt-0 text-4xl md:text-lg cursor-pointer font-bruno text-white flex ">
             <button onClick={() => window.location.href = "/about"}>
               <li className="text-4xl font-bold text-center md:text-left text-gray-400 hover:text-white duration-200">About Us</li>
             </button>
             <button onClick={() => window.location.href = "/athlete"}>
               <li className="text-4xl font-bold text-center md:text-left text-gray-400 hover:text-white duration-200">Talents</li>
             </button>
              <button onClick={() => window.location.href = "/adv"}>
                <li className="text-4xl font-bold text-center md:text-left text-gray-400 hover:text-white duration-200">Advertise</li>
              </button>
              
            </ul>
        </div>
         

<div className=" flex items-center space-x-4">
           
            
            <ContactForm/>
          </div>

        </div>

        {/* Copyright and CTA */}
        <div className="text-center text-xs text-white opacity-75 mt-4 select-none ">
          Copyright &copy; 2025 YourSportYourWord.   <br/>All rights reserved.
        </div>
        <div className="bg-lightPrimary  text-white text-center py-3 mt-6 underline font-semibold w-screen px-0 cursor-pointer ">
          GET IN TOUCH WITH US
        </div>
      </div>
    </div>
  );
}
