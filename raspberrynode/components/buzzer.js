const rpio = require('rpio');

class Buzzer {
    constructor(pin, id, dutyCycle){
        this.pin = pin;
        this.id = id;
        this.dutyCycle = dutyCycle;
    }
}

module.exports = {
    Buzzer: Buzzer
}