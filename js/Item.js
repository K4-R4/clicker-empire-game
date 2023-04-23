class Item{
    #name;
    #maxAmount;
    #amountInUse;
    #price;
    constructor(name, maxAmount, price){
        this.#name = name;
        this.#maxAmount = maxAmount;
        this.#amountInUse = 0;
        this.#price = price;
    }
    getName(){
        return this.#name;
    }
    getMaxStock(){
        return this.#maxAmount;
    }
    getStockInUse(){
        return this.#amountInUse;
    }
    addStockInUse(amount){
        this.#amountInUse += amount;
    }
    getPrice(){
        return this.#price;
    }
    buy(player, amount){
        const availableStock = this.getMaxStock() - this.getStockInUse();
        const amountToBuy = Math.min(Math.max(amount, 0), availableStock);
        this.addStockInUse(amountToBuy);
        this.provideBenefit(player, amountToBuy);
        return amountToBuy;
    }
    calculatePrice(amount){
        return this.getPrice() * amount;
    }
    provideBenefit(player, amount){
        throw new Error('Method "provideBenefit()" must be implemented.');
    }
}

export { Item };
