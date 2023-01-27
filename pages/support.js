import React, { useRef, useState, useEffect } from 'react';
import Footer from '../components/footer/Footer';
import NewNav from '../components/navbar/NewNav';
import emailjs from '@emailjs/browser';

function Support() {
  const test = (e) => {
    e.preventDefault();
  }
  const [success, setSucces] = useState(false);
  const [show, setShow] = useState(false);
  const handleSuccess = () => setSucces(!success);

 
  
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_fv93o14', 'template_f7gbr5s', form.current, 'M2WhQQAdQKg0Ry4j2')
      .then((result) => {
        setSucces(!success);
        setTimeout(() =>{
          setSucces(success);
          e.target.reset();
        }, 2000);
        
      }, (error) => {
          console.log(error.text);
      });
      
  };
  
  return (
    <>
      <NewNav/>
      <div className='px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52 pt-16 text-[#707A83]'>
        <div>
          <div className='text-center'>
            <h1 className='text-4xl xl:text-4xl  font-bold mb-4'>Support</h1>
            <p>To send a message, please fill out the form below</p>
          </div>
          <div className='md:px-20 lg:px-32 xl:px-40 '>
            <form ref={form} onSubmit={sendEmail} className='border border-gray-300 p-8 mt-8 flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <label className='font-bold'>Name</label>
                <input type="text" name='name' placeholder='Enter your name' required className='px-6 py-4  border border-[#1E1E27] w-full mb-4  outline-none' />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-bold'>Email</label>
                <input type="email" name='email' placeholder='Enter your email' required className='px-6 py-4  border border-[#1E1E27] w-full mb-4  outline-none' />
              </div>
              <div className='flex flex-col gap-2'>
                <label className='font-bold'>Message</label>
                <textarea  type="text" placeholder='Enter your message' name='message' required  className='px-6 py-4  border border-[#1E1E27] w-full mb-4 min-h-[10rem]  outline-none' />
              </div>
              <div className='flex justify-center'><button type='submit'  className='px-16 py-4  text-xl bg-[#00FF3B] text-white'>Send</button></div>
              {!success ? (
                <div></div>
              ):(
                <p className='text-center mt-4 text-[#00FF3B]'>Message send successfuly !</p>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Support
