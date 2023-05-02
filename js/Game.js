class Game{
    constructor(player, items){
        this.items = items;
        this.player = player;
        this.playerStatsUpdatedEvent = new CustomEvent("playerStatsUpdated");
        this.updatePerMillisecond = 1000;
    }
    getItems(){
        return this.items;
    }
    getPlayer(){
        return this.player;
    }
    getPlayerStats(){
        return this.getPlayer().getStats();
    }
    getUpdatePerMillisecond(){
        return this.updatePerMillisecond;
    }
    startGameLoop(){
        setInterval(() => {
            this.getPlayer().workForDay();
            document.dispatchEvent(this.playerStatsUpdatedEvent);
        }, this.getUpdatePerMillisecond());
    }
    click(){
        this.getPlayer().click();
        document.dispatchEvent(this.playerStatsUpdatedEvent);
    }
    executeOrder(item, quantity){
        const amount = item.calculateTotalCost(quantity);
        this.getPlayer().buyItem(amount);
        item.transact(quantity);
        item.provideBenefit(this.getPlayer(), quantity);
        dispatchEvent(this.playerStatsUpdatedEvent);
    }
}

export { Game };