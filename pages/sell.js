import React, { useContext } from 'react'
import ein from '../public/assets/1.svg';
import zwei from '../public/assets/2.svg';
import drei from '../public/assets/3.svg';
import sea from '../public/assets/sea.png';
import binance from '../public/assets/binance.png';
import Footer from '../components/footer/Footer';
import Separate from '../components/separate/Separate';
import { BsArrowRight } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { userContext } from '../modules/context/userContext';
import NewNav from '../components/navbar/NewNav';

function Sell() {
  const { user } = useContext(userContext);
  return (
    <div>
      <NewNav/>
      <section className='flex h-full w-full relative py-16 text-[#707A83]'>
        <div className='px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52 flex w-full items-center '>
            <div className='flex flex-col w-[100%] h-[100%] md:flex-row  justify-center relative  md:gap-8 gap-10'>
              <div className='flex w-auto   flex-col justify-center'>
                  
                <p className='text-3xl py-6 text-[#707A83]'>List yout NTFs on multiples marketplaces</p>
                <div className='flex gap-4'>
                  <div className='px-12 py-4  rounded-2xl text-xl bg-[#00FF3B] text-white cursor-pointer flex gap-6 justify-center items-center '><p>Get start</p> <BsArrowRight className='text-2xl' /></div>
                </div>
              </div>
              <div className='flex relative justify-center md:justify-end  w-full h-full items-center'>
                <div>
                  <div className=' flex flex-col gap-8'>
                    <img
                      src='/assets/2.svg'
                      alt="Picture of the author"
                      width={500}
                      height={500}
                    />
                    <div className='flex flex-col md:flex-row gap-4 items-center justify-center'>
                    <div className='px-10 py-4  rounded-2xl text-xl bg-[#1E1E27] text-white cursor-pointer flex gap-6 justify-center items-center '>
                      <img
                        src='/assets/sea.png'
                        alt="Picture of the author"
                        objectFit= "fill"
                        width={40}
                        height={40}
                        priority
                      />
                      <p>Opensea</p>
                    </div>
                    <div className='px-10 py-4  rounded-2xl text-xl bg-[#1E1E27] text-white cursor-pointer flex gap-6 justify-center items-center '>
                      <img
                        src='/assets/binance.png'
                        alt="Picture of the author"
                        objectFit= "fill"
                        width={40}
                        height={40}
                        priority
                      />
                      <p className='text-[#F0B90B] font-bold '>BINANCE</p>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
      <Separate/>
      <section className='flex h-full w-full relative py-16 text-[#707A83]'>
        <div className='px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52 flex w-full py-16 items-center '>
            <div className='flex flex-col w-[100%] h-[100%] md:flex-row  justify-center relative  gap-8'>
              <div className='flex justify-center md:justify-start w-[100%] md:w-[50%] relative'>
                <img
                  src='/assets/2.svg'
                  alt="Picture of the author"
                  width={500}
                  height={500}
                  priority
                />
              </div>
              <div className='flex w-[100%] md:w-[50%]  flex-col justify-center'>
                <h1 className='text-6xl 2xl:text-8xl font-bold'>Your work deserve to be seen</h1>
                <p className='text-3xl py-6 '>Sell Your NTFs on both OpenSea  and Binancewhen you mint with Starmint</p>
                <div className='flex gap-4'>
                </div>
              </div>
              
            </div>
          </div>
      </section>
      <Separate/>
      <section className='flex h-full w-full relative py-16 text-[#707A83]'>
        <div className='px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52 flex w-full items-center '>
            <div className='flex flex-col w-full h-[100%] md:flex-row  justify-center relative md:gap-8 gap-10'>
              <div className='flex w-full md:min-w-[50%]  flex-col justify-center '>
                <div className='flex flex-col gap-16'>
                  <div className='flex gap-14 text-3xl justify-center items-center'><GiCheckMark className="text-5xl md:text-3xl text-[#00FF3B]" /><p>Easily list your creations on popular marketplaces</p></div>
                  <div className='flex gap-14 text-3xl justify-center items-center'><GiCheckMark className="text-5xl md:text-3xl text-[#00FF3B]" /><p>Tap into or growing and enthusiastic collect or community</p></div>
                  <div className='flex gap-14 text-3xl justify-center items-center'><GiCheckMark className="text-5xl md:text-3xl text-[#00FF3B]" /><p>Keep full control of where And how you want to sell</p></div>

                </div>
                <div className='flex gap-4 mt-12'>
                  <div className='px-12 py-4  rounded-2xl text-xl bg-[#00FF3B] text-white cursor-pointer flex gap-6 justify-center items-center '><p>Get start</p> <BsArrowRight className='text-2xl' /></div>
                </div>
              </div>
              <div className='flex relative flex-col gap-8 w-[100%] h-[100%] items-center '>
                <div className=' flex justify-center relative '>
                  <img
                    src='/assets/3.svg'
                    alt="Picture of the author"
                    width={600}
                    height={600}
                    priority
                  />
                </div>
                <div className='flex flex-col md:flex-row gap-4 items-center justify-center'>
                  <div className='px-10 py-4  rounded-2xl text-xl border-2 border-[#1E1E27]  font-bold cursor-pointer flex gap-6 justify-center items-center '>
                    <img
                      src='/assets/sea.png'
                      alt="Picture of the author"
                      objectFit= "fill"
                      width={40}
                      height={40}
                      priority
                    />
                    <p>Sell to Opensea</p>
                  </div>
                  <div className='px-10 py-4  rounded-2xl text-xl border-2 border-[#1E1E27] cursor-pointer flex gap-6 justify-center items-center '>
                    <img
                      src='/assets/binance.png'
                      alt="Picture of the author"
                      objectFit= "fill"
                      width={40}
                      height={40}
                      priority
                    />
                    <p className=' font-bold '>Sell to Binance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
      <Footer />
    </div>
    
  )
}

// const SellPage = () => (
//   <Firewall>
//     <Sell/>
//   </Firewall>
// );

export default Sell;
