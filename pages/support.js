import React from 'react'
import Footer from '../components/footer/Footer'
import NewNav from '../components/navbar/NewNav'

function Support() {
  const test = (e) => {
    e.preventDefault();
    
  }
  return (
    <>
      <NewNav/>
      <div className='px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52 pt-16 text-[#707A83]'>
        <div>
          <div className='text-center'>
            <h1 className='text-4xl xl:text-4xl  font-bold mb-4'>Support</h1>
            <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec rutrum congue leo eget malesuada.</p>
          </div>
          <div className='md:px-20 lg:px-32 xl:px-40 '>
            <form onSubmit={test} className='border border-gray-300 p-8 mt-8 flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <label className='font-bold'>Name</label>
                <input type="text" placeholder='Enter your name' className='px-6 py-4  border border-[#1E1E27] w-full mb-4  outline-none' />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-bold'>Email</label>
                <input type="text" placeholder='Enter your email' className='px-6 py-4  border border-[#1E1E27] w-full mb-4  outline-none' />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-bold'>Message</label>
                <textarea  type="text" placeholder='Enter your message' className='px-6 py-4  border border-[#1E1E27] w-full mb-4 min-h-[10rem]  outline-none' />
              </div>
              <div className='flex justify-center'><button className='px-16 py-4   text-xl bg-[#00FF3B] text-white'>Send</button></div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Support
