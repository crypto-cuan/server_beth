import moment from 'moment';
import momentTz from 'moment-timezone';
import { USDMClient, MainClient } from 'binance';
import { Op } from 'sequelize';

import { MarketOpen, MarkTradeFutures } from '../models';

const API_KEY = process.env.binance_api_key;
const API_SECRET = process.env.binance_api_secret;

const calculateNewYorkMarketTime = (dateCoin) => {
    let isNewYorkMarketTime = false;
    // start time and end time
    var startTime = moment('00:00:00 am', 'HH:mm:ss a');
    var endTime = moment('12:00:00 pm', 'HH:mm:ss a');
    const dateCoinHour = dateCoin.hour();
    const startTimeHour = startTime.hour();
    const endTimeHour = endTime.hour();
    // console.log("typeof dateCoinHour: ", typeof dateCoinHour);
    // console.log("typeof startTimeHour: ", typeof startTimeHour);
    // console.log("typeof endTimeHour: ", typeof endTimeHour);
    // console.log(`dateCoinHour: ${dateCoinHour}, startTimeHour: ${startTimeHour}, endTimeHour: ${endTimeHour}`);
    // if (dateCoinHour >= startTimeHour) {
    //     console.log("open time");
    // }
    // if (dateCoinHour < endTimeHour) {
    //     console.log("closed time");
    // }
    if (dateCoinHour >= startTimeHour && dateCoinHour < endTimeHour) {
        // console.log("open time");
        isNewYorkMarketTime = true
    } else {
        // console.log("closed time");
    }

    return isNewYorkMarketTime
}

export const overOneHourAfterOpen = (dateCoin) => {
    let isOverOneHour = false;
    // start time and end time
    var startTime = moment('01:00:00 am', 'HH:mm:ss a');
    const dateCoinHour = dateCoin.hour();
    const startTimeHour = startTime.hour();
    // console.log("dateCoinHour: ", dateCoinHour);
    // console.log("startTimeHour: ", startTimeHour);
    if (dateCoinHour >= startTimeHour) {
        isOverOneHour = true
    }
    return isOverOneHour
}

const connectStreamFutureBinance = () => {
    try {
        const WebSocket = require('ws');
        const binanceWS = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_3m') // candle 1m
        // const binanceWS = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
        // const binanceWS = new WebSocket('wss://ws-api.binance.com:443/ws-api/v3')

        // const server = new WebSocket.Server({ port: 5002 });

        // server.on('connection', function connection(ws){
        //     console.log("Connected a new client");

        // });

        // server.on('closed', function (id){
        //     console.log("connection closed");
        //     console.log(id);
        // });

        // server.on('error', function (err){
        //     console.log(err)
        // })

        //websocket connection event will return a socket you can later use

        binanceWS.on("open", function() {
            console.log("connected to Binance");
        });


        binanceWS.on('message', function(data){
            let newYork    = moment.tz(new Date(), "America/New_York");
            const isNewYorkMarketTime = calculateNewYorkMarketTime(newYork)
            
            const newData = data.toString('utf8')
            const jsonData = JSON.parse(newData)
            console.log("message: ", newData);
            const count = 0;
            // const marketOpen = MarketOpen.findOne({ where: { id: 1 }, raw: true })
            // marketOpen
            //     .then((result) => {
            //         if (result.start_point === 0) {
            //             console.log("here: ");
            //         }
            //     })
            //     .catch((err) => {
            //     console.log("err: ", err);
            // })

            if (isNewYorkMarketTime) {
                // const marketOpen = MarketOpen.findOne({ where: { id: 1 } })
                // marketOpen
                //     .then((result) => {
                //         console.log("marketOpen result: ", result);
                //     })
                //     .catch((err) => {
                //     console.log("err: ", err);
                // })
                // console.log(data);
                const newData = data.toString('utf8')
                const jsonData = JSON.parse(newData)
                console.log("message: ", newData);
                // server.clients.forEach(function each(client) {
                //     if (client.readyState === WebSocket.OPEN) {
                //         client.send(data);
                //     }
                // });   
            }
        })
    } catch (error) {
        console.log("error: ", error);
    }
}

const priceStreamFutures = async () => {
    try {
        const getMarketOpen = await MarketOpen.findOne(
            {where: { id: 1}}
        )
        // console.log("getMarketOpen before: ", getMarketOpen.is_open);
        let count = getMarketOpen.is_open;
        let newYork = moment.tz(new Date(), "America/New_York");
        let isNewYorkMarketTime = calculateNewYorkMarketTime(newYork)
        let openPrice = 0;
        let newMarkTrade = {};
        let todaysDate =  moment.tz(new Date(), "America/New_York");
        // console.log("todaysDate: ", todaysDate.hour());
        let isHigh = false;
        let isBep = false;
        let peakPrice = 0;
        let bepPrice = 0;
        let isClose = false;

        const todayStart = new Date(new Date().setHours(0, 0, 0, 0));
        const todayRecord = new Date();
        let getOpenPrice = await MarkTradeFutures.findOne(
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
            // .then((result) => {
            //     if (result !== null && result !== undefined) {
            //         console.log("here");
            //         openPrice = result.price;
            //     } else {
            //         console.log("there");
            //         openPrice = 0;
            //     }
            // })
            // .catch((e) => {
            //     console.log("catch e: ", e);
            // })
        // console.log("getOpenPrice: ", getOpenPrice);
        if (getOpenPrice !== null) {
            openPrice = getOpenPrice.price
        } else {
            openPrice = 0
        }
        let testCount = 0;

        
        const WebSocket = require('ws');
        const binanceWS = new WebSocket('wss://fstream.binance.com/ws/btcusdt@aggTrade') // futures
        // const binanceWS = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade') // spot
        // const binanceWS = new WebSocket('wss://fstream.binance.com/stream?streams=bnbusdt@aggTrade/btcusdt@markPrice')

        // websocket connection event will return a socket you can later use

        binanceWS.on("open", function() {
            console.log("connected to Binance");
        });

        binanceWS.on('message', function(data){
            
            // console.log("count after: ", count);
            const newData = data.toString('utf8')
            const jsonData = JSON.parse(newData)
            // console.log("message: ", newData);
            // let interval = 2000
            // setTimeout(function timeout() {
            //     console.log("interval: ", interval);
            //     // ws.send(Date.now());
            //     if (count === false) {
            //         console.log("is false ");
            //         const updateMarketOpen = MarketOpen.update(
            //             { is_open: true },
            //             {where: { id: 1}}
            //         )
            //             .then((result) => {
            //                 console.log("result: ", result);
            //             })
            //             .catch((err) => {
            //                 console.log("err: ", err);
            //             })
            //                 count = true
            //     } else {
            //         console.log("is true ");
            //         // count = false
            //     }
            // }, interval);
            // console.log("price: ", price);
            // console.log("todaysDate.minute(): ", todaysDate.minute());

            let newTime    = moment.tz(newMarkTrade.trade_time, "America/New_York");
            // console.log("jsonData.p: ", jsonData.p);
            let newPrice = Number(jsonData.p)
            // if (true){
            if (isNewYorkMarketTime) {
                // if today hour equals 0
                if (count === false && todaysDate.hour() === 0) {
                    // if (count === false) {
                    // console.log("is false ");
                    const updateMarketOpen = MarketOpen.update(
                        { is_open: true },
                        { where: { id: 1 } }
                    )
                        .then((result) => {
                            console.log("result: ", result);
                            count = true
                        })
                        .catch((err) => {
                            console.log("err: ", err);
                        })

                    // trade spot
                    // {"e":"trade","E":1709997824915,"T":1709997824915,"s":"BTCUSDT","t":4707380043,"p":"68298.00","q":"0.002","X":"MARKET","m":true}

                    // trade futures
                    // {"e":"aggTrade","E":1709998514796,"a":2061235376,"s":"BTCUSDT","p":"68384.30","q":"0.082","f":4707390724,"l":4707390725,"T":1709998514643,"m":false}
                    // {
                    //     "e": "aggTrade", event type
                    //     "E": 1710000837730, event time
                    //     "a": 2061250343, aggregate trade ID
                    //     "s": "BTCUSDT", symbol
                    //     "p": "68212.80", price
                    //     "q": "0.027", quantity
                    //     "f": 4707428480, first trade ID
                    //     "l": 4707428482, last trade ID
                    //     "T": 1710000837576, trade time
                    //     "m": false Is the buyer the market maker?
                    // }

                    newMarkTrade = {
                        symbol_name: jsonData.s,
                        quantity: jsonData.q,
                        price: jsonData.p,
                        mark_position_id: 1,
                        trade_time: new Date(jsonData.T),
                        aggregate_trade_id: jsonData.a
                    }
                    openPrice = newMarkTrade.price;

                    const firstPosition = MarkTradeFutures.create(newMarkTrade)
                        .then((result) => {
                            // console.log("result create firstPosition: ", result);
                        })
                        .catch((err) => {
                            console.log("err catch: ", err);
                        })

                    console.log("openPrice is: ", openPrice);
                    console.log("isNewYorkMarketTime: ", isNewYorkMarketTime);
                // } else if (todaysDate.hour() === 0 && todaysDate.minute() === 59 && isBep === false) {
                } else if (testCount === 0) {
                    console.log("setting BEP: ", testCount);
                    // console.log("setting BEP");
                    getBinanceKlinesNewyorkOpen(newPrice)
                        .then((resultKlinesNewYorkOpen) => {
                            console.log("resultKlinesNewYorkOpen: ", resultKlinesNewYorkOpen);
                            // bepPrice = priceOutput
                            if (resultKlinesNewYorkOpen !== undefined) {
                                bepPrice = resultKlinesNewYorkOpen.price
                                isHigh = resultKlinesNewYorkOpen.isHigh
                                isBep = true
                                testCount = 1
                            }
                        })
                        .catch((err) => {
                            console.log("err: ", err);
                        })
                    } else {
                        // console.log("isBep: ", isBep);
                        // console.log("todaysDate.hour() === 0: ", todaysDate.hour() === 0);
                        // console.log("todaysDate.minute() === 59: ", todaysDate.minute() === 59);
                        // console.log("todaysDate.second() === 0: ", todaysDate.second() === 0);
                    // count = false
                    const isOverOneHour = overOneHourAfterOpen(newTime)
                        // console.log("isOverOneHour: ", isOverOneHour);
                    if (isOverOneHour) {
                        // if (isBep === false) {
                        //     // if (newPrice >= openPrice && resultKlinesNewYorkOpen.isHigh === true) {
                        //     if (newPrice >= openPrice && isHigh === false) {
                        //         console.log("high: ");
                        //         // isHigh = false
                        //         isBep = true
                        //     // } else if (newPrice <= openPrice && resultKlinesNewYorkOpen.isHigh === false) {
                        //     } else if (newPrice <= openPrice && isHigh === true) {
                        //         console.log("low");
                        //         // isHigh = true
                        //         isBep = true
                        //     }
                        // }
                        let newCloseTrade = {
                            symbol_name: jsonData.s,
                            quantity: jsonData.q,
                            price: jsonData.p,
                            mark_position_id: 4,
                            trade_time: new Date(jsonData.T),
                            aggregate_trade_id: jsonData.a
                        }
                        if (isBep) {
                            if (isClose === false) {
                                // close OHLC
                                if (newPrice >= bepPrice && isHigh === false) {
                                    const closePosition = MarkTradeFutures.create(newCloseTrade)
                                        .then((result) => {
                                            // console.log("result create firstPosition: ", result);
                                            isClose = true
                                            count = false
                                        })
                                        .catch((err) => {
                                            console.log("err catch: ", err);
                                        })
                                }

                                // close OHLC
                                if (newPrice <= bepPrice && isHigh === true) {
                                    const closePosition = MarkTradeFutures.create(newCloseTrade)
                                        .then((result) => {
                                            // console.log("result create firstPosition: ", result);
                                            isClose = true
                                            count = false
                                        })
                                        .catch((err) => {
                                            console.log("err catch: ", err);
                                        })
                                }

                                // rug pull low
                                if (newPrice <= bepPrice && isHigh === false) {
                                    const closePosition = MarkTradeFutures.create(newCloseTrade)
                                        .then((result) => {
                                            // console.log("result create firstPosition: ", result);
                                            isClose = true
                                            count = false
                                        })
                                        .catch((err) => {
                                            console.log("err catch: ", err);
                                        })
                                }

                                // rug pull high
                                if (newPrice >= bepPrice && isHigh === true) {
                                    const closePosition = MarkTradeFutures.create(newCloseTrade)
                                        .then((result) => {
                                            // console.log("result create firstPosition: ", result);
                                            isClose = true
                                            count = false
                                        })
                                        .catch((err) => {
                                            console.log("err catch: ", err);
                                        })
                                }
                            }
                        }

                    }
                    // console.log("isOverOneHour: ", isOverOneHour);
                }

                // const marketOpen = MarketOpen.findOne({ where: { id: 1 }, raw: true })
                // marketOpen
                //     .then((result) => {
                //         if (result.start_point === 0) {
                //             console.log("here: ");
                //         }
                //     })
                //     .catch((err) => {
                //     console.log("err: ", err);
                // })

                if (todaysDate.hour() === 12) {
                    const updateMarketOpen = MarketOpen.update(
                        { is_open: false },
                        {where: { id: 1}}
                    )
                }
            }
        })
    } catch (error) {
        console.log("error: ", error);
    }
}

export const getBinanceKlinesNewyorkOpen = async (price) => {
    try {
        let peakPrice = 0;
        let priceClose = 0;
        let priceTemp = 0;
        const client = new USDMClient({
            api_key: API_KEY,
            api_secret: API_SECRET,
        });
        momentTz.tz.setDefault("America/New_York")
        let todayEnd = momentTz()
        let todayStart = momentTz().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        
        const params = {
            symbol: "BTCUSDT",
            interval: "15m",
            limit: 500,
            startTime: todayStart.unix()+"000",
            endTime: todayEnd.unix()+"000",
        }
        client
            .getKlines(params)
            .then((resp) => {
                const dataResponse = resp;
                let MarkTradeFuturesId = 0;
                let prices = []
                let isHigh = false;
                console.log("getBinanceKlinesNewyorkOpen: ");
                dataResponse.map((item, i) => {
                    // console.log("item: ", item);
                    prices.push(Number(item[1]) + Number(item[4])/2)
                    if (Number(item[1]) + Number(item[4]) > peakPrice) {
                        let newMarkTrade = {
                            symbol_name: params.symbol,
                            quantity: 1,
                            price: price,
                            mark_position_id: 3,
                            trade_time: new Date(item[6]),
                            aggregate_trade_id: i
                        }
                        if (peakPrice === 0) {
                            const firstPosition = MarkTradeFutures.create(newMarkTrade)
                                .then((result) => {
                                    MarkTradeFuturesId = result.id
                                    // console.log("result create firstPosition: ", result);
                                })
                                .catch((err) => {
                                    console.log("err catch: ", err);
                                })
                        } else {
                            const updatePosition = MarkTradeFutures.update(
                                newMarkTrade,
                                {
                                    where: {
                                        id: MarkTradeFuturesId
                                    }
                                }
                            )
                                .then((result) => {
                                    // console.log("result create updatePosition: ", result);
                                })
                                .catch((err) => {
                                    console.log("err catch: ", err);
                                })
                        }
                        peakPrice = (Number(item[1])+Number(item[4]))/2
                        if (isHigh) {
                            priceTemp = ((Number(item[1]) + Number(item[4]))/2) - price
                            priceClose = price - priceTemp
                        } else {
                            priceTemp = price - ((Number(item[1]) + Number(item[4]))/2)
                            priceClose = price + priceTemp
                        }

                    }
                })
                prices.map((item, i) => {
                    if (i !== 0 && i !== prices.length) {
                        if (i < 3) {
                            if (item[i] >= item[i - 1]) {
                                isHigh = true
                            } else {
                                isHigh = false
                            }
                        }
                    }
                })
                let dataOutput = {
                    priceClose: priceClose,
                    isHigh: isHigh
                }
                console.log("dataOutput: ", dataOutput);
                return dataOutput
                // return response.success('getBinanceKlinesNewyorkOpen crypto success', res, data)
            })
            .catch((err) => {
                console.error('getBinanceKlinesNewyorkOpen error: ', err);
                // return response.error('error', res)
            });
    } catch (error) {
        console.log("err getBinanceKlinesNewyorkOpen try catch: ", error);
    }
}

// export const findPresentMarkTradeFutures = async (position, date) => {
//         const NOW = new Date();
//         const presentMarkTradeFutures = MarkTradeFutures.findOne(
//             {
//                 where: {
//                     trade_time: NOW,
//                     mark_position_id: 1
//             }}
//         )
//         console.log("presentMarkTradeFutures: ", presentMarkTradeFutures);
//         return presentMarkTradeFutures
//     }

export {
    calculateNewYorkMarketTime,
    connectStreamFutureBinance,
    priceStreamFutures
}