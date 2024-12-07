import { CHAIN_NAMESPACES, IAdapter, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
//import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";

//import RPC from "./ethersRPC";

const clientId = "BPTU5anH__AnvSWwlL0S71r4RkMVdRaofFbe-xpWrkS_ICvHmtTcoZDxxDZCg2zEYX4r22-T-_QJhb80SEHlcb0";

const chainConfig = {
    chainId: "0x33",
    rpcTarget: "https://rpc.apothem.network",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    displayName: "XDC APOTHEM",
    blockExplorerUrl: "https://explorer.apothem.network/",
    ticker: "XDC",
    tickerName: "Xinfin",
    logo: "https://images.toruswallet.io/eth.svg",
  };

  

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfig }
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProvider,
});


    const initWeb3Auth = async () => {
      try {
        await web3auth.initModal();
        await web3auth.connect();
        if (web3auth.connected) {
          const privateKey = await web3auth.provider?.request({
            method: "eth_private_key",
          });
          if (privateKey) {
            const formattedPrivateKey = `0x${privateKey}`;
            console.log("Private key",formattedPrivateKey)
          }
        }
      } catch (error) {
        console.error("Web3Auth initialization error:", error);
      }
    };
  
  
    export const handleConnect = async () => {
      try {
        await initWeb3Auth();
        return true
      } catch (error) {
        console.error("Error in connecting to Web3Auth:", error);
      }
    };
  
    export const getUserInfo = async () => {
      const user = await web3auth.getUserInfo();
      return user.email;
    };
  
    export const logout = async () => {
      await web3auth.logout();
      return false;
      
    };