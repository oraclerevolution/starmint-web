require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: ["69a379c5f4a272eaba809d6f7c9db9eda22bacaf803657d47e30c5204905a7f6"],
    },
    polygon:{
      url:"https://polygon.llamarpc.com",
      accounts:["c21bbca8af5f3786ee4fd96610942a3f908a43ec72f66da7ae9c40aee86445e4"]
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    artifacts: "./pages/artifacts"
  },
};
