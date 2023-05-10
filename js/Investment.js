import {Item} from "./Item.js";

class Investment extends Item {
    constructor(availableStock, imagePath, maxStock, name, price, soldStock, interest) {
        super(availableStock, imagePath, maxStock, name, price, soldStock);
        this.interest = interest;
    }

    getInterest() {
        return this.interest;
    }

    getDescription() {
        return `+${this.getInterest()}% / sec`;
    }

    provideBenefit(player, quantity) {
        player.addDailyWage(Math.floor(super.getPrice() * quantity * this.getInterest() / 100));
    }
}

export {Investment};
