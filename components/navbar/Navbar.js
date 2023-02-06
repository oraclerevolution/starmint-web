import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import starmint from '../../public/assets/Starmint.svg';
import { IoMdMenu } from "react-icons/io";
import MobileStoreButton from 'react-mobile-store-button'
import { userContext } from '../../modules/context/userContext';
import { loggout } from '../../modules/http/auth';

function Navbar() {
  const router = useRouter()
  const goBack = ()=> router.push("/");
  const [menu, setMenu] = useState(false);
  const handleMenu = () => setMenu(!menu);
  const { user } = useContext(userContext);

  const onLogout = () => {
    router.replace('/login');
    loggout();
  }
  
  return (
    <div>
      <div className='w-full h-[100px]  static  flex justify-between items-center  px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52   border-2 border-b-black'>
        <div onClick={goBack} className="lex justify-between  items-center cursor-pointer">
            <img
              src="/assets/Starmint.svg"
              alt="Picture of the author"
              width={170}
              height={80}
            />
            {/* <h1 className='  font-bold text-3xl dark:text-white text-black'>Starmint</h1> */}
        </div>
        <div className=' items-center gap-10  text-black md:flex hidden font-bold capitalize'>
          <Link className=' cursor-pointer' href={'/create'}>Create</Link>
          <Link className=' cursor-pointer' href={'/sell'}>Sell</Link>
          {!user ? <Link className=' cursor-pointer' href={'/login'}>Se connecter</Link> : 
          <>
            <Link className=' cursor-pointer' href={'/login'}>Se déconnecter</Link>
          </>}
          <MobileStoreButton
            store="android"
            url="https://play.google.com/store/apps?hl=fr&gl=US&pli=1q"
            linkProps={{ title: 'iOS Store Button' }}
          />
            
        </div>
        <IoMdMenu className='text-3xl flex md:hidden' onClick={handleMenu}/>
        
      </div>

      <div>
          {menu ?
            <div className='flex absolute z-10  w-full h-auto  bg-black pt-[3rem] mt-[-3px] p-6'>
              {user ? (
                <div className=' gap-6  text-white flex flex-col font-bold capitalize'>
                  <Link className=' cursor-pointer' href={'/create'}>Create</Link>
                  <Link className=' cursor-pointer' href={'/sell'}>Sell</Link>
                  <Link className=' cursor-pointer' href={'/ode'}>ODE</Link>
                  <button onClick={onLogout} className='px-6 py-2 bg-white text-blue-400 rounded-xl'>Log out</button>
                </div>
              ) : (
                <div className=' gap-6  text-white flex flex-col font-bold capitalize'>
                  <Link className=' cursor-pointer' href={'/login'}>Se connecter</Link>
                  <Link className=' cursor-pointer' href={'/register'}><button className='px-6 py-2 bg-white text-blue-400 rounded-xl'>Inscription</button></Link>
                </div>
              )}
            </div> 
            : 
            <div></div>
          }
        </div>
    </div>
  )
}

export default Navbar;
