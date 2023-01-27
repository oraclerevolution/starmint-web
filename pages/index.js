import Head from 'next/head';
import fhome from '../public/assets/fhome.svg';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import { useEffect } from 'react';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Starmint</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <main className=' sm:h-screen h-[100%] flex flex-col  text-[#707A83]'>
        <div className='px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52 flex pt-16 items-center grow'>
          <div className='flex flex-col w-full h-full md:flex-row  justify-center relative  gap-8'>
            <div className='flex w-auto md:w-[50%]  flex-col justify-center'>
              <div className='flex flex-col gap-16'>
                <h1 className='text-8xl xl:text-[7rem] 2xl:text-[8.5rem] font-bold'>Create.</h1>
                <h1 className='text-8xl xl:text-[7rem] 2xl:text-[8.5rem] font-bold'>Share.</h1>
                <h1 className='text-8xl xl:text-[7rem] 2xl:text-[8.5rem] font-bold'>Sell.</h1>
              </div>
              <p className='text-3xl xl:text-4xl py-6 xl:leading-[4rem]'>Create NFTs for free and build unique relationships with your community.</p>
              
            </div>
            <div className='flex justify-center md:justify-end w-auto md:w-[50%] relative'>
              <img
                src="/assets/fhome.svg"
                alt="Picture of the author"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
        <Footer/>
      </main>
    </div>
  )
}
