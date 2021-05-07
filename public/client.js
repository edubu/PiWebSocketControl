const socket = io('http://192.168.0.21:3000');

let rpi = {};
let initialized = false;

const init = () => {
    const led0_button = document.getElementById('led0');
    const led1_button = document.getElementById('led1');

    led0_button.onclick = () => {ledButton(rpi.ledList[0])}
    led1_button.onclick = () => {ledButton(rpi.ledList[1])}

    setInterval(update, 50);
};


const ledButton = (led) => {
    if(led.state){
        led.state = 0;
    } else {
        led.state = 1;
    }

    socket.emit('WEB-ledbtnclicked', led);
};

const update = () => {
    //Update LEDs
    for(let i = 0; i < rpi.ledList.length;i++){
        let leds = rpi.ledList[i];
        ledDOM = document.getElementById(leds.id);
        if(leds.state){
            ledDOM.style['background-color'] = "green";
            ledDOM.style['color'] = "black";
        } else {
            ledDOM.style['background-color'] = "red";
            ledDOM.style['color'] = "white";
        }
    }
};

// Connecting to server and calling init
socket.on('connect', () => {
    socket.emit('WEB-connect', {});
});

socket.on('RPI-data', (data) => {
    rpi = data;
    if(!initialized){
        init();
        initialized = true;
    }
    console.log("Data received: ", rpi);
});