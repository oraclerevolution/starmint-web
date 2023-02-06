import React from 'react'
import Footer from '../components/footer/Footer';
import NewNav from '../components/navbar/NewNav';

function About() {
  return (
    <>
      <NewNav/>
      <div className='px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52 pt-16 text-[#707A83]'>
        <h1 className='text-4xl xl:text-4xl  font-bold text-center'>About</h1>
        <div className='mt-12 flex flex-col text-2xl gap-6'>
          <p>Starmint is an image and video creation app designed for the NFT creators.
            We offer Web3 solutions to allow users to create Video, Photo and Audio NFTs,
            either instantly or from their existing files.
          </p>
          <p>
            Unlike most projects that only stay in the white paper,
            our team is always focused on R&D, and the product goes first. 
            As a technology and design-driven team, we have developed a minting engine that
            enables users to mint all types of files and create NFTs on Ethereum and Polygon.
          </p>
          <p> Our company is located in Paris, France.</p>
          <p> Here are our coordinates :</p>
          <div className='flex flex-col font-bold gap-4'>
            <p>STARMINT SAS</p>
            <p>14 rue de Rome</p>
            <p>75008 Paris</p>
            <p>921 770 491 R.C.S. Paris</p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default About;
