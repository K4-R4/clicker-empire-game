import {Item} from "./Item.js";

class RealEstate extends Item {
    constructor(availableStock, imagePath, maxStock, name, price, soldStock, additionalDailyWage) {
        super(availableStock, imagePath, maxStock, name, price, soldStock);
        this.additionalDailyWage = additionalDailyWage;
    }

    getAdditionalDailyWage() {
        return this.additionalDailyWage;
    }

    getDescription() {
        return `+$${this.getAdditionalDailyWage().toLocaleString()} / sec`;
    }

    provideBenefit(player, quantity) {
        player.addDailyWage(this.getAdditionalDailyWage() * quantity);
    }
}

export {RealEstate};
