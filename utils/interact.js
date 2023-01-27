
export const connectWallet = async () => {
    if(window.ethereum){
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            const obj = {
                status: `👆🏽 Connecté: ${String(addressArray[0]).substring(0, 6)}...${String(addressArray[0]).substring(38)}`,
                address: addressArray[0],
            }
            return obj;
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            }
        }
    }else{
        return {
            address: "",
            status:(
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                        You must install Metamask, a virtual Ethereum wallet, in your
                        browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: `👆🏽 Connecté: ${String(addressArray[0]).substring(0, 6)}...${String(addressArray[0]).substring(38)}`,
          };
        } else {
          return {
            address: "",
            status: "🦊 Connectez votre portefeuille en cliquant sur le bouton ci-dessus.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
};