import { Item } from "./Item.js";

class Ability extends Item{
    #additionalWagePerClick;
    constructor(name, maxStock, price, imagePath, additionalWagePerClick){
        super(name, maxStock, price, imagePath);
        this.#additionalWagePerClick = additionalWagePerClick;
    }
    provideBenefit(player, quantity){
        player.addWagePerClick(this.#additionalWagePerClick * quantity);
    }
}

export { Ability };
