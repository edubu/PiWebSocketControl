const Led = require('./components/led').Led;

class Rpi {

    constructor(){
        // Connect Components
        this.rpi = {
            //ledList[led0...ledn]
            //
        };
        this.ledList = [];

        //update
        let interval = 50;
        setInterval(() => {
            this.update();
        }, interval);
    }

    createLed = (pin, id, initialState) => {
        this.ledList.push(new Led(pin, id, initialState));
        this.rpi.ledList = this.ledList;
    }

    // Set led state
    setLed = (id, state) => {
        for(let i = 0; i < this.ledList.length;i++){
            if(this.ledList[i].id == id){
                if(state == 1){
                    this.ledList[i].state = 1;
                } else {
                    this.ledList[i].state = 0;
                }
            }
        }
    }

    //getIds
    getInfo = () => {
        return this.rpi;
    };

    //Update
    update = () => {
        // Update LEDS
        for(let i = 0; i < this.ledList.length;i++){
            if(this.ledList[i].state == 1){
                this.ledList[i].on();
            } else {
                this.ledList[i].off();
            }
        }

        //update Info
        this.rpi.ledList = this.ledList;
    }
}

module.exports = {
    Rpi: Rpi
};