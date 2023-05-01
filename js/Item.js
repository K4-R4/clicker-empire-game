class Item{
    #name;
    #maxStock;
    #availableStock;
    #price;
    #imagePath;
    constructor(name, maxStock, price, imagePath){
        this.#name = name;
        this.#maxStock = maxStock;
        this.#availableStock = maxStock;
        this.#price = price;
        this.#imagePath = imagePath;
    }
    getName(){
        return this.#name;
    }
    getMaxStock(){
        return this.#maxStock;
    }
    getAvailableStock(){
        return this.#availableStock;
    }
    getPrice(){
        return this.#price;
    }
    getImagePath(){
        return this.#imagePath;
    }
    setAvailableStock(quantity){
        this.#availableStock = quantity;
    }
    transact(quantity){
        this.setAvailableStock(this.getAvailableStock() - quantity);
    }
    isStockAvailable(quantity){
        return quantity > 0 && quantity <= this.getAvailableStock();
    }
    calculateTotalCost(quantity){
        return this.getPrice() * quantity;
    }
    provideBenefit(player, quantity){
        throw new Error('Method "provideBenefit()" must be implemented.');
    }
}

export { Item };
