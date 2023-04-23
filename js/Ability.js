import { Item } from "./Item.js";

class Ability extends Item{
    #additionalWagePerClick;
    constructor(name, maxStock, price, additionalWagePerClick){
        super(name, maxStock, price);
        this.#additionalWagePerClick = additionalWagePerClick;
    }
    provideBenefit(player, amountToBuy){
        player.addWagePerClick(this.#additionalWagePerClick * amountToBuy);
    }
}

export { Ability };
