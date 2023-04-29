import { Item } from "./Item.js";

class Investment extends Item{
    #interest;
    constructor(name, maxStock, price, interest){
        super(name, maxStock, price);
        this.#interest = interest;
    }
    provideBenefit(player, quantity){
        player.addDailyWage(super.getPrice() * quantity * this.#interest);
    }
}

export { Investment };
