import React from 'react';
import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react"
import { InjectedConnector } from '@web3-react/injected-connector'

export const WalletConnector = () => {
    const injected = new InjectedConnector({
        supportedChainIds: [1, 3, 4, 5, 42],
      })
    const { active, account, library, connector, activate, deactivate } = useWeb3React()
  
    async function connect() {
      try {
        await activate(injected)
        localStorage.setItem('isWalletConnected', true)
      } catch (ex) {
        console.log(ex)
      }
    }
  
    async function disconnect() {
      try {
        deactivate()
        localStorage.setItem('isWalletConnected', false)
      } catch (ex) {
        console.log(ex)
      }
    }
  
    useEffect(() => {
      const connectWalletOnPageLoad = async () => {
        if (localStorage?.getItem('isWalletConnected') === 'true') {
          try {
            await activate(injected)
            localStorage.setItem('isWalletConnected', true)
          } catch (ex) {
            console.log(ex)
          }
        }
      }
      connectWalletOnPageLoad()
    }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={connect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Connect to MetaMask</button>
      <br></br>
      {active ? <span>Connected with <b>{account}</b></span> : <span>Not connected</span>}
      <br></br>
      <button onClick={disconnect} className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800">Disconnect</button>
    </div>
  );
};
