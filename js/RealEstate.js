import { Item } from "./Item.js";

class RealEstate extends Item{
    #additionalDailyWage;
    constructor(name, maxStock, price, imagePath, additionalDailyWage){
        super(name, maxStock, price, imagePath);
        this.#additionalDailyWage = additionalDailyWage;
    }
    provideBenefit(player, quantity){
        player.addDailyWage(this.#additionalDailyWage * quantity);
    }
}

export { RealEstate };
