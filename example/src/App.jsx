import React, { useEffect, useState } from "react";
import Chatbox from "streamr-chatbox";
import "./App.css";

const { ethers } = require("ethers");

const STREAM_ID = "0x35d389B751943Cbf3fE3620a668566E97D5f0144/troll";

function App() {
  const [ address, setAddress ] = useState();
  const [ injectedProvider, setInjectedProvider ] = useState();
  const [ connected, setConnected ] = useState(false);

  useEffect(() => {
    const fetchAccountData = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      setInjectedProvider(provider);
      setAddress(walletAddress);
      setConnected(true);
    };
    fetchAccountData();
  }, []);

  return (
    <div className="App">
      {connected && 
        <Chatbox provider={injectedProvider} address={address} streamID={STREAM_ID} />
      }
      </div>
  );
}

export default App;
