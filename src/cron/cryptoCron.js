import { CronJob } from 'cron';
import { MarketOpen } from '../models';
import { priceStreamFutures } from '../helpers/crypto';

var cron = require('node-cron');

const markTransactionPerSecond = () => {
    const job = new CronJob(
        '1 * * * * *', // cronTime
        function () {
            console.log('You will see this message every second');
        }, // onTick
        null, // onComplete
        true, // start
        'Asia/Tokyo' // timeZone
    );
    // job.start()
    return job
    // const job = CronJob.from({
    //     cronTime: '* * * * * *',
    //     onTick: function () {
    //         console.log('You will see this message every second');
    //     },
    //     start: true,
    //     timeZone: 'America/Los_Angeles'
    // });
}

const markTransactionPer5Sec = () => {
    const job = new CronJob(
        '5 * * * * *', // cronTime
        function () {
            console.log('You will see this message every 5 second');
        }, // onTick
        null, // onComplete
        true, // start
        'Asia/Tokyo' // timeZone
    );
    // job.start()
    return job
}

const newyorkMarketOpen = () => {
    const job = new CronJob(
        '00 00 00 * * 0-7', // cronTime
        // '03 * * * * *', // cronTime
        async function () {
            console.log('You will see this message day at 00:00');
            const updateMarketOpen = await MarketOpen.update(
                { is_open: true },
                {where: { id: 1}}
            )
            // priceStreamFutures()
            console.log("updateMarketOpen: ", updateMarketOpen);
        }, // onTick
        null, // onComplete
        true, // start
        'America/New_York' // timeZone
    );
    job.start()
}


const newyorkMarketClose = () => {
    const job = new CronJob(
        // '00 00 3 * * *', // cronTime
        '10 * * * * *', // cronTime
        async function () {
            console.log('You will see this message every day at 03:00');
            const updateMarketOpen = await MarketOpen.update(
                { is_open: false },
                {where: { id: 1}}
            )
            const WebSocket = require('ws');
            const binanceWS = new WebSocket('wss://fstream.binance.com/ws/btcusdt@trade') // futures
            // binanceWS.onclose = function () {};
            // binanceWS.close();
            console.log("updateMarketOpen: ", updateMarketOpen);
        }, // onTick
        null, // onComplete
        true, // start
        'America/New_York' // timeZone
    );
    job.start()
}

const testNodeCron = () => {
    cron.schedule('2 * * * * *', () => {
    console.log('running every minute to 1 test node cron');
    });
}

const testNodeCron2 = () => {
    cron.schedule('5 * * * * *', () => {
    console.log('running every minute to 2 test node cron');
    });
}

export {
    markTransactionPerSecond,
    markTransactionPer5Sec,
    newyorkMarketOpen,
    newyorkMarketClose,
    testNodeCron,
    testNodeCron2
}