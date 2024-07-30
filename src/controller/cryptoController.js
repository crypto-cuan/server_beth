// import { Web3 } from 'web3';
import Web3 from 'web3';
import { USDMClient, MainClient } from 'binance';
import axios from 'axios';
import moment from 'moment';
import crypto from 'crypto'
import { Op } from 'sequelize';

import response from '../util/response/response'
import flag from '../util/flag/errorCode'
import { Kline, MarketOpen, MarkTradeFutures } from '../models';
import { calculateNewYorkMarketTime } from '../helpers/dateTime'

const API_KEY = process.env.binance_api_key;
const API_SECRET = process.env.binance_api_secret;
const FAPI_URL = process.env.binance_api_fapi_url;

// var web3  = new Web3.providers.HttpProvider("http://localhost:3000");
const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
// if(!web3.isConnected()) {
//     console.log("here");
//     // show some dialog to ask the user to start a node

// } else {
//     console.log("there");

//    // start web3 filters, calls, etc

// }

export const cryptoGetAll =  async (req, res, next) => {
    try {
        console.log("oi");
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
        response.success('get event list is success', res, {})
    } catch (error) {
        console.log("error: ", error);
    }
}

export const cryptoCheck =  async (req, res, next) => {
    try {
        console.log("oi");
        console.log(web3);
        console.log(Web3.version);
        // web3.eth.sendTransaction({from: '0x123...', data: '0x432...'})
        // .once('sending', function(payload){ ... })
        // .once('sent', function(payload){ ... })
        // .once('transactionHash', function(hash){ ... })
        // .once('receipt', function(receipt){ ... })
        // .on('confirmation', function(confNumber, receipt, latestBlockHash){ ... })
        // .on('error', function(error){ ... })
        // .then(function(receipt){
        //     console.log("receipt: ", receipt);
        //     // will be fired once the receipt is mined
        // });
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
        return response.success('get crypto success', res, {})
    } catch (error) {
        console.log("error: ", error);
    }
}

export const binanceCheckServerTime =  async (req, res, next) => {
    try {
        axios({
            method: 'get',
            url: `https://testnet.binancefuture.com/fapi/v1/time`,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => {
                console.log("response binanceCheckServerTime: ", resp.data);
                const dataResponse = resp.data;
                dataResponse.serverTime = new Date(dataResponse.serverTime)
                // console.log(moment(new Date()).utcOffset('-0500').format('YYYY-MM-DD HH:mm'));
                let newYork    = moment.tz(new Date(1705424400000), "America/New_York");
                const isNewYorkMarketTime = calculateNewYorkMarketTime(newYork)
                console.log("isNewYorkMarketTime: ", isNewYorkMarketTime);

                return response.success('candles crypto success', res, dataResponse)
            })
            .catch((e) => {
                console.log("error binanceKlinesCandlestick: ", e);
                return response.success('catch crypto error', res, {})
            })

        // return response.success('get crypto success', res, {})
    } catch (error) {
        console.log("error: ", error);
    }
}

export const binanceGetBalance =  async (req, res, next) => {
    try {
        console.log("oi");
        const client = new USDMClient({
            api_key: API_KEY,
            api_secret: API_SECRET,
          });
        client
            .getBalance()
            .then((result) => {
                console.log('getBalance result: ', result);
            })
            .catch((err) => {
                console.error('getBalance error: ', err);
            });
        return response.success('get crypto success', res, {})
    } catch (error) {
        console.log("error: ", error);
    }
}

export const binanceGetCurrentPositionMode =  async (req, res, next) => {
    try {
        console.log("oi");
        const client = new USDMClient({
            api_key: API_KEY,
            api_secret: API_SECRET,
          });
        client
            .getCurrentPositionMode()
            .then((result) => {
                console.log('getCurrentPositionMode result: ', result);
            })
            .catch((err) => {
                console.error('getCurrentPositionMode error: ', err);
            });
        return response.success('get crypto success', res, {})
    } catch (error) {
        console.log("error: ", error);
    }
}

export const binanceGet24hrChangeStatististics =  async (req, res, next) => {
    try {
        console.log("oi");
        const client = new USDMClient({
            api_key: API_KEY,
            api_secret: API_SECRET,
          });
        
        client
            .get24hrChangeStatististics()
            .then((result) => {
            console.log('get24hrChangeStatististics inverse futures result: ', result);
            })
            .catch((err) => {
            console.error('get24hrChangeStatististics inverse futures error: ', err);
            });
        return response.success('get crypto success', res, {})
    } catch (error) {
        console.log("error: ", error);
    }
}

export const binanceKlinesFutures =  async (req, res, next) => {
    try {
        console.log("oi");
        const client = new USDMClient({
            api_key: API_KEY,
            api_secret: API_SECRET,
        });
        let result = []
        let params = {
            symbol: req.query.symbol,
            interval: req.query.interval,
            startTime: req.query.startTime,
            endTime: req.query.endTime,
            limit: req.query.limit,
        }
        console.log("params: ", params);
        client
            .getKlines(params)
            .then((data) => {
                console.log('getKlines data: ', data);
                result = data
                return response.success('getKlines', res, result)
            })
            .catch((err) => {
                console.error('getKlines error: ', err);
                return response.error('error', res)
            });
    } catch (error) {
        console.log("error: ", error);
    }
}

export const findPresentMarkTradeFutures = async (req, res, next) => {
    try {
        const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
        const todayRecord = new Date();
        // console.log("todayStart: ", todayStart);
        // console.log("todayRecord: ", todayRecord);
        const presentMarkTradeFutures = MarkTradeFutures.findOne(
            {
                where: {
                    trade_time: { 
                        [Op.gt]: todayStart,
                        [Op.lt]: todayRecord
                    },
                    mark_position_id: 1
                },
            },
            {raw: false}
            
        )
            .then((result) => {
                console.log("presentMarkTradeFutures: ", result);
                return response.success('get crypto success', res, result)
            })
            .catch((e) => {
                console.log("catch e: ", e);
        })
        console.log("presentMarkTradeFutures: ", presentMarkTradeFutures);
        // return response.success('get crypto success', res, presentMarkTradeFutures)
    } catch (error) {
        console.log("error: ", error);
    }
}

export const binanceBookFuture =  async (req, res, next) => {
    try {
        const params = {
            symbol: req.query.symbol,
            side: req.query.side,
            type: req.query.type,
            quantity: req.query.quantity,
            timeInForce: req.query.timeInForce,
            price: req.query.price,
            // newClientOrderId: "1"
        }
        const client = new USDMClient({
            api_key: API_KEY,
            api_secret: API_SECRET,
        });
        console.log("binanceBookFuture client: ", client);
        client.submitNewOrder(params)
            .then((result) => {
                console.log("result: ", result);
            })
            .catch((e) => {
                console.log("err: ", e);
            })
        // const newOrder = await client.submitNewOrder(params)
        // console.log("newOrder: ", newOrder);
        return response.success('get crypto success', res, {})
    } catch (error) {
        console.log("error: ", error);
    }
}

export const binanceBookFutureTest = async (req, res, next) => {
    try {
        const timestamp = Date.now()
        const query_string = 'timestamp='+timestamp.toString();
        const apiSecret = API_SECRET;
        // const apiSecret = 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j';

        const signature = crypto
        .createHmac('sha256', apiSecret)
        .update(query_string)
        .digest('hex')

        console.log("timestamp: ", timestamp);
        console.log("signature: ", signature);

        const params = {
            symbol: req.query.symbol,
            side: req.query.side,
            type: req.query.type,
            quantity: req.query.quantity,
            timeInForce: req.query.timeInForce,
            price: req.query.price,
            recvWindow: req.query.recvWindow,
            // timestamp: 1578963600000,
            // signature: '01bfb82a2acd07e6a01e655253400e8858ed145836ddb506f25620e2dae63ab4'
            timestamp: timestamp,
            signature: signature,
        }
        axios({
            method: 'post',
            url: `https://fapi.binance.com/fapi/v1/order/test`,
            headers: {
                "Content-Type": "application/json",
                "X-MBX-APIKEY": API_KEY
            },
            params: params
        })
            .then((result) => {
                console.log("result: ", result);
            })
            .catch((err) => {
                console.log("err: ", err);
            })
        return response.success('get crypto success', res, {})
    } catch (error) {
        console.log("error: ", error);
    }
}


export const binanceKlinesCandlestick =  async (req, res, next) => {
    try {
        const params = {
            symbol: req.query.symbol,
            interval: req.query.interval,
            limit: req.query.limit
        }
        axios({
            method: 'get',
            url: `https://testnet.binancefuture.com/fapi/v1/klines`,
            // data: {
            //   firstName: 'Fred',
            //   lastName: 'Flintstone'
            // },
            headers: {
                "Content-Type": "application/json",
            },
            params: {
                symbol: params.symbol,
                interval: params.interval,
                limit: params.limit
            }
        })
            .then((resp) => {
                // console.log("response binanceKlinesCandlestick: ", resp.data);
                let objectData = {
                    x: new Date(),
                    y: []
                }
                const data = []
                const dataResponse = resp.data;
                console.log("dataResponse binanceKlinesCandlestick: ", dataResponse);
                const dataKline = {
                    symbol_name: params.symbol,
                    open_time: "",
                    open_price: "",
                    high_price: "",
                    low_price: "",
                    close_price: "",
                    volume: "",
                    close_time: "",
                    quote_asset_volume: "",
                    trades_number: "",
                    bav_buy_taker: "",
                    qav_buy_taker: "",
                    ignore: ""
                }

                dataResponse.map((item, i) => {
                    console.log("item: ", item);
                    dataKline.open_time = new Date(item[0]);
                    dataKline.open_price = item[1];
                    dataKline.high_price = item[2];
                    dataKline.low_price = item[3];
                    dataKline.close_price = item[4];
                    dataKline.volume = item[5];
                    dataKline.close_time = new Date(item[6]);
                    dataKline.quote_asset_volume = item[7];
                    dataKline.trades_number = item[8];
                    dataKline.bav_buy_taker = item[9];
                    dataKline.qav_buy_taker = item[10];
                    dataKline.ignore = item[11];
                    const createKline = Kline.create(dataKline)
                    console.log("createKline: ", createKline);

                    // let newYork    = moment.tz(new Date(item[0]), "America/New_York");
                    // const isNewYorkMarketTime = calculateNewYorkMarketTime(newYork)
                    // if (isNewYorkMarketTime) {
                        objectData.x = new Date(item[0])
                        objectData.y.push(Number(item[1]))
                        objectData.y.push(Number(item[2]))
                        objectData.y.push(Number(item[3]))
                        objectData.y.push(Number(item[4]))
                        data.push(objectData)
                        objectData = {
                            x: new Date(),
                            y: []
                        }
                    // }
                    // if (i < 10) {

                        // let newYork    = moment.tz(new Date(item[0]), "America/New_York");
                        // const isNewYorkMarketTime = calculateNewYorkMarketTime(newYork)
                        
                        // objectData.x = new Date(item[0])
                        // objectData.y.push(Number(item[1]))
                        // objectData.y.push(Number(item[2]))
                        // objectData.y.push(Number(item[3]))
                        // objectData.y.push(Number(item[4]))
                        // data.push(objectData)
                        // objectData = {
                        //     x: new Date(),
                        //     y: []
                        // }
                    // }
                })
                console.log("data: ", data);
                return response.success('binanceKlinesCandlestick crypto success', res, data)
            })
            .catch((e) => {
                console.log("error binanceKlinesCandlestick: ", e);
                return response.success('catch crypto error', res, {})
            })


        // console.log("oi");
        // console.log("API_KEY: ", API_KEY);
        // console.log("API_SECRET: ", API_SECRET);
        // const client = new USDMClient({
        //     api_key: API_KEY,
        //     api_secret: API_SECRET,
        //   });
        
        // client
        //     .get24hrChangeStatististics()
        //     .then((result) => {
        //     console.log('get24hrChangeStatististics inverse futures result: ', result);
        //     })
        //     .catch((err) => {
        //     console.error('get24hrChangeStatististics inverse futures error: ', err);
        //     });
        // return response.success('get crypto success', res, {})
    } catch (error) {
        console.log("error: ", error);
    }
}


export const binanceCandlestickNewyorkOpen =  async (req, res, next) => {
    // try {
    //     const params = {
    //         symbol: req.query.symbol,
    //         interval: req.query.interval,
    //         limit: req.query.limit,
    //         startTime: req.query.startTime,
    //         endTime: req.query.endTime,
    //     }
    //     console.log("params: ", params);
    //     axios({
    //         method: 'get',
    //         url: `https://testnet.binancefuture.com/fapi/v1/klines`,
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         params: params
    //     })
    //         .then((resp) => {
    //             let objectData = {
    //                 x: new Date(),
    //                 y: []
    //             }
    //             const dataResponse = resp.data;
    //             console.log("dataResponse binanceCandlestickNewyorkOpen: ", dataResponse);
    //             const totalData = dataResponse.length
    //             const dataCandle = []
    //             const data = {
    //                 totalData: totalData,
    //                 data: dataCandle
    //             }
    //             let hourAnalytic = req.query.hourAnalytic
    //             dataResponse.map((item, i) => {
    //                 console.log("item: ", item);
    //                 let newYork    = moment.tz(new Date(item[0]), "America/New_York");
    //                 const isNewYorkMarketTime = calculateNewYorkMarketTime(newYork, hourAnalytic)
    //                 // if (isNewYorkMarketTime) {
    //                     objectData.x = new Date(item[0])
    //                     objectData.y.push(Number(item[1]))
    //                     objectData.y.push(Number(item[2]))
    //                     objectData.y.push(Number(item[3]))
    //                     objectData.y.push(Number(item[4]))
    //                     data.data.push(objectData)
    //                     objectData = {
    //                         x: new Date(),
    //                         y: []
    //                     }
    //                 // }
    //             })
    //             console.log("data: ", data);
    //             return response.success('binanceCandlestickNewyorkOpen crypto success', res, data)
    //         })
    //         .catch((e) => {
    //             console.log("error binanceCandlestickNewyorkOpen: ", e);
    //             return response.success('catch crypto error', res, {})
    //         })
    // } catch (error) {
    //     console.log("error: ", error);
    // }

    try {
        const client = new USDMClient({
            api_key: API_KEY,
            api_secret: API_SECRET,
        });
        let params = {
            symbol: req.query.symbol,
            interval: req.query.interval,
            startTime: req.query.startTime,
            endTime: req.query.endTime,
            limit: req.query.limit,
        }
        console.log("params: ", params);
        client
            .getKlines(params)
            .then((resp) => {

                let objectData = {
                    x: new Date(),
                    y: []
                }
                const dataResponse = resp;
                console.log("dataResponse binanceCandlestickNewyorkOpen: ", dataResponse);
                const totalData = dataResponse.length
                const dataCandle = []
                const data = {
                    totalData: totalData,
                    data: dataCandle
                }
                let hourAnalytic = req.query.hourAnalytic
                dataResponse.map((item, i) => {
                    console.log("item: ", item);
                    let newYork    = moment.tz(new Date(item[0]), "America/New_York");
                    const isNewYorkMarketTime = calculateNewYorkMarketTime(newYork, hourAnalytic)
                    // if (isNewYorkMarketTime) {
                        objectData.x = new Date(item[0])
                        objectData.y.push(Number(item[1]))
                        objectData.y.push(Number(item[2]))
                        objectData.y.push(Number(item[3]))
                        objectData.y.push(Number(item[4]))
                        data.data.push(objectData)
                        objectData = {
                            x: new Date(),
                            y: []
                        }
                    // }
                })
                console.log("data: ", data);
                return response.success('binanceCandlestickNewyorkOpen crypto success', res, data)
            })
            .catch((err) => {
                console.error('binanceCandlestickNewyorkOpen error: ', err);
                return response.error('error', res)
            });
    } catch (error) {
        console.log("error: ", error);
    }
}




