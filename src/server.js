// Server imports 
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
server.listen(3000, '0.0.0.0', () => {
    console.log("Listening on port 3000");
})

let raspiConnected = false;
let rpi = {};

io.on('connection', (socket) => {
    
    // Established connection protocol
    socket.on('RPI-connect', (data) => {
        if(!raspiConnected){
            raspiConnected = true;
            console.log('Raspberry Pi Connected');
        }
        rpi = data;
    });

    if(raspiConnected){
        socket.on('WEB-connect', () => {
            socket.emit('RPI-data', rpi);
            console.log('Web Client Connected');
            setInterval(() => {
                socket.emit('RPI-data', rpi);
            }, 50);
        });

        socket.on('CV-connect', () => {
            console.log('CV Client connected');
        });
    }

    // Connection Established

    // LED control from web client
    socket.on('WEB-ledbtnclicked', (led) => {
        socket.broadcast.emit('TORPI-setled', led);
    });

    // LED control from CV client
    socket.on('CV-setled', (ledJSON) => {
        led = JSON.parse(ledJSON);
        socket.broadcast.emit('TORPI-setled', led);
    });
});