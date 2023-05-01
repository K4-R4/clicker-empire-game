import { Item } from "./Item.js";

class Investment extends Item{
    #interest;
    constructor(name, maxStock, price, imagePath, interest){
        super(name, maxStock, price, imagePath);
        this.#interest = interest;
    }
    provideBenefit(player, quantity){
        player.addDailyWage(super.getPrice() * quantity * this.#interest);
    }
}

export { Investment };
