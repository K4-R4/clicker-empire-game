class Item{
    constructor(name, maxStock, price){
        this.#name = name;
        this.#maxStock = maxStock;
        this.#stockInUse = 0;
        this.#price = price;
    }
    getMaxStock(){
        return this.#maxStock;
    }
    getStockInUse(){
        return this.#stockInUse;
    }
    setStockInUse(amount){
        this.#stockInUse = amount;
    }
    buy(amount){
        const availableStock = this.getMaxStock() - this.getStockInUse();
        const amountToBuy = Math.min(Math.max(amount, 0), availableStock);
        this.setStockInUse(availableStock - amountToBuy);
        return amountToBuy;
    }
}