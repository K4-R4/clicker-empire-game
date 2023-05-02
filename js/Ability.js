import { Item } from "./Item.js";

class Ability extends Item{
    constructor(availableStock, imagePath, maxStock, name, price, soldStock, additionalWagePerClick){
        super(availableStock, imagePath, maxStock, name, price, soldStock);
        this.additionalWagePerClick = additionalWagePerClick;
    }
    getAdditionalWagePerClick(){
        return this.additionalWagePerClick;
    }
    getDescription() {
        return `+$${this.getAdditionalWagePerClick()} / sec`;
    }

    provideBenefit(player, quantity){
        player.addWagePerClick(this.getAdditionalWagePerClick() * quantity);
    }
}

export { Ability };
