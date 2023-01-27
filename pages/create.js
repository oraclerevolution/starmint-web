import React, { useState, useRef, useEffect } from 'react'
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import { addNft } from '../modules/http/auth';
import { SpinningCircles } from 'react-loading-icons';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FiShare2 } from "react-icons/fi";
import Link from 'next/link';
import Firewall from '../components/Firewall';

import * as IPFS from 'ipfs-core';
const alchemyKey = 'https://polygon-mumbai.g.alchemy.com/v2/cKqvCVWlvMFmkSDuz29QYTCYD3chOp7g';
const alchemyEthKey = "https://eth-goerli.g.alchemy.com/v2/h3oHmjZqNDD7Vof9LGzvVm4M3XYX5fYs"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const web3Eth = createAlchemyWeb3(alchemyEthKey)
const contractEthArtifact = require('../pages/artifacts/contracts/StarmintEth.sol/StarmintEth.json')
const contractArtifacts = require('../pages/artifacts/contracts/Starmint.sol/Starmint.json')
const contractABI = contractArtifacts.abi
const contractEthAbi = contractEthArtifact.abi
const contractAddress = "0xC50e097Fe636908a8a5C1117d40E23F9875cb28A"
const contractAdressEth = "0x85B1e0120db34e5f8395F0c04BdA26CF4767c4f4"

import { connectWallet, getCurrentWalletConnected } from '../utils/interact';
import { pinJSONToIPFS } from '../utils/pinata';

function Create() {
  const [image, setImage] = useState({preview: "", raw: ""});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [buttonText, setButtonText] = useState("Mint NFT");
  const [imageInfo, setImageInfo] = useState();
  const [txHash, setTxHash] = useState('')
  const inputRef = useRef();
  const [blockchain, setBlockchain] = useState('polygon');
  const [active, setActive] = useState(false);
  const handleActive = () => setActive(!active);

  const [isLoad, setIsLoad] = useState(false);
  const handleLoad = () =>setIsLoad(!isLoad);
  const [isSuccess, setIsSuccess] = useState(false);

  const file = image.preview;

  const activePolygon = () =>{
    setActive(false);
    setBlockchain("polygon");
  }
  const activeEtherium = () =>{
    setActive(true);
    setBlockchain("etherium");
  }

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "GET",
      headers: {
        "File": "multipart/form-data"
      },
      body: formData
    });
  };

  const uploadFileToIPFS = async() => {
    const ipfs = await IPFS.create();
    const fileAdded = await ipfs.add(image.raw)
    console.log("fileAdded", fileAdded);
    return fileAdded
  }

  const connectWalletPressed = async () => { 
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
  };

  const alreadyConnect = async() => {
    const {address, status} = await getCurrentWalletConnected()
    setWallet(address)
    setStatus(status)
  }

  const handleChangeName = (event) => {
    // 👇 Get input value from "event"
    setTitle(event.target.value);
  };

  const handleChangeDescription = (event) => {
    // 👇 Get input value from "event"
    setDescription(event.target.value);
  };

  const onMintPressed = async(name, description) => {
    //error handling
    /* if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) {
      return {
        success: false,
        status: "❗Please make sure all fields are completed before minting.",
      }
    } */

    setButtonDisable(true)
    setButtonText('Please wait ...')

    //upload file on ipfs
    const uploadFile = await uploadFileToIPFS()

    //make construction of metadata
    const metadata = {
      name:title,
      image: uploadFile.path,
      description
    };

    //make pinata call
    const pinataResponse = await pinJSONToIPFS(metadata);
    if(!pinataResponse.success){
      return {
        success: false,
        status: "😢 Something went wrong while uploading your tokenURI.",
      }
    }
    const tokenURI = pinataResponse.pinataUrl;
    console.log('tokenURI', tokenURI)
    //load the smart contract
    const contrat = await new web3.eth.Contract(contractABI, contractAddress)
    const contractData = contrat.methods.mint(walletAddress, tokenURI, quantity, []).encodeABI()

    let txObj = {
      "to": contractAddress,
      "from": walletAddress,
      "data": contractData,
    }

    //sign transaction via metamask
    try {
      const txHash = await window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [txObj],
          });
          setTxHash(txHash)
          try {
            const res = await addNft({
              file,
              title,
              description,
              quantity,
              blockchain,
            });
            
            if (res.data.success) {
              console.log("NFT stored successfully !")
              // setIsSuccess(true);
              setTimeout(() => {
                setIsSuccess(true);
              }, 1000);
              setIsLoad(!isLoad);
            }
          } catch (error) {
            console.log("erreur de base de données",error)
            // handle error
          }
          // setStatus(`✅ Check out your transaction on Polygonscan: https://mumbai.polygonscan.com/tx/${txHash}`)
    } catch (error) {
      if(error.message === "MetaMask Tx Signature: User denied transaction signature."){
        setStatus(`😥 Désolé: Vous avez refusez la signature de la transaction. Veuillez recommencer s'il vous plait !`)
        setButtonDisable(false)
        setButtonText('Mint NFT')
      }else{
        setStatus(`😥 Something went wrong: ${error.message}`)
        setButtonDisable(false)
        setButtonText('Mint NFT')
      }
    }
  };

  const onMintPressedEth = async(name, description) => {
    //error handling
    /* if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) {
      return {
        success: false,
        status: "❗Please make sure all fields are completed before minting.",
      }
    } */

    setButtonDisable(true)
    setButtonText('Please wait ...')

    //upload file on ipfs
    const uploadFile = await uploadFileToIPFS()

    //make construction of metadata
    const metadata = {
      name:title,
      image: uploadFile.path,
      description
    };

    //make pinata call
    const pinataResponse = await pinJSONToIPFS(metadata);
    if(!pinataResponse.success){
      return {
        success: false,
        status: "😢 Something went wrong while uploading your tokenURI.",
      }
    }
    const tokenURI = pinataResponse.pinataUrl;
    console.log('tokenURI', tokenURI)
    //load the smart contract
    const contrat = await new web3Eth.eth.Contract(contractEthAbi, contractAdressEth)
    const contractData = contrat.methods.mint(walletAddress, tokenURI, quantity, []).encodeABI()

    let txObj = {
      "to": contractAdressEth,
      "from": walletAddress,
      "data": contractData,
    }

    //sign transaction via metamask
    try {
      const txHash = await window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [txObj],
          });
          setTxHash(txHash)
          try {
            const res = await addNft({
              file,
              title,
              description,
              quantity,
              blockchain,
            });
            
            if (res.data.success) {
              console.log("NFT stored successfully !")
              // setIsSuccess(true);
              setTimeout(() => {
                setIsSuccess(true);
              }, 1000);
              setIsLoad(!isLoad);
            }
          } catch (error) {
            console.log("erreur de base de données",error)
            // handle error
          }
          // setStatus(`✅ Check out your transaction on Polygonscan: https://mumbai.polygonscan.com/tx/${txHash}`)
    } catch (error) {
      if(error.message === "MetaMask Tx Signature: User denied transaction signature."){
        setStatus(`😥 Désolé: Vous avez refusez la signature de la transaction. Veuillez recommencer s'il vous plait !`)
        setButtonDisable(false)
        setButtonText('Mint NFT')
      }else{
        setStatus(`😥 Something went wrong: ${error.message}`)
        setButtonDisable(false)
        setButtonText('Mint NFT')
      }
    }
  };

  const minToken = (network) => {
    if(network == 'polygon'){
      console.log(network);
      onMintPressed(title,description)
    }else if(network == 'etherium'){
      console.log(network);
      onMintPressedEth(title,description)
    }
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus(`👆🏽 Connecté: ${String(accounts[0]).substring(0, 6)}...${String(accounts[0]).substring(38)}`);
        } else {
          setWallet("");
          setStatus("🦊 Connectez votre portefeuille en cliquant sur le bouton ci-dessus.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  useEffect(() => {
    alreadyConnect()
    addWalletListener()
  })

  const createNft = async (e) =>{
    e.preventDefault();
    handleLoad();
    console.log(` le titre est:${title} `);
    console.log(` le lien de l'image' est:${image.preview} `);
    console.log(` la description est:${description} `);
    console.log(` la quantité est:${quantity} `);
    console.log(` la blockchain  est:${blockchain} `);
    if(title === undefined | null){
      handleLoad();
    }
    try {
      const res = await addNft({
        file,
        title,
        description,
        quantity,
        blockchain,
      });
      
      if (res.data.success) {
        console.log("Enregistrement success !")
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(true);
        }, 1000);
        setIsLoad(!isLoad);
      }
    } catch (error) {
      console.log(error)
      // handle error
    }
  }

  return (
    <div>
      <Navbar/>
      <main className='px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52 pt-16'>

        {!isLoad && (
          <div className='md:px-20 lg:px-32 xl:px-40 2xl:px-52 '>
            <div className='text-[#707A83]'>
              <h1 className='text-4xl capitalize font-bold mb-4'>Create new item</h1>
              <p>image, video or audio files</p>
            </div>
            <form>
              <div className='mt-10'>
                <div>
                  
                  <div className=' gap-2 '>
                    <label htmlFor="upload-button">
                      {image.preview ? (
                        <div className=' h-[20rem] relative rounded-xl flex  justify-center items-center'>
                          <img src={image.preview} alt="dummy"  className='w-full h-full rounded-xl bg-contain bg-center max-h-[20rem] max-w-[20rem] '  />
                        </div>
                      ) : (
                        <div className=' text-xl  h-[20rem] text-[#707A83] border-[#707A83] rounded-xl flex flex-col justify-center items-center border-2 border-dashed'>
                          <div clas></div>
                          <p>Supported Types : JPG, PNG, GIF, SVG, MP4, MP3, WMV</p>
                          <p>Maximum size : 100 Mo</p>
                        </div>
                      )}
                    </label>
                    <input
                      type="file"
                      id="upload-button"
                      onChange={handleChange}
                      className="hidden"
                      required
                    />
                  </div>
                </div>
                
              </div>
              <div className='flex flex-col gap-4 mt-10'>
                <div>
                  <h1 className='text-xl mb-2'>Title</h1>
                  <input value={title} onChange={(e) => setTitle(e.target.value)}  required  type="text" placeholder='Item mane' className='px-6 py-4 rounded-xl border border-[#1E1E27]   w-full  outline-none' />
                </div>
                <div>
                  <h1 className='text-xl mb-2'>Description</h1>
                  <textarea required value={description} onChange={(e) => setDescription(e.target.value)}  type="text-area"  className='px-6 py-4 rounded-xl border border-[#1E1E27] w-full  outline-none h-[10rem] resize-none' />
                </div>
                <div>
                  <h1 className='text-xl mb-2'>Quantity</h1>
                  <input required value={quantity} disabled onChange={(e) => setQuantity(e.target.value)}  type="number"  className='px-6 py-4 rounded-xl border border-[#1E1E27]   w-full  outline-none' />
                </div>
                <div className='mt-8'>
                  <div>
                    <h1 className='text-4xl capitalize font-bold text-[#707A83] mb-4'>Blockchain </h1>
                    <p className='text-xl'>On Ethereum, you pay the minning costs. On Polygon, costs are covered by starmint</p>
                  </div>
                  <div className='mt-10 flex md:flex-row flex-col gap-6 md:justify-between '>
                    <div className='flex flex-col gap-4 items-center'>
                      <div onClick={activePolygon} className={active ? 'border border-black w-[16rem] md:w-[20rem] cursor-pointer': 'cursor-pointer border border-[#00FF3B] w-[16rem] md:w-[20rem]'}>
                        <div className={active ? 'h-[6rem] bg-black': 'h-[6rem] bg-[#00FF3B]'}></div>
                        <div className='flex justify-center items-center p-8 relative'>
                          <img
                            src="/assets/poly.svg"
                            alt="Picture of the author"
                            width={120}
                            height={120}
                            priority
                            value={blockchain} onChange={(e) => setBlockchain(e.target.value)} 
                          />
                          
                        </div>
                      </div>
                      <h1 className='text-2xl capitalize font-bold text-black mb-4'>Free gas fees</h1>
                    </div>
                    <div className='flex flex-col gap-4 items-center'>
                      <div onClick={activeEtherium} className={!active ? 'border border-black w-[16rem] md:w-[20rem] cursor-pointer': 'cursor-pointer border border-[#00FF3B] w-[16rem] md:w-[20rem]'}>
                        <div className={!active ? 'h-[6rem] bg-black': 'h-[6rem] bg-[#00FF3B]'}></div>
                        <div className='flex  justify-center items-center p-8'>
                          <img
                            src="/assets/ete.svg"
                            alt="Picture of the author"
                            width={120}
                            height={120}
                            priority
                            value={blockchain} onChange={(e) => setBlockchain(e.target.value)} 
                          />
                        </div>
                      </div>
                      <h1 className='text-2xl capitalize font-bold text-black mb-4 text-center'>Gas fees at your expense</h1>
                    </div>
                  </div>
                </div>
                <div className='flex justify-center mt-8'>
                {walletAddress == "" ?(
                  <button className='px-16 py-4  rounded-2xl text-xl bg-[#00FF3B] text-white' type='button' onClick={connectWalletPressed}>
                    <span>Connect Wallet</span>
                  </button>
                ):(
                  <button type='button' disabled={buttonDisable} className='px-16 py-4  rounded-2xl text-xl bg-[#00FF3B] text-white' onClick={() => onMintPressed(title, description)}>
                    <span>{buttonText}</span>
                  </button>
                )}
              </div>
              <p style={{textAlign:"center"}}>{status}</p>
              </div>
            </form>
          </div>
        )}
        {isLoad ? (
          <div className='px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52 py-16 bg-black text-white rounded-xl'>
            {isSuccess ? (
              <div className='flex flex-col justify-center items-center text-center'>
                <IoIosCheckmarkCircle className="text-8xl text-[#00FF3B] "/>
                <p className='text-3xl mt-6'>Your NFT has been created successfully !</p>
                <p className='text-2xl my-6'>{title}</p>
                <div className=' h-[20rem] relative rounded-xl flex  justify-center items-center'>
                  <img src={image.preview} alt="dummy"  className='w-full h-full rounded-xl bg-contain bg-center max-h-[20rem] max-w-[20rem] '  />
                </div>
                <div className='text-center'>
                  <p className='text-2xl my-6'>Contract adress : {contractAddress}</p>
                  <p className='text-2xl my-6'>Token ID : {title}</p>
                  <p className='text-2xl my-6'>Blockchain : {blockchain}</p>
                  {blockchain == "polygon" ? (
                    <p className='text-1xl my-6'>✅ Check out your transaction on Polygonscan explorer: https://mumbai.polygonscan.com/tx/{txHash}</p>
                  ): (
                    <p className='text-1xl my-6'>✅ Check out your transaction on EthereumScan explorer: https://goerli.etherscan.io/tx/${txHash}</p>
                  ) }
                </div>
                <div className='flex gap-4 flex-col sm:flex-row'>
                  <div className='px-10 py-4  rounded-2xl text-xl bg-[#1E1E27] text-white cursor-pointer flex gap-6 justify-center items-center '>
                    <img
                      src='/assets/sea.png'
                      alt="Picture of the author"
                      objectFit= "fill"
                      width={40}
                      height={40}
                      priority
                    />
                    <p>Sell on Opensea</p>
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
                    <p className='text-[#F0B90B] font-bold '>Sell on Binance</p>
                  </div>
                </div>
                <div className='flex gap-4 mt-14 justify-center text-2xl items-center'>
                  <FiShare2 className='text-4xl'/>
                  <p>Share my NFT</p>
                </div>
                {/* <Link href={'/'}><p>Back to Home page</p></Link> */}
              </div>
            ): (
              <div className='flex flex-col justify-center items-center'>
                <SpinningCircles stroke='#215BF0' fill='#215BF0' />
                <p className='text-3xl mt-6'>Your NFT is being created</p>
                <p className='text-2xl my-6'>{title}</p>
                <div className=' h-[20rem] relative rounded-xl flex  justify-center items-center'>
                  <img src={image.preview} alt="dummy"  className='w-full h-full rounded-xl bg-contain bg-center max-h-[20rem] max-w-[20rem] '  />
                </div>
              </div>
            )
          }
          </div>
        ): (
            <div></div>
          )
        } 
          
        </main>
      <Footer/>
    </div>
  )
}

const CreatePage = () => (
  <Firewall>
    <Create/>
  </Firewall>
);

export default CreatePage;