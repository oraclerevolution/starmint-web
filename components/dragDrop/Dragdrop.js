import React, { useRef, useState } from 'react';

function Dragdrop() {
  const [imageInfo, setImageInfo] = useState();
  const inputRef = useRef();

  const handleDragOver = (event) =>{
    event.preventDefault();
    
  };
  const handleDrop = (event) =>{
    event.preventDefault();
  };
  // const handleChange =(event) =>{
  //   event.preventDefault();
  //   setImageInfo({
  //     ...imageInfo,
  //     file:event.target.i
  //   })
  // }
  return (
    <>
      {inputRef ? 
        <div 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className='h-[20rem] bg-gray-100 rounded-3xl flex flex-col justify-center items-center gap-2 text-2xl'>
            <h1>Drag and Drop File to Upload</h1>
            <p className='text-[#707A83]'>Or</p>
            <input type="file" onChange={(event) => setImageInfo(event.target.file)} hidden  ref={inputRef} />
            <button onClick={() => inputRef.current.click()} className='px-12 py-4  rounded-2xl text-xl bg-gray-400 text-white cursor-pointer '>Select files</button>
        </div> : 
        <div className='h-[20rem] bg-gray-100 rounded-3xl flex flex-col justify-center items-center gap-2 text-2xl'>

        </div>

      }
    </>
  )
}

export default Dragdrop
