// import { Web3 } from 'web3';
import Web3 from 'web3';
import axios from "axios"

// import contract       from "'truffle-contract'"
// import path           from "'path'"
// import MyContractJSON from "path.join(__dirname, 'build/contracts/MyContract.json')"
import Moralis from 'moralis';

import response from '../util/response/response'
import flag from '../util/flag/errorCode'
// import Event from '../models/Event';
import { artifacts } from "truffle";
// import artifactMarketplaceSol from '../contracts/Marketplace.sol'
// const Marketplace = artifacts.require(artifactMarketplaceSol)

// var web3  = new Web3.providers.HttpProvider("http://103.6.55.18:8545");

const urlEtherscan = "https://api.etherscan.io/api"
const web3 = new Web3(Web3.givenProvider || "http://103.6.55.18:8545");
// const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
const apiMoralis = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFiOTg1NTlmLWFkNGItNDJiNC1hNjk2LTEwYjYwYTVhNmNkZSIsIm9yZ0lkIjoiMzk3OTk4IiwidXNlcklkIjoiNDA4OTU5IiwidHlwZUlkIjoiYTEyNjQyYjItZWU2My00MmMzLWJiZjUtYjY1MjMxYjdlODE5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTk0NzU3MjAsImV4cCI6NDg3NTIzNTcyMH0.qV63IWaSl3_fQqSDmFkeqmwUP0SDwOHTfvrlQbayM8E"

export const checkConnection =  async (req, res, next) => {
    try {
        console.log("web3: ", web3);
        console.log("Web3.version: ", Web3.version);
        let account = await web3.eth.getAccounts()
        console.log("account: ", account);
        let balance = await web3.eth.getBalance(account[0])
        console.log("balance: ", balance);
        let web3Status = {
            statusConnection: false
        };
        // if(!web3.isConnected()) {
        //     console.log("here");
        // // show some dialog to ask the user to start a node
        // } else {
        //     console.log("there");
        // // start web3 filters, calls, etc
        // }
        // web3Status.statusConnection = web3.isConnected()
        response.success('checkConnection is success', res, {})
    } catch (error) {
        console.log("error: ", error);
    }
}

export const getBalance =  async (req, res, next) => {
    try {
        let address = req.body.address
        let balance = await web3.eth.getBalance(address)
        let result = Number(BigInt(balance))
        // console.log("balance: ", balance);
        if (typeof result === "number") {
            return response.success('success', res, result)
        } else {
            return response.error(`No data found`, res, flag.event_not_found)
        }
    } catch (error) {
        console.log("error: ", error);
        return response.error(`Invalid address`, res, flag.invalid_address)
    }
}

export const checkValidAddress =  async (req, res, next) => {
    try {
        let address = req.body.address
        let isAddress = web3.utils.isAddress(address)
        // let result = Number(BigInt(balance))
        // console.log("balance: ", balance);
        // if (typeof result === "number") {
            return response.success('success', res, isAddress)
        // } else {
            // return response.error(`No data found`, res, flag.event_not_found)
        // }
    } catch (error) {
        console.log("error: ", error);
        return response.error(`Invalid address`, res, flag.invalid_address)
    }
}

export const getAccountBalance =  async (req, res, next) => {
    try {
        let account = await web3.eth.getAccounts()
        let balance = await web3.eth.getBalance(account[0])
        balance = JSON.parse(balance)
        let result = {
            balance: balance
        }
        response.success('getAccountBalance is success', res, result)
    } catch (error) {
        console.log("error: ", error);
    }
}

export const walletCheck =  async (req, res, next) => {
    try {
        let wallet = await web3.eth.accounts.wallet
        console.log("wallet: ", wallet);
        let result = {
            wallet: wallet
        }
        response.success('walletCheck is success', res, result)
    } catch (error) {
        console.log("error: ", error);
    }
}


export const getBlocks =  async (req, res, next) => {
    try {
        web3.eth.getBlockNumber().then(console.log)
        var block = await web3.eth.getBlock("latest")

        var firstblock = await web3.eth.getBlock(0)
        // firstblock.then(console.log("firstblock"))
        // firstblock.then( block => console.log(block.hash))
        block.difficulty = Number(block.difficulty)
        block.number = Number(block.number)
        block.gasLimit = Number(block.gasLimit)
        block.gasUsed = Number(block.gasUsed)
        block.timestamp = Number(block.timestamp)
        block.nonce = Number(block.nonce)
        block.totalDifficulty = Number(block.totalDifficulty)
        block.baseFeePerGas = Number(block.baseFeePerGas)
        block.size = Number(block.size)
        let result = {
            block: block
        }
        console.log("result: ", result);
        response.success('getBlocks is success', res, result)
    } catch (error) {
        console.log("error: ", error);
    }
}

export const getTransactionByAccount =  async (req, res, next) => {
    try {
        let result = ""
        let account = await web3.eth.getAccounts()
        let myAddr = account[1]
        // var myAddr = '0xbb9bc244d798123fde783fcc1c72d3bb8c189413';
        let userAccountAddress = await web3.eth.accounts[0];
        var currentBlock = await web3.eth.getBlockNumber();
        var n = await web3.eth.getTransactionCount(myAddr, currentBlock);
        var bal = await web3.eth.getBalance(myAddr, currentBlock);
        n = JSON.parse(n)
        bal = JSON.parse(bal)
        console.log("account: ", account);
        console.log("account[1]: ", account[1]);
        console.log("currentBlock: ", currentBlock);
        // console.log("userAccountAddress: ", userAccountAddress);
        console.log("n: ", n);
        console.log("bal: ", bal);
        for (var i=currentBlock; i >= 0 && (n > 0 || bal > 0); --i) {
            try {
                var block = await web3.eth.getBlock(i, true);
                console.log("block: ", block);
                console.log("block.transactions: ", block.transactions);
                if (block && block.transactions) {
                    block.transactions.forEach(function(e) {
                        if (myAddr == e.from) {
                            if (e.from != e.to)
                                bal = bal.plus(e.value);
                            console.log(i, e.from, e.to, e.value.toString(10));
                            --n;
                        }
                        if (myAddr == e.to) {
                            if (e.from != e.to)
                                bal = bal.minus(e.value);
                            console.log(i, e.from, e.to, e.value.toString(10));
                        }
                    });
                }
            } catch (e) { console.error("Error in block " + i, e); }
        }
        result = JSON.parse(n)
        response.success('getTransactionByAccount is success', res, result)
    } catch (error) {
        console.log("error catch: ", error);
    }
}

export const listProduct =  async (req, res, next) => {
    try {
        console.log("oi");
        // const marketplace = await Marketplace.deployed()
        // const product = await marketplace.products(productCount)

        // const data = Event.findAll({raw: true})
        // .then((data) => {
        //     console.log("data: ", data.json());
        //     console.log("data: ", data[0].name);
        //     response.success('get event list is success', res, data)
        // })
        // .catch((err) => {
        //     console.log("err: ", err);
        // })
        // const data = await Event.findAll({raw: true})
        // console.log("data: ", data[0].name);
        // if (!data) return response.error(`No user found`, res, flag.event_not_found)
        // response.success('get event list is success', res, data)
        response.success('get listProduct is success', res, product)
    } catch (error) {
        console.log("error: ", error);
    }
}

export const getTransactionDetailByHash = async (req, res, next) => {
    try {
        const trxHash = req.body.trxHash
        let result = await web3.eth.getTransaction(trxHash)
        console.log("result: ", result);
        const detailTransaction =  {
            blockHash: '0x66b5cc32cef7f6fe24194f0285e88bac5ce793c320c5d9bd59c9a9c5a72952e0',
            blockNumber: 136067n,
            from: '0x59d9ad20071e442477678eaabcfdb6693973fef1',
            gas: 21000n,
            gasPrice: 1014285714n,
            hash: '0x5f436240416dbe771cbd5cb0df57f31f0ff3f33d55f4702e8b009b038eca0f2f',
            input: '0x',
            nonce: 9n,
            to: '0x33449a3af79a4125c57987eeaf756a20b6b50ef5',
            transactionIndex: 0n,
            value: 1000000000000000000n,
            type: 0n,
            chainId: 4355n,
            v: 8746n,
            r: '0x18f44c5c417e26887a855eb404e78478fe13d7b023e9451f43bc7768b2795700',
            s: '0x10cfad31fd1840abe8fea083135007cb4f3ab3384cd0319627740c7ef8ae2551',
            data: '0x'
        }
        result.blockNumber = Number(BigInt(result.blockNumber))
        result.gas = Number(BigInt(result.gas))
        result.gasPrice = Number(BigInt(result.gasPrice))
        result.nonce = Number(BigInt(result.nonce))
        result.transactionIndex = Number(BigInt(result.transactionIndex))
        result.value = Number(BigInt(result.value))
        result.type = Number(BigInt(result.type))
        result.chainId = Number(BigInt(result.chainId))
        result.v = Number(BigInt(result.v))
        response.success('getTransactionDetailByHash is success', res, result)
    } catch (error) {
        console.log("tryCatch erro getTransactionDetailByHash: ", error);
    }
}

export const getTransactionByHash = async (req, res, next) => {
    try {
        const trxHash = req.body.trxHash
        let result = await web3.eth.getTransaction(trxHash)
        const detailTransaction =  {
            blockHash: '0x66b5cc32cef7f6fe24194f0285e88bac5ce793c320c5d9bd59c9a9c5a72952e0',
            blockNumber: 136067n,
            from: '0x59d9ad20071e442477678eaabcfdb6693973fef1',
            gas: 21000n,
            gasPrice: 1014285714n,
            hash: '0x5f436240416dbe771cbd5cb0df57f31f0ff3f33d55f4702e8b009b038eca0f2f',
            input: '0x',
            nonce: 9n,
            to: '0x33449a3af79a4125c57987eeaf756a20b6b50ef5',
            transactionIndex: 0n,
            value: 1000000000000000000n,
            type: 0n,
            chainId: 4355n,
            v: 8746n,
            r: '0x18f44c5c417e26887a855eb404e78478fe13d7b023e9451f43bc7768b2795700',
            s: '0x10cfad31fd1840abe8fea083135007cb4f3ab3384cd0319627740c7ef8ae2551',
            data: '0x'
        }
        result.blockNumber = Number(BigInt(result.blockNumber))
        result.gas = Number(BigInt(result.gas))
        result.gasPrice = Number(BigInt(result.gasPrice))
        result.nonce = Number(BigInt(result.nonce))
        result.transactionIndex = Number(BigInt(result.transactionIndex))
        result.value = Number(BigInt(result.value))
        result.type = Number(BigInt(result.type))
        result.chainId = Number(BigInt(result.chainId))
        result.v = Number(BigInt(result.v))
        return response.success('success', res, result)
    } catch (error) {
        console.log("tryCatch error getTransactionByHash: ", error);
        return response.error(`No user found`, res, flag.event_not_found)
    }
}

export const getListTransactions = async (req, res, next) => {
    try {
        let latestBlock = await web3.eth.getBlock("latest")
        let latestBlockNumber = latestBlock.number
        let transactions = [] 
        for (let i = 0; i < latestBlockNumber; ++i) {
            let transaction = {
                transactionHash: "",
                blockNumber: 0
            }
            let block = await web3.eth.getBlock(i)
            if (block !== undefined && block.transactions !== undefined && block.transactions.length > 0) {
                for (let j = 0; j < block.transactions.length; j++) {
                    transaction.transactionHash = block.number
                    transaction.blockNumber = block.transactions[j]
                    transactions.push(transaction)
                }
            }
        }
        console.log("getListTransactions: ", transactions);
        response.success('getListTransactions is success', res, transactions)
    } catch (error) {
        console.log("tryCatch Error getListTransactions: ", error);
        return response.error(`No user found`, res, flag.event_not_found)
    }
}

export const getTransactionList = async (req, res, next) => {
    try {
        let address = req.body.address
        let limit = req.body.limit
        let params = {
          module: "account",
          action: "txlist",
          address: address,
          startblock: "0",
          endBlock: "99999999999999",
          page: 2,
          offset: limit,
          sort: "desc",
          apiKey: "XMN5EZ3DZIQBPC9HW12FP79WQF3DRUR4UT"
        }
        const etherResp = await axios.get(urlEtherscan, {params:params})
        console.log("etherResp: ", etherResp.data);
        let data = etherResp.data.result
        if (etherResp.data !== undefined && etherResp.data !== null) {
            // let result = etherResp.data.result
            let result = []
            // for (let i = 0; i < limit; ++i) {
            //     result.push(data[i])
            // }
            result = data
            return response.success('success', res, result)
        } else {
            return response.error(`No data found`, res, flag.event_not_found)
        }
    } catch (error) {
      console.log("catch error getTransactionList: ", error);
      return response.error(`No data found`, res, flag.event_not_found)
    }
}

export const sendTransaction = async (req, res, next) => {
    try {
        let obj = {
            from: req.body.from,
            to: req.body.to,
            value: req.body.value
        }
        let transactionReceipt = await  web3.eth.sendTransaction(obj);
        // console.log("transactionReceipt: ", transactionReceipt);
        response.success('success', res, transactionReceipt)
    } catch (error) {
        console.log("tryCatch Error getTransactionReceipt: ", error);
        return response.error(`No data found`, res, flag.event_not_found)
    }
}

export const getTransactionReceipt = async (req, res, next) => {
    try {
        const trxHash = req.body.trxHash
        let transactionReceipt = await  web3.eth.getTransactionReceipt(trxHash);
        console.log("transactionReceipt: ", transactionReceipt);
        let template = {
            blockHash: '0x66b5cc32cef7f6fe24194f0285e88bac5ce793c320c5d9bd59c9a9c5a72952e0',
            blockNumber: 136067n,
            cumulativeGasUsed: 21000n,
            effectiveGasPrice: 1014285714n,
            from: '0x59d9ad20071e442477678eaabcfdb6693973fef1',
            gasUsed: 21000n,
            logs: [],
            logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            status: 1n,
            to: '0x33449a3af79a4125c57987eeaf756a20b6b50ef5',
            transactionHash: '0x5f436240416dbe771cbd5cb0df57f31f0ff3f33d55f4702e8b009b038eca0f2f',
            transactionIndex: 0n,
            type: 0n
        }

        response.success('getTransactionReceipt is success', res, "transactionReceipt")
    } catch (error) {
        console.log("tryCatch Error getTransactionReceipt: ", error);
        return response.error(`No user found`, res, flag.event_not_found)
    }
}

export const getBlock =  async (req, res, next) => {
    try {
        const blockNumber = req.body.blockNumber
        var block = await web3.eth.getBlock(blockNumber)
        console.log("block: ", block);
        let template = {
            difficulty: 2n,
            extraData: '0xd883010d0f846765746888676f312e32312e36856c696e75780000000000000049eeb2fdd8960376d7640d10f2a97575bf66332dcceac0736bb0c825b6e556352ad1f9a31116fcd5bb922beb25d9f82aa85a8cba997a884d6160df8d9ee9795b00',
            gasLimit: 30000000n,
            gasUsed: 0n,
            hash: '0xc3c3f2937589e32bf07ebb7330f47aebfe423a2024b84642de5179c054f9ae03',
            logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
            miner: '0x0000000000000000000000000000000000000000',
            mixHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
            nonce: 0n,
            number: 170866n,
            parentHash: '0x8960787ff05b549548cd6c61353ed94e1487f4bb7ae6c1e5194f2ab4e45c6994',
            receiptsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
            sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
            size: 610n,
            stateRoot: '0x922a69596a7aa022870eae931f4c564128572ab0fcfd1cd4b0ffe63c99d23f38',
            timestamp: 1721811567n,
            totalDifficulty: 341719n,
            transactionsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
            uncles: []
        }
        response.success('getBlock is success', res, "result")
    } catch (error) {
        console.log("error: ", error);
        return response.error(`No user found`, res, flag.event_not_found)
    }
}

export const getBlockCount =  async (req, res, next) => {
    try {
        // let result = {
        //     totalBlockNumber: ""
        // }
        const blockNumber = req.body.blockNumber
        var block = await web3.eth.getBlock("latest")
        console.log("block: ", block);
        // result.totalBlockNumber = Number(BigInt(block.number))
        let result = Number(BigInt(block.number))
        response.success('success', res, result)
    } catch (error) {
        console.log("error: ", error);
        return response.error(`No user found`, res, flag.event_not_found)
    }
}

export const getTransactionMoralis = async (req, res, next) => {
    try {
        const address = req.body.address
        await Moralis.start({
            apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImFiOTg1NTlmLWFkNGItNDJiNC1hNjk2LTEwYjYwYTVhNmNkZSIsIm9yZ0lkIjoiMzk3OTk4IiwidXNlcklkIjoiNDA4OTU5IiwidHlwZUlkIjoiYTEyNjQyYjItZWU2My00MmMzLWJiZjUtYjY1MjMxYjdlODE5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTk0NzU3MjAsImV4cCI6NDg3NTIzNTcyMH0.qV63IWaSl3_fQqSDmFkeqmwUP0SDwOHTfvrlQbayM8E"
        });

        const resp = await Moralis.EvmApi.transaction.getWalletTransactions({
            "chain": "0x1",
            "order": "DESC",
            "address": address
        });

        console.log(resp.raw);
        console.log("resp: ", resp);
        response.success('getBlock is success', res, resp.result)
    } catch (e) {
        console.error(e);
    }
}