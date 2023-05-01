import { Ability } from "./Ability.js";
import { Investment } from "./Investment.js";
import { RealEstate } from "./RealEstate.js";

class Game{
    #updatePerMillisecond = 1000;
    #player;
    #items;
    #gameUpdateEvent;
    constructor(player){
        this.#player = player;
        this.#items = [
            new Ability("Flip Machine", 500, 15000, "../img/flip-machine.png", 25),
            new Investment("ETF Stock", Infinity, 300000, "../img/stock.png", 0.1),
            new Investment("ETF Bonds", Infinity, 300000, "../img/stock.png", 0.07),
            new RealEstate("Lemonade Stand", 1000, 30000, "../img/lemonade.png", 30),
            new RealEstate("Ice Cream Truck", 500, 100000, "../img/ice-cream-truck.png", 120),
            new RealEstate("House", 100, 2000000, "../img/house.png", 32000),
            new RealEstate("Town House", 100, 4000000, "../img/townhouse.png", 64000),
            new RealEstate("Mansion", 20, 25000000, "../img/mansion.png", 500000),
            new RealEstate("Industrial Space", 10, 1000000000, "../img/industrial-space.png", 2200000),
            new RealEstate("Hotel Skyscraper", 5, 10000000000, "../img/hotel.png", 25000000),
            new RealEstate("Bullet-Speed Sky Railway", 1, 10000000000000, "../img/bullet-train.png", 30000000000)
        ];
        this.#gameUpdateEvent = new CustomEvent("gameUpdate");
    }
    getUpdatePerMillisecond(){
        return this.#updatePerMillisecond;
    }
    getItems(){
        return this.#items;
    }
    getPlayerStats(){
        return this.#player.getStats();
    }
    update(){
        setInterval(() => {
            this.#player.workForDay();
            document.dispatchEvent(this.#gameUpdateEvent);
        }, this.getUpdatePerMillisecond());
    }
    click(){
        this.#player.click();
        document.dispatchEvent(this.#gameUpdateEvent);
    }
    isValidOrder(item, quantity){
        if(!item.isStockAvailable(quantity)) return false;
        const amount = item.calculateTotalCost(quantity);
        return this.#player.isAffordable(amount);
    }
    executeOrder(item, quantity){
        const amount = item.calculateTotalCost(quantity);
        this.#player.buyItem(amount);
        item.transact(quantity);
        item.provideBenefit(this.#player, quantity);
    }
}

export { Game };