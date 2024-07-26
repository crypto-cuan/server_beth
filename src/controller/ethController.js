import Web3 from 'web3';
import { USDMClient } from 'binance';
import axios from 'axios';
import moment from 'moment';

import response from '../util/response/response'
import flag from '../util/flag/errorCode'
// import Event from '../models/Event';
import { calculateNewYorkMarketTime } from '../helpers/dateTime'

const API_KEY = process.env.binance_api_key;
const API_SECRET = process.env.binance_api_secret;
const urlInfura = process.env.url_infura;
const urlGanache = process.env.url_ganache;

const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
// let web3Infura = new Web3(urlInfura)

export const createWeb3Object =  async (req, res, next) => {
    try {
        let web3Ganache = new Web3(urlGanache)
        // console.log("createWeb3Account", web3Ganache);
        // console.log(web3Ganache.eth.accounts.create())
        
        let web3Infura = new Web3(urlInfura)
        // console.log("createWeb3Object", web3Infura);
        // console.log("result", web3Infura.eth.accounts);
        // console.log("result 2", web3Ganache);

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
        return response.success('get createWeb3Object is success', res, web3Infura.eth.accounts)
    } catch (error) {
        console.log("error: ", error);
    }
}


export const createWeb3Account =  async (req, res, next) => {
    try {
        let web3Ganache = new Web3(urlGanache)
        // console.log("createWeb3Account", web3Ganache);
        // console.log(web3Ganache.eth.accounts.create())
        
        let web3Infura = new Web3(urlInfura)
        const result = await web3Infura.eth.accounts.create()
        const data = {
            address: result.address,
            privateKey: result.privateKey
        }
        // console.log("result", result);
        return response.success('get createWeb3Account is success', res, data)
            // .then((result) => {
            //     console.log("result: ", result);
            //     const data = {
            //         address: result.address,
            //         privateKey: result.privateKey
            //     }
            //     return response.success('get createWeb3Account is success', res, data)
            // })
            // .catch((e) => {
            //     console.log("error: ", e);
            //     return response.error('get createWeb3Account is error', res, e)
            // })
        // return response.success('get createWeb3Account is success', res, data)
    } catch (error) {
        console.log("error: ", error);
    }
}


export const getAccountBalance =  async (req, res, next) => {
    try {
        let web3Ganache = new Web3(urlGanache)
        console.log("createWeb3Account", web3Ganache);

        console.log("isConnected=");
        web3Ganache.eth.net.isListening().then(console.log);
        let web3Infura = new Web3(urlInfura)
        // console.log("getAccountBalance", web3Infura);
        const address = req.body.address;
        web3Infura.eth.getBalance(address)
            .then((balance) => {
                console.log("balance: ", balance);
                const data = {
                    balance: Number(balance)
                }
                return response.success('get getAccountBalance is success', res, data)
            })
            .catch((e) => {
                console.log("error catch: ", e);
                return response.error('get getAccountBalance is error', res, e)
            })
        // return response.success('get getAccountBalance is success', res, null)
    } catch (error) {
        console.log("try error catch: ", error);
    }
}

export const getBlockNumber =  async (req, res, next) => {
    try {
        let web3Infura = new Web3(urlInfura)
        // console.log("getAccountBalance", web3Infura);
        const address = req.body.address;
        web3Infura.eth.getBlockNumber()
            .then((result) => {
                console.log("result: ", result);
                const data = {
                    blockNumber: Number(result)
                }
                return response.success('get getBlockNumber is success', res, data)
            })
            .catch((e) => {
                console.log("error catch: ", e);
                return response.error('get getBlockNumber is error', res, e)
            })
        /*  if block number many */
        // for(let i=0;i<100;i++){
        //     web3.eth.getBlock(result-i).then((block) => {
        //     console.log(block.number)
        //     })
        // }
    } catch (error) {
        console.log("try error catch: ", error);
    }
}

export const getBlock =  async (req, res, next) => {
    try {
        let web3Infura = new Web3(urlInfura)
        // console.log("getAccountBalance", web3Infura);
        const blockNumber = req.body.blockNumber;
        web3Infura.eth.getBlock(blockNumber)
            .then((result) => {
                console.log("result: ", result);
                const data = {
                    gasLimit: Number(result.gasLimit),
                    gasUsed: Number(result.gasUsed),
                    size: Number(result.size),
                    transactions: result.transactions,
                }
                return response.success('get getBlock is success', res, data)
            })
            .catch((e) => {
                console.log("error catch: ", e);
                return response.error('get getBlock is error', res, e)
            })
    } catch (error) {
        console.log("try error catch: ", error);
    }
}

export const createContract =  async (req, res, next) => {
    try {
        let web3Infura = new Web3(urlInfura)
        // console.log("getAccountBalance", web3Infura);
        // const blockNumber = req.body.blockcoonNumber;
        // const omg_abi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"},{"name":"_releaseTime","type":"uint256"}],"name":"mintTimelocked","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
        const omgAbi = req.body.omgAbi
        const omgAddress = req.body.omgAddress
        const omgContract = await new web3Infura.eth.Contract(omgAbi, omgAddress)
        console.log("omgContract: ", omgContract);
            // .then((result) => {
            //     console.log("result: ", result);
            //     // const data = {
            //     //     gasLimit: Number(result.gasLimit),
            //     //     gasUsed: Number(result.gasUsed),
            //     //     size: Number(result.size),
            //     //     transactions: result.transactions,
            //     // }
            //     return response.success('get getBlock is success', res, null)
            // })
            // .catch((e) => {
            //     console.log("error catch: ", e);
            //     return response.error('get getBlock is error', res, e)
            // })
    } catch (error) {
        console.log("try error catch: ", error);
    }
}