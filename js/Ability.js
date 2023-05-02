import { Item } from "./Item.js";

class Ability extends Item{
    constructor(imagePath, maxStock, name, price, additionalWagePerClick){
        super(imagePath, maxStock, name, price);
        this.additionalWagePerClick = additionalWagePerClick;
    }
    getAdditionalWagePerClick(){
        return this.additionalWagePerClick;
    }
    provideBenefit(player, quantity){
        player.addWagePerClick(this.getAdditionalWagePerClick() * quantity);
    }
}

export { Ability };
