
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import starmint from '../../public/assets/Starmint.svg';
import { IoMdMenu } from "react-icons/io";
import MobileStoreButton from 'react-mobile-store-button'; 

function NewNav() {
  const router = useRouter()
  const goBack = ()=> router.push("/");
  const [menu, setMenu] = useState(false);
  const handleMenu = () => setMenu(!menu);

  

  return (
    <div>
      <div className='w-full h-[100px]  static flex justify-between md:grid md:grid-cols-2 items-center  px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52   border-2 border-b-black'>
        <div onClick={goBack} className="flex justify-end  items-center cursor-pointer">
            <img
              src="/assets/Starmint.svg"
              alt="Picture of the author"
              width={170}
              height={80}
            />
        </div>
        <div className=' items-center gap-2 flex justify-end  font-bold capitalize'>
          <div>
            <h1 className='text-xl font-bold leading-6'>Coming soon <br /> on Google Play</h1>
          </div>
          <div className=' hidden md:flex justify-center items-center w-[180px]'>
            <MobileStoreButton
              store="android"
              url="https://play.google.com/store/apps?hl=fr&gl=US&pli=1"
              linkProps={{ title: 'iOS Store Button' }}
            />
          </div>
            
        </div>
      </div>
    </div>
  )
}

export default NewNav;
