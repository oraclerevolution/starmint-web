import Link from 'next/link';
import React, { useState, useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/router';
import { login } from '../../modules/http/auth';
import { userContext } from '../../modules/context/userContext';
import { TOKEN_KEY } from '../../modules/http/apikit';
import { SpinningCircles } from 'react-loading-icons';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleLoad = () =>setIsLoad(!isLoad);
  const router = useRouter();
  const { setUser } = useContext(userContext);


  const onSubmit = async (e) => {
    
    e.preventDefault();
    handleLoad();
    // validation
    console.log(` l'email' est:${email} `);
    console.log(` le password est:${password} `);
    try {
      const res = await login({email, password})
      
      if (res.data.success) {
        const user = res.data.data;
        setUser (user); // keep user into memory
        sessionStorage.setItem(TOKEN_KEY, res.data.access_token);
        router.replace('/');
      }
    } catch (error) {
      console.log(error);
      setIsLoad(false)
      setTimeout(() => {
        setIsError(!isError);
      }, 1000);
      setIsError(isError);
    }
    
  }


  return (
    <div className='md:flex md:flex-row h-screen  overflow-y-hidden'>
      <div className='bg-blue-400 px-20 py-14 md:flex-col hidden md:flex md:w-[50%] w-[100%]'>
        <div className="lex justify-between  items-center cursor-pointer">
            <img
              src="/assets/starmit.png"
              alt="Picture of the author"
              width={170}
              height={80}
            />
        </div>
        <div className='h-full flex justify-center items-center w-full relative mt-20'>
          <img
            src='/assets/multi.png'
            alt="Picture of the author"
            objectFit= "cover"
            fill
            priority
          />
        </div>
      </div>
      
      {isLoad ? (
        <div className='py-8 px-8 md:px-20 flex flex-col justify-center items-center text-center gap-8 md:flex md:w-[50%] w-[100%] bg-black '>
          <div className="cursor-pointer">
              <img
                src="/assets/starmit.png"
                alt="Picture of the author"
                width={370}
                height={80}
              />
          </div>
          <p className='text-3xl py-6 text-[#707A83]'>Create and Sell NFTs to your community</p>

          <SpinningCircles stroke='#215BF0' fill='#215BF0' />
        </div>
      ): (
        <div className='py-8 px-8 md:px-20 flex flex-col justify-center text-center gap-8 md:flex md:w-[50%] w-[100%] '>
          <h1 className='text-5xl font-bold '>Login</h1>
          <div className='flex justify-center items-center gap-2'>
            <h4 className='font-bold'>Not a member ?</h4>
            <Link href='/login/register'>
              <span className='text-blue-400'>Please register</span>
            </Link>
          </div>

          <div className='flex flex-col py-1 sm:flex-row gap-4 justify-center '>
            <div className='px-8 rounded-full  text-black cursor-pointer border border-black flex justify-center items-center gap-4 h-12'> 
              <img
                src='/assets/metamask.svg'
                alt="Picture of the author"
                objectFit= "cover"
                width={30}
                priority
              />
              <p className='font-bold'>METAMASK</p>
            </div>
            <div className='px-8 py-1 rounded-full  text-black cursor-pointer border border-black flex justify-center items-center gap-4 h-12'>
              <FcGoogle className='text-[30px] '/>
              <p>login with Google</p>
            </div>
          </div>

          <div className='flex gap-4 items-center'>
              <div className='h-[1px] w-full bg-slate-400'></div>Or <div className='h-[1px] w-full bg-slate-400'></div>
          </div>
          {isError ? (
            <p className='text-red-400 transition-all'>L &apos; adresse email ou le mot de passe est incorrect !</p>
          ) : (
            <></>
          )
          }
          <form onSubmit={onSubmit}>
            <input 
              onChange={(e) => {
                setEmail(e.target.value);
              }} 
              value={email}
              type="email" 
              placeholder='E-mail adress' 
              className='px-6 py-4 rounded-xl border border-[#1E1E27] w-full mb-4  outline-none' required />
            <input 
            onChange={(e) => {
              setPassword(e.target.value);
            }} 
            value={password}
            type="password" placeholder='Password' className='px-6 py-4  rounded-xl border border-[#1E1E27] w-full  outline-none' required/>
            <p className='text-left mt-2'>At least 8 charactars, letters and numbers</p>
            <button className='px-12 py-4 bg-blue-400  text-white rounded-xl w-full mt-10 font-bold text-xl' >Connect</button>
            
            <Link href={'/login/forgetpassword'}><p className='font-bold text-blue-400 mt-8'>Forgot your password ?</p></Link>
          </form>
        </div>
      )
      }
    </div>
  );
}

export default Login;
