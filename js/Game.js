import { Ability } from "./Ability.js";
import { Investment } from "./Investment.js";
import { RealEstate } from "./RealEstate.js";

class Game{
    #updatePerMillisecond = 1000;
    #player;
    #items;
    constructor(player){
        this.#player = player;
        this.#items = [
            new Ability("Flip Machine", 500, 15000, 25),
            new Investment("ETF Stock", Infinity, 300000, 0.1),
            new Investment("ETF Bonds", Infinity, 300000, 0.07),
            new RealEstate("Lemonade Stand", 1000, 30000, 30),
            new RealEstate("Ice Cream Truck", 500, 100000, 120),
            new RealEstate("House", 100, 2000000, 32000),
            new RealEstate("Town House", 100, 4000000, 64000),
            new RealEstate("Mansion", 20, 25000000, 500000),
            new RealEstate("Industrial Space", 10, 1000000000, 2200000),
            new RealEstate("Hotel Skyscraper", 5, 10000000000, 25000000),
            new RealEstate("Bullet-Speed Sky Railway", 10000000000000, 30000000000)
        ];
    }
    start(){}
    update(){
        setInterval(function(){
            this.#player.workForDay();
        }, this.#updatePerMillisecond);
    }
    draw(){}
}

export { Game };