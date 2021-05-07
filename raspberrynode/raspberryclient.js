const io = require('socket.io-client');
// RPI imports
const Rpi = require('./rpi').Rpi;
const socket = io('http://192.168.0.21:3000');

let raspi = new Rpi();
raspi.createLed(11, 'led0', 0);
raspi.createLed(13, 'led1', 0);
let rpi = raspi.getInfo();


// connect and establish data transfer
socket.on('connect', () => {
    socket.emit('RPI-connect', rpi);
    setInterval(() => {
        rpi = raspi.getInfo();
        socket.emit('RPI-connect', rpi);
    }, 50);
});

socket.on('TORPI-setled', (led) => {
    raspi.setLed(led.id, led.state);
});