const key = "5222e765f21dd0de9471"
const secret = "75d26fcfda0b50c8fd07acadeb4f37b2820954ad2dee80990f4313d306d9a682"

const axios = require('axios')

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to pinata
    return axios
        .post(url, JSONBody,{
            headers:{
                pinata_api_key: key,
                pinata_secret_api_key: secret
            }
        })
        .then((response) => {
            return {
                success: true,
                pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
            }
        })
        .catch((error) => {
            console.log(error);
            return {
                success: false,
                message: error.message
            }
        })
}