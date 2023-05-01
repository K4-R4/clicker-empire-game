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
            this.#game.start();
        });
        document.addEventListener("gameUpdate", () => {
            this.updateGamePage();
        })
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
    updateGamePage(){
        this.#gamePage.innerHTML = "";
        this.#gamePage.append(this.generateGamePage());
    }
    generateGamePage(){
        const playerStats = this.#game.getPlayerStats();
        const container = document.createElement("div");
        container.classList.add("bg-dark", "vh-75", "d-flex", "justify-content-center", "col-12", "text-white", "text-center");
        container.append(this.generateLeftColumnOfGamePage(playerStats), this.generateRightColumnOfGamePage(playerStats));
        return container;
    }
    generateLeftColumnOfGamePage(playerStats){
        const leftColumn = document.createElement("div");
        leftColumn.classList.add("col-5", "flex-column", "my-2", "ml-2", "mr-1");
        leftColumn.append(this.generateScoreContainer(playerStats), this.generateHamburgerContainer());
        return leftColumn;
    }
    generateRightColumnOfGamePage(playerStats){
        const rightColumn = document.createElement("div");
        rightColumn.classList.add("col-7", "my-2", "mr-2", "ml-1");
        rightColumn.append(this.generatePlayerStatsContainer(playerStats), this.generateShowcaseContainer());
        return rightColumn;
    }
    generateScoreContainer(playerStats){
        const scoreContainer = document.createElement("div");
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
                <img alt="Hamburger" src="${this.getHamburgerImage()}" class="hamburger w-100">
            `;
        hamburgerContainer.append();
        return hamburgerContainer;
    }
    generatePlayerStatsContainer(playerStats){
        const playerStatsContainer = document.createElement("div");
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
    generateShowcaseContainer(){
        const items = this.#game.getItems();
        const container = document.createElement("div");
        container.classList.add("showcase", "my-2", "col-12", "bg-secondary", "d-flex", "flex-wrap", "justify-content-center", "align-items-center");
        for(const item of items){
            container.append(this.generateItemContainer(item));
        }
        return container;
    }
    generateItemContainer(item){
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("col-12", "bg-dark", "my-2");
        itemContainer.innerHTML =
            `
                <p>${item.getName()}</p>
                <p>${item.getAvailableStock()}</p>
            `;
        return itemContainer;
    }
}

export { Application };