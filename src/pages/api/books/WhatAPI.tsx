import Image from "next/image";
import myimg from "public/robot.jpg";


export default function WhatAPI () {    
    return (
    <section className='max-w-screen-2xl mx auto px-4' >

    <div className='flex flex-col md:flex-row mt-9  '>
      {/* Left side */}
      <div className='flex-1'>
        
        <h1 className='text-4xl  sm:text-5xl font-bold text-[#ffffff] '>RestBookApi</h1>
        <p className='mt-6 text-xl text-[#ffffff]'> REST API that allows you to reserve a book. This API is fully functional with SQL calls to Neon Database</p>
     
        </div>

         {/* Right side */}
         <div className='flex-1'>
          <Image src={myimg} alt="Web3" className={"border-none"}></Image>
        </div>
        </div>

         
      
        </section>
)
}