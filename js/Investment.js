import { Item } from "./Item.js";

class Investment extends Item{
    constructor(availableStock, imagePath, maxStock, name, price, interest){
        super(availableStock, imagePath, maxStock, name, price);
        this.interest = interest;
    }
    getInterest(){
        return this.interest;
    }
    provideBenefit(player, quantity){
        player.addDailyWage(super.getPrice() * quantity * this.getInterest());
    }
}

export { Investment };
