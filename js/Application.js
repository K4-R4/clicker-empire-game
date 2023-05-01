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
        playerStatsContainer.classList.add("col-12", "bg-secondary", "d-flex", "flex-wrap", "justify-content-around", "align-items-center", "py-2");
        playerStatsContainer.innerHTML =
            `
                <div class="bg-dark col-5 h5 p-3 my-2">${playerStats.name}</div>
                <div class="bg-dark col-5 h5 p-3 my-2">${playerStats.age} years old</div>
                <div class="bg-dark col-5 h5 p-3 my-2">${playerStats.daysGoneSinceBusinessStart} days</div>
                <div class="bg-dark col-5 h5 p-3 my-2">$${playerStats.money}</div>
            `;
        return playerStatsContainer;
    }
    generateShopContainer(){
        const items = this.#game.getItems();
        const container = document.createElement("div");
        container.setAttribute("id", "shop-container");
        container.classList.add("showcase", "my-2", "col-12", "bg-secondary", "d-flex", "flex-wrap", "justify-content-center", "align-items-center");
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
        itemContainer.classList.add("col-12", "d-flex", "flex-row", "bg-dark", "py-4", "my-1");
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
        return itemContainer;
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
}

export { Application };