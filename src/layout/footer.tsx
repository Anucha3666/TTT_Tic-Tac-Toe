import React from "react";

const Footer = () => {
  return (
    <div className='w-full flex flex-row items-start px-4 justify-center absolute bottom-1 gap-4'>
      <text className='text-xs border-b-2 border-[#FFFFFF00]'>
        © 2024 All rights reserved. | 36Service.
      </text>
      <text className='text-xs border-b-2 border-[#FFFFFF00] hover:border-b-2 hover:border-black cursor-pointer '>
        Contact Us
      </text>
    </div>
  );
};

export default Footer;
