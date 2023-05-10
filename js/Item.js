class Item {
    constructor(availableStock, imagePath, maxStock, name, price, soldStock) {
        this.availableStock = availableStock;
        this.imagePath = imagePath;
        this.maxStock = maxStock;
        this.name = name;
        this.soldStock = soldStock;
        this.price = price;
    }

    getAvailableStock() {
        return this.availableStock;
    }

    getImagePath() {
        return this.imagePath;
    }

    getMaxStock() {
        return this.maxStock;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getSoldStock() {
        return this.soldStock;
    }

    getDescription() {
        throw new Error('Method "getDescription()" must be implemented.');
    }

    setAvailableStock(quantity) {
        this.availableStock = quantity;
    }

    setSoldStock(quantity) {
        this.soldStock = quantity;
    }

    isStockAvailable(quantity) {
        return quantity > 0 && quantity <= this.getAvailableStock();
    }

    transact(quantity) {
        this.setSoldStock(this.getSoldStock() + parseInt(quantity));
        this.setAvailableStock(this.getAvailableStock() - quantity);
    }

    provideBenefit(player, quantity) {
        throw new Error('Method "provideBenefit()" must be implemented.');
    }

    calculateTotalCost(quantity) {
        return this.getPrice() * Math.max(quantity, 0);
    }
}

export {Item};
