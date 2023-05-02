import { Item } from "./Item.js";

class Investment extends Item{
    constructor(imagePath, maxStock, name, price, interest){
        super(imagePath, maxStock, name, price);
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
