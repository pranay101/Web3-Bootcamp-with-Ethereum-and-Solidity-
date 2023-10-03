import HDWalletProvider from '@truffle/hdwallet-provider'
import Web3 from 'web3'
import dotenv from 'dotenv'

import compileContract from './complile.js'
const { abi, bytecode } = await compileContract()
const INITIAL_STRING = "Hi there!"

// Load environment variables from .env file
dotenv.config()

// const provider = new HDWalletProvider({
//   mnemonic: process.env.MNEMONIC,
//   url: process.env.SEPOLIA_URL,
//   2
// })

// const provider = 

const web3 = new Web3({
    provider: new HDWalletProvider(process.env.MNEMONIC, process.env.SEPOLIA_URL,0)
})

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts()
    console.log('Got accounts')
    console.log('Deploying contract')

    // Use `new web3.eth.Contract(abi).deploy()` instead of `new web3.eth.Contract(abi).constructor()`.
    // This is because the constructor function is not always present in the ABI.
    const inbox = await new web3.eth.Contract(abi).deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: 1000000 })

    console.log('Contract deployed at', inbox.options.address)
  } catch (error) {
    console.error('An error occurred during contract deployment:', error)
  } finally {
    // Stop the provider engine after deployment to avoid memory leaks.
    provider.engine.stop()
  }
}

deploy()
