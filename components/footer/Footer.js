import React from 'react';
import Link from 'next/link';

function Footer() {
  return (
    <div className='px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52 py-9 bg-[#000000] flex text-xl text-white items-center mt-20'>
      
      <div className='flex flex-col md:flex-row w-full md:justify-center md:items-center gap-6  items-center'>
        <h1>&#169;2022 Starmint</h1>
        <div className='w-2 h-2 bg-white rounded-full'></div>
        <Link className=' cursor-pointer' href={'/support'}>Support</Link>
        <div className='w-2 h-2 bg-white rounded-full'></div>
        <Link className=' cursor-pointer' href={'/about'}>About</Link>
        <div className='w-2 h-2 bg-white rounded-full'></div>
        <Link className=' cursor-pointer' href={'/terms'}>Terms of use</Link>
        <div className='w-2 h-2 bg-white rounded-full'></div>
        <Link className=' cursor-pointer' href={'/privacy'}>Privacy policy</Link>
      </div>
    </div>
  )
}

export default Footer;
