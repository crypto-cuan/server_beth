
const connectSocket = (cryptoServer) => {
    console.log("here 1");
    const io = require('socket.io')(cryptoServer);

    const ioConnection = io.on('connection', function(socket) {
        console.log(socket.id)
        socket.on('SEND_MESSAGE', function(data) {
            io.emit('MESSAGE', data)
        });
    });
}


const connectBinanceStream = (cryptoServer) => {
    console.log("here 2");
    const io = require('socket.io')(cryptoServer);

    const ioConnection = io.on('connection', function(socket) {
        console.log(socket.id)
        socket.on('SEND_BINANCE', function(data) {
            io.emit('BINANCE', data)
        });
    });
}
export default {
    connectSocket,
    connectBinanceStream
}