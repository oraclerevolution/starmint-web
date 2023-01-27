import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import multi from '../../public/assets/multi.png';
import starmint1 from '../../public/assets/starmit.png';

function Forgetpassword() {
  const router = useRouter()
  const goBack = ()=> router.push("/login");
  return (
    <div className='flex justify-between md:flex md:flex-row flex-col h-screen  overflow-y-hidden'>
      <div className='bg-blue-400 p-20 py-14 md:flex-col hidden md:flex md:w-[50%] w-[100%] '>
        <div onClick={goBack} className="lex justify-between  items-center cursor-pointer">
          <img
            src='/assets/starmit.png'
            alt="Picture of the author"
            width={170}
            height={80}
          />
        </div>
        <div className='h-full relative mt-20'>
          <img
            src='/assets/multi.png'
            alt="Picture of the author"
            objectFit= "cover"
            fill
            priority
          />
        </div>
      </div>
      
      <div className='py-8 px-8 md:px-20 flex  h-full justify-center items-center flex-col text-center gap-8 md:w-[50%] w-[100%]'>
        <h1 className='text-4xl md:text-5xl font-bold '>Recover your password</h1>

        <form>
          <input type="password" placeholder='Password' className='px-8 py-4 rounded-full bg-slate-100 w-full  outline-none' />
          <Link href={'/'}><button className='px-12 py-4 bg-blue-400  text-white rounded-full w-full mt-10 font-bold text-xl'>Recover</button></Link>
          <Link href={'/login'}><p className='font-bold text-blue-400 mt-8'>Login</p></Link>
        </form>
      </div>
    </div>
  )
}

export default Forgetpassword;
