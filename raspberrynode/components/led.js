const rpio = require('rpio');

class Led {

    constructor(pin, id, initial_state){
        this.pin = pin;
        this.id = id;
        this.state = initial_state;

        if(initial_state){
            rpio.open(pin, rpio.OUTPUT, rpio.HIGH);
        } else {
            rpio.open(pin, rpio.OUTPUT, rpio.LOW);
        }
    }

    on = () => {
        rpio.write(this.pin, rpio.HIGH);
    }

    off = () => {
        rpio.write(this.pin, rpio.LOW);
    }
}
module.exports = {
    Led: Led
};