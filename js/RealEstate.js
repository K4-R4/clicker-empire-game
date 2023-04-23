import { Item } from "./Item.js";

class RealEstate extends Item{
    #additionalDailyWage;
    constructor(name, maxStock, price, additionalDailyWage){
        super(name, maxStock, price);
        this.#additionalDailyWage = additionalDailyWage;
    }
    provideBenefit(player, amountToBuy){
        player.addDailyWage(this.additionalDailyWage * amountToBuy);
    }
}

export { RealEstate };
