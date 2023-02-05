import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import apiKit, { TOKEN_KEY } from '../../modules/http/apikit';
import auth, { register } from '../../modules/http/auth';
import { userContext } from '../../modules/context/userContext';

function RegisterPage() {
  const [name, setName] = useState('');
  const [wallet, setWallet] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState('');
  const { setUser } = useContext(userContext);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    // validation
    console.log(` le nom est:${name} `);
    console.log(` l'email' est:${email} `);
    console.log(` le password est:${password} `);
    console.log(` le password confirm est:${password} `);
    console.log(` le wallet  est:${wallet} `);
    try {
      const res = await register({
        email,
        password,
        wallet,
        name,
      });
      
      if (res.data.success) {
        const user = res.data.data;
        setUser(user); // keep user into memory
        sessionStorage.setItem(TOKEN_KEY, res.data.access_token);
        router.replace('/');
      }
    } catch (error) {
      console.log(error)
      // handle error
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
      <div className='py-8 px-8 md:px-20 flex flex-col justify-center text-center gap-8 md:flex md:w-[50%] w-[100%]'>
        <h1 className='text-5xl font-bold '>Register</h1>
        <div className='flex justify-center items-center gap-2'>
          <h4 className='font-bold'>Already an account ?</h4>
          <Link href={'/login'}><span className='text-blue-400'>Please login</span></Link>
        </div>
        <p className='text-red-400'>{msg}</p>
        <div className='flex gap-4 items-center'>
            <div className='h-[1px] w-full bg-slate-400'></div>
        </div>

        <form onSubmit={onSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Full name' className='px-6 py-4 rounded-xl border border-[#1E1E27] w-full mb-4  outline-none' />
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='E-mail adress' className='px-6 py-4 rounded-xl border border-[#1E1E27] w-full mb-4  outline-none' />
          <input value={password} onChange={(e) => setPassword(e.target.value)} pattern="[a-z0-9]{1,15}" title="Password should be digits (0 to 9) or alphabets (a to z)." type="password" placeholder='Password' className='px-6 py-4 w-full rounded-xl border border-[#1E1E27] mb-4  outline-none' />
          <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} pattern="[a-z0-9]{1,15}" title="Password should be digits (0 to 9) or alphabets (a to z)." type="password" placeholder='Confirm Password' className='px-6 py-4 w-full rounded-xl mb-4  border border-[#1E1E27] outline-none' />
          <input value={wallet} onChange={(e) => setWallet(e.target.value)} type="text" placeholder='wallet' className='px-6 py-4 rounded-xl border border-[#1E1E27] w-full mb-4  outline-none' />
  
  
   

          <p className='text-left mt-2'>At least 8 charactars, letters and numbers</p>
          <button className='px-12 py-4 bg-blue-400  text-white rounded-xl w-full mt-10 font-bold text-xl'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage;
