class Item{
    #name;
    #maxStock;
    #availableStock;
    #price;
    constructor(name, maxStock, price){
        this.#name = name;
        this.#maxStock = maxStock;
        this.#availableStock = maxStock;
        this.#price = price;
    }
    getName(){
        return this.#name;
    }
    getAvailableStock(){
        return this.#availableStock;
    }
    getPrice(){
        return this.#price;
    }
    setAvailableStock(quantity){
        this.#availableStock = quantity;
    }
    transact(quantity){
        this.setAvailableStock(this.getAvailableStock() - quantity);
    }
    isStockAvailable(quantity){
        return quantity >= this.getAvailableStock();
    }
    calculateTotalCost(quantity){
        return this.getPrice() * quantity;
    }
    provideBenefit(player, quantity){
        throw new Error('Method "provideBenefit()" must be implemented.');
    }
}

export { Item };
