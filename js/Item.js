class Item{
    constructor(imagePath, maxStock, name, price){
        this.availableStock = maxStock;
        this.imagePath = imagePath;
        this.maxStock = maxStock;
        this.name = name;
        this.price = price;
    }
    getAvailableStock(){
        return this.availableStock;
    }
    getImagePath(){
        return this.imagePath;
    }
    getMaxStock(){
        return this.maxStock;
    }
    getName(){
        return this.name;
    }
    getPrice(){
        return this.price;
    }
    setAvailableStock(quantity){
        this.availableStock = quantity;
    }
    isStockAvailable(quantity){
        return quantity > 0 && quantity <= this.getAvailableStock();
    }
    transact(quantity){
        this.setAvailableStock(this.getAvailableStock() - quantity);
    }
    provideBenefit(player, quantity){
        throw new Error('Method "provideBenefit()" must be implemented.');
    }
    calculateTotalCost(quantity){
        return this.getPrice() * quantity;
    }
}

export { Item };
