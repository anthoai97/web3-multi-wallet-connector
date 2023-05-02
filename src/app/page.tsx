"use client";

import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { Injected, Torus, WalletConnect, Walletlink } from "./connectors";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { ABI } from "./abi";

export default function Home() {
  const { activate, deactivate, active, chainId, account, library } =
    useWeb3React();

  const disconnect = async () => {
    try {
      deactivate();
    } catch (err) {
      console.error(err);
    }
  };

  function connectorTorus() {
    activate(Torus, undefined, true).catch((error) => {
      if (error instanceof UnsupportedChainIdError) {
        console.log("Error UnsupportedChainIdError");
      } else {
        disconnect();
      }
    });
  }

  function connectorMetamask() {
    activate(Injected, undefined, true).catch((error) => {
      if (error instanceof NoEthereumProviderError) {
        console.log("Push to MetaMask");
      } else if (error instanceof UnsupportedChainIdError) {
        console.log("Error UnsupportedChainIdError");
      } else {
        disconnect();
      }
    });
  }

  function connectorCoinbase() {
    activate(Walletlink, undefined, true).catch((error) => {
      console.log(error);
      if (error instanceof NoEthereumProviderError) {
        console.log("Push to MetaMask");
      } else if (error instanceof UnsupportedChainIdError) {
        console.log("Error UnsupportedChainIdError");
      } else {
        disconnect();
      }
    });
  }

  function connectorWalletConnect() {
    activate(WalletConnect, undefined, true).catch((error) => {
      console.log(error);
      if (error instanceof NoEthereumProviderError) {
        console.log("Push to MetaMask");
      } else if (error instanceof UnsupportedChainIdError) {
        console.log("Error UnsupportedChainIdError");
      } else {
        disconnect();
      }
    });
  }

  async function connectSmartContract() {
    let contract = new ethers.Contract(
      "0x6B8F79520782daBebC5c751fe06c20017d7c85d6",
      ABI,
      library.getSigner()
    );
    console.log(contract);

    let num = await contract.balanceOf(
      "0x46614332E1FAb5e1dBBafB1681da498A81c224E9"
    );
    console.log(num);
  }

  return (
    <div className="flex-col item-center justify-center  min-h-full h-screen">
      <div className="text-center mt-5">
        <div>Connection Status: {active}</div>
        <div>Account: {account}</div>
        <div>Network ID: {chainId}</div>
      </div>
      <div className="text-center">
        <button
          onClick={() => connectorTorus()}
          className="bg-red-700 p-5 mt-5"
        >
          Connect Torus
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => connectorMetamask()}
          className="bg-red-700 p-5 mt-5"
        >
          Metamask
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => connectorCoinbase()}
          className="bg-red-700 p-5 mt-5"
        >
          Coinbase
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => connectorWalletConnect()}
          className="bg-red-700 p-5 mt-5"
        >
          Wallet Connect
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={() => connectSmartContract()}
          className="bg-red-700 p-5 mt-5"
        >
          Connect Smart Contract
        </button>
      </div>

      <div className="text-center">
        <button onClick={() => disconnect()} className="bg-red-700 p-5 mt-5">
          Disconnect
        </button>
      </div>
    </div>
  );
}
