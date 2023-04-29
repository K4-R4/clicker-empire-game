import { Item } from "./Item.js";

class RealEstate extends Item{
    #additionalDailyWage;
    constructor(name, maxStock, price, additionalDailyWage){
        super(name, maxStock, price);
        this.#additionalDailyWage = additionalDailyWage;
    }
    provideBenefit(player, quantity){
        player.addDailyWage(this.#additionalDailyWage * quantity);
    }
}

export { RealEstate };
