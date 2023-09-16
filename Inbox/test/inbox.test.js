import assert from 'assert'
import ganache from 'ganache-cli'
import Web3 from 'web3'
import compileContract from '../complile.js'

const web3 = new Web3(ganache.provider())

let accounts
let inbox
let { abi, bytecode } = await compileContract()
const INITIAL_STRING = "Hi there!"

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()

    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: bytecode,
            arguments: [INITIAL_STRING],
        })
        .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })
    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message,INITIAL_STRING)
    })
    it('can change the message',async() =>{
        const newMessage = "bye there!"
        const transactionhash = await inbox.methods.setMessage(newMessage).send({
            from: accounts[0],
        })
        const message = await inbox.methods.message().call()
        assert.equal(message,newMessage)
        console.log(transactionhash);

    })
})
