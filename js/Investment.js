import { Item } from "./Item.js";

class Investment extends Item{
    #interest;
    constructor(name, maxStock, price, interest){
        super(name, maxStock, price);
        this.#interest = interest;
    }
    provideBenefit(player, amountToBuy){
        player.addDailyWage(this.price * amountToBuy * this.#interest);
    }
}

export { Investment };
