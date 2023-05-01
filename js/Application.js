import { Game } from "./Game.js";
import {Player} from "./Player.js";

class Application{
    #game;
    #initialPage = document.getElementById("initial-page");
    #loginForm = this.#initialPage.querySelector("#login-form");
    #gamePage = document.getElementById("game-page");
    #hamburgerImage = "../img/hamburger.png";
    constructor() {
        this.#loginForm.addEventListener("submit", (event) => {
            const player = this.initializeUserAccount();
            event.preventDefault();
            this.#game = new Game(player);
            this.displayBlock(this.#initialPage);
            this.displayNone(this.#gamePage);
            this.#gamePage.append(this.generateGamePage());
            this.#game.startGameLoop();
        });
        document.addEventListener("playerStatsUpdated", () => {
            this.updatePlayerStats()
        });
        document.addEventListener("transactionMade", () => {
            this.updateShop();
        });
    }
    getHamburgerImage(){
        return this.#hamburgerImage;
    }
    displayNone(ele){
        ele.classList.add("d-block");
        ele.classList.remove("d-none");
    }
    displayBlock(ele){
        ele.classList.add("d-none");
        ele.classList.remove("d-block");
    }
    initializeUserAccount(){
        const playerName = this.#loginForm.querySelector(`input[name="user-name"]`).value;
        if(playerName === ""){
            alert("Please put your name");
            return;
        }
        return new Player(playerName);
    }
    generateGamePage(){
        const container = document.createElement("div");
        container.classList.add("bg-dark", "vh-75", "d-flex", "justify-content-center", "col-12", "text-white", "text-center");
        container.append(this.generateLeftColumnOfGamePage(), this.generateRightColumnOfGamePage());
        return container;
    }
    generateLeftColumnOfGamePage(){
        const leftColumn = document.createElement("div");
        leftColumn.setAttribute("id", "left-column");
        leftColumn.classList.add("col-5", "flex-column", "my-2", "ml-2", "mr-1");
        leftColumn.append(this.generateScoreContainer(), this.generateHamburgerContainer());
        return leftColumn;
    }
    generateRightColumnOfGamePage(){
        const rightColumn = document.createElement("div");
        rightColumn.setAttribute("id", "right-column");
        rightColumn.classList.add("col-7", "my-2", "mr-2", "ml-1");
        rightColumn.append(this.generatePlayerStatsContainer(), this.generateShopContainer());
        return rightColumn;
    }
    generateScoreContainer(){
        const playerStats = this.#game.getPlayerStats();
        const scoreContainer = document.createElement("div");
        scoreContainer.setAttribute("id", "score-container");
        scoreContainer.classList.add("col-12", "bg-secondary", "py-3", "flex-grow-0");
        scoreContainer.innerHTML =
            `
                <h3>${playerStats.hamburgerCount} Burgers</h3>
                <h5>one click $${playerStats.wagePerClick}</h5>
            `;
        return scoreContainer;
    }
    generateHamburgerContainer(){
        const hamburgerContainer = document.createElement("div");
        hamburgerContainer.classList.add("col", "h-75", "d-flex", "justify-content-center", "align-items-center", "flex-grow-1");
        hamburgerContainer.innerHTML =
            `
                <img alt="Hamburger" src="${this.getHamburgerImage()}" class="hamburger scaleOnClick w-50">
            `;
        hamburgerContainer.append();
        hamburgerContainer.addEventListener("click", () => {
            this.#game.click();
        });
        return hamburgerContainer;
    }
    generatePlayerStatsContainer(){
        const playerStats = this.#game.getPlayerStats();
        const playerStatsContainer = document.createElement("div");
        playerStatsContainer.setAttribute("id", "player-stats-container");
        playerStatsContainer.classList.add("player-stats", "col-12", "bg-secondary", "d-flex", "flex-wrap", "justify-content-around", "align-items-center", "py-2");
        playerStatsContainer.innerHTML =
            `
                <div class="bg-dark col-5 h5 p-2 my-1">${playerStats.name}</div>
                <div class="bg-dark col-5 h5 p-2 my-1">${playerStats.age} years old</div>
                <div class="bg-dark col-5 h5 p-2 my-1">${playerStats.daysGoneSinceBusinessStart} days</div>
                <div class="bg-dark col-5 h5 p-2 my-1">$${playerStats.money}</div>
            `;
        return playerStatsContainer;
    }
    generateShopContainer(){
        const items = this.#game.getItems();
        const container = document.createElement("div");
        container.setAttribute("id", "shop-container");
        container.classList.add("shop-page", "my-2", "py-2", "col-12", "bg-secondary", "d-flex", "flex-wrap", "justify-content-center", "align-items-center");
        for(const item of items){
            container.append(this.generateItemContainer(item));
        }
        return container;
    }
    generateItemContainer(item){
        const itemContainer = document.createElement("div");
        const thumbnail = document.createElement("div");
        const description = document.createElement("div");
        const stock = document.createElement("div");
        itemContainer.classList.add("col-12", "d-flex", "flex-row", "bg-dark", "py-4", "my-2");
        thumbnail.classList.add("col-4");
        description.classList.add("col-7", "d-flex", "flex-column", "justify-content-center", "align-items-center", "text-start");
        stock.classList.add("col-1", "d-flex", "justify-content-center", "align-items-center");
        thumbnail.innerHTML =
            `
                <img alt="thumbnail" src="${item.getImagePath()}" class="thumbnail">
            `;
        description.innerHTML =
            `
                <h3>${item.getName()}</h3>
                <h4>$${item.getPrice()}</h4>
            `;
        stock.innerHTML =
            `
                <h3>${item.getMaxStock() - item.getAvailableStock()}</h3>
            `
        itemContainer.append(thumbnail, description, stock);

        itemContainer.addEventListener("click", () => {
            document.getElementById("shop-container").remove();
            document.getElementById("right-column").append(this.generateTransactionContainer(item));
        });
        return itemContainer;
    }
    generateTransactionContainer(item){
        const transactionContainer = document.createElement("div");
        transactionContainer.setAttribute("id", "transaction-container");
        transactionContainer.classList.add("transaction-page", "my-2", "py-2", "col-12", "d-flex", "flex-row", "flex-wrap", "bg-secondary", "py-4", "my-1");
        transactionContainer.innerHTML =
            `
                <div class="col-8">
                    <h4>${item.getName()}</h4>
                    <p>
                        Max Purchase: ${item.getMaxStock()}</br>
                        Price: $${item.getPrice()}</br>
                    </p>
                </div>
                <div class="col-4">
                    <img alt="thumbnail" src="${item.getImagePath()}" class="thumbnail">
                </div>
                <div class="col-12 form-group">
                    <label for="number-of-orders" class="col-12 col-form-label text-left">How many would you like to purchase?</label>
                    <input type="number" name="number-of-orders" value="0" id="number-of-orders" class="col-12 form-control text-right">
                </div>
            `;

        const buttons = this.createButtons("Go Back", "Purchase");
        const backButton = buttons.querySelector(".back-button");
        const nextButton = buttons.querySelector(".next-button");
        backButton.addEventListener("click", () => {
            const rightColumn = document.getElementById("right-column");
            document.getElementById("transaction-container").remove();
            rightColumn.append(this.generateShopContainer());
        });
        nextButton.addEventListener("click", () => {
            const quantity = document.getElementById("number-of-orders").value;
            const amount = item.calculateTotalCost(quantity);
            if(!item.isStockAvailable(quantity)){
                alert("Invalid number");
                return;
            }
            if(!this.#game.getPlayer().isAffordable(amount)){
                alert("You don't have enough money");
                return;
            }
            this.#game.executeOrder(item, quantity);

            const rightColumn = document.getElementById("right-column");
            document.getElementById("transaction-container").remove();
            rightColumn.append(this.generateShopContainer());
        });
        transactionContainer.append(buttons);
        return transactionContainer;
    }
    updatePlayerStats(){
        const leftColumn = this.#gamePage.querySelector("#left-column");
        const rightColumn = this.#gamePage.querySelector("#right-column");

        document.getElementById("score-container").remove();
        leftColumn.prepend(this.generateScoreContainer());
        document.getElementById("player-stats-container").remove();
        rightColumn.prepend(this.generatePlayerStatsContainer());
    }
    updateShop(){
        const rightColumn = this.#gamePage.querySelector("#right-column");

        document.getElementById("shop-container").remove();
        rightColumn.append(this.generateShopContainer());
    }
    createButtons(leftButtonName, rightButtonName){
        const buttons = document.createElement("div");
        const leftButton = document.createElement("button");
        const rightButton = document.createElement("button");

        buttons.classList.add("col-12", "d-flex", "justify-content-around", "align-items-center");
        leftButton.classList.add("btn", "btn-light", "col-5", "back-button");
        rightButton.classList.add("btn", "btn-primary", "col-5", "next-button");

        leftButton.innerHTML = leftButtonName;
        rightButton.innerHTML = rightButtonName;
        buttons.append(leftButton, rightButton);
        return buttons;
    }
}

export { Application };