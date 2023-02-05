const alchemyKey = 'https://polygon-mumbai.g.alchemy.com/v2/cKqvCVWlvMFmkSDuz29QYTCYD3chOp7g';
const alchemyEthKey = "https://eth-goerli.g.alchemy.com/v2/h3oHmjZqNDD7Vof9LGzvVm4M3XYX5fYs"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);
const web3Eth = createAlchemyWeb3(alchemyEthKey)
const contractArtifacts = require('../pages/artifacts/contracts/Starmint.sol/Starmint.json')
const contractEthArtifact = require('../pages/artifacts/contracts/StarmintEth.sol/StarmintEth.json')
const contractABI = contractArtifacts.abi
const contractEthAbi = contractEthArtifact.abi
const contractAddress = "0xC50e097Fe636908a8a5C1117d40E23F9875cb28A"
const contractAdressEth = "0x85B1e0120db34e5f8395F0c04BdA26CF4767c4f4"

import React,{useState, useEffect} from 'react'
import Dragdrop from '../components/dragDrop/Dragdrop';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';
import ete from '../public/assets/ete.svg';
import poly from '../public/assets/poly.svg';
import NewNav from '../components/navbar/NewNav';
import { connectWallet, getCurrentWalletConnected } from '../utils/interact';
import { pinJSONToIPFS } from '../utils/pinata';


// New upload file component import
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
const uploader = Uploader({ apiKey: "public_12a1xx9BRx1VBoBix2dBbsm3V495" });

// End New upload file component



// Second New upload file component (FilePond)
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginFileValidateSize);
// End Second New upload file component (FilePond)

function Create() {
  // (FilePond)
  const [pondFiles, setPondFiles] = useState([]);
  console.log(pondFiles);
  // (End FilePond)

  const [quantite, setQuantite] = useState(1)
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [buttonText, setButtonText] = useState("Mint NFT");
  const [url, setURL] = useState("");

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
    setName(event.target.value);
  };

  const handleChangeDescription = (event) => {
    // 👇 Get input value from "event"
    setDescription(event.target.value);
  };
  
  const onMintPressed = async(url, name, description) => {
    //error handling
    /* if (url.trim() == "" || (name.trim() == "" || description.trim() == "")) {
      return {
        success: false,
        status: "❗Please make sure all fields are completed before minting.",
      }
    } */

    //make construction of metadata
    const metadata = {
      name,
      image: url,
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
    const contractData = contrat.methods.mint(walletAddress, tokenURI, quantite, []).encodeABI()

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
          setStatus(`✅ Check out your transaction on Polygonscan: https://mumbai.polygonscan.com/tx/${txHash}`)
    } catch (error) {
      setStatus(`😥 Something went wrong: ${error.message}`)
    }
  };

  const onMintPressedEth = async(url, name, description) => {
    setButtonDisable(true)
    setButtonText('Please wait ...')
    //make construction of metadata
    const metadata = {
      name,
      image: url,
      description
    };

    //make pinata call
    const pinataResponse = await pinJSONToIPFS(metadata);
    if(!pinataResponse.success){
      return {
        success: false,
        status: "😢 Something went wrong while uploading your tokenURI.",
      }
      setButtonDisable(false)
      setButtonText('Mint NFT')
    }
    const tokenURI = pinataResponse.pinataUrl;
    console.log('tokenURI', tokenURI)
    //load the smart contract
    const contrat = await new web3Eth.eth.Contract(contractEthAbi, contractAdressEth)
    const contractData = contrat.methods.mint(walletAddress, tokenURI, quantite, []).encodeABI()

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
      setStatus(`✅ Check out your transaction on EthereumScan: https://goerli.etherscan.io/tx/${txHash}`)
      setButtonDisable(false)
      setButtonText('Mint NFT')
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
  }, []);
  
  return (
    <div>
      <NewNav/>
      <main className='px-8 md:px-20 lg:px-32 xl:px-40 2xl:px-52 pt-16 '> 
        <div className='md:px-20 lg:px-32 xl:px-40 2xl:px-52'>
          <div className='text-[#707A83]'>
            <h1 className='text-4xl capitalize font-bold mb-4'>Create new item</h1>
            <p>image, video or audio files</p>
            <p>Supported Types : JPG, PNG, GIF, SVG, MP4, MP3, WMV</p>
            <p>Maximum size : 100 Mo</p>
          </div>
          <form action="">
            <div className='mt-10'>
              <div className='mb-16'>
                <FilePond 
                  files={pondFiles} 
                  allowMultiple={false} 
                  onupdatefiles={setPondFiles}
                  allowFileSizeValidation={true}
                  maxFiles={1} 
                  maxFileSize= '100MB'
                  name="files"
                  labelMaxTotalFileSize="Maximum total file size is 100Mo"
                  className='bg-red-400'
                />
              </div>
              <div>
                {/* <Dragdrop/> */}
                <UploadDropzone uploader={uploader}
                  options={{ 
                    multi: false,
                    maxFileCount: 1,
                    maxFileSizeBytes: 100000000,
                  }}
                  onUpdate={files => console.log(files.map(x => x.fileUrl).join("\n"))}
                  width="100%"
                  height="275px">
                </UploadDropzone>
              </div>
              
            </div>
            <div className='flex flex-col gap-4 mt-10'>
              <div>
                <h1 className='text-xl mb-2'>Title</h1>
                <input type="text" placeholder='Item mane' required={true} value={name} onChange={handleChangeName} className='px-6 py-4 rounded-xl border border-[#1E1E27]   w-full  outline-none' />
              </div>
              <div>
                <h1 className='text-xl mb-2'>Description</h1>
                <textarea type="text-area" value={description} required={true} onChange={handleChangeDescription} className='px-6 py-4 rounded-xl border border-[#1E1E27] w-full  outline-none h-[10rem] resize-none' />
              </div>
              <div>
                <h1 className='text-xl mb-2'>Quantity</h1>
                <input type="number" value={quantite} disabled  className='px-6 py-4 rounded-xl border border-[#1E1E27]   w-full  outline-none' />
              </div>
              <div className='mt-8'>
                <div>
                  <h1 className='text-4xl capitalize font-bold text-[#707A83] mb-4'>Blockchain </h1>
                  <p className='text-xl'>On Ethereum, you pay the minning costs. On poligon, costs are covered by starmint</p>
                </div>
                <div className='mt-10 flex md:flex-row flex-col gap-6 md:justify-between '>
                  <div className='flex flex-col gap-4 items-center'>
                    <div className='border border-black w-[16rem] md:w-[20rem]  '>
                      <div className='h-[6rem] bg-black'></div>
                      <div className='flex justify-center items-center p-8 relative'>
                        <img
                          src="/assets/poly.svg"
                          alt="Picture of the author"
                          width={120}
                          height={120}
                          priority
                        />
                        
                      </div>
                    </div>
                    <h1 className='text-2xl capitalize font-bold text-black mb-4'>Gas fees at your expense</h1>
                  </div>
                  <div className='flex flex-col gap-4 items-center'>
                    <div className='border border-black w-[16rem] md:w-[20rem]'>
                      <div className='h-[6rem] bg-black'></div>
                      <div className='flex  justify-center items-center p-8'>
                        <img
                          src="/assets/ete.svg"
                          alt="Picture of the author"
                          width={120}
                          height={120}
                          priority
                        />
                      </div>
                    </div>
                    <h1 className='text-2xl capitalize font-bold text-black mb-4'>Gas fees at your expense</h1>
                  </div>
                </div>
              </div>
              <div className='flex justify-center mt-8'>
                {walletAddress == "" ?(
                  <button className='px-16 py-4  rounded-2xl text-xl bg-[#00FF3B] text-white' type='button' onClick={connectWalletPressed}>
                    <span>Connect Wallet</span>
                  </button>
                ):(
                  <button type='button' disabled={buttonDisable} className='px-16 py-4  rounded-2xl text-xl bg-[#00FF3B] text-white' onClick={() => onMintPressedEth(url,name, description)}>
                    <span>{buttonText}</span>
                  </button>
                )}
              </div>
              <p style={{textAlign:"center"}}>{status}</p>
            </div>
          </form>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Create;