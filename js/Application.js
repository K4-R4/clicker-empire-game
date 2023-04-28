import { Game } from "./Game.js";
import {Player} from "./Player.js";

class Application{
    #game;
    #initialPage = document.getElementById("initial-page");
    #loginForm = this.#initialPage.querySelector("#login-form");
    #gamePage = document.getElementById("game-page");
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
        const playerStats = this.#game.getPlayerStats();
        const container = document.createElement("div");
        container.classList.add("bg-dark", "d-flex", "justify-content-center", "align-items-center", "col-12", "text-white", "text-center");

        const leftColumn = document.createElement("div");
        leftColumn.classList.add("col-5", "d-flex", "bg-secondary", "my-2", "ml-2", "mr-1");
        const scoreContainer = document.createElement("div");
        scoreContainer.classList.add("col-12");
        scoreContainer.innerHTML =
            `
                <h3>${playerStats.hamburgerCount} Burgers</h3>
                <h5>one click $${playerStats.wagePerClick}</h5>
            `;
        // add a hamburger image later
        const hamburgerIconContainer = document.createElement("div");
        leftColumn.append(scoreContainer, hamburgerIconContainer);

        const rightColumn = document.createElement("div");
        rightColumn.classList.add("col-7", "bg-secondary", "my-2", "mr-2", "ml-1");
        const playerStatsContainer = document.createElement("div");
        playerStatsContainer.classList.add("col-12", "d-flex", "flex-wrap", "justify-content-around", "align-items-center", "py-2");
        playerStatsContainer.innerHTML =
            `
                <div class="bg-dark col-5 h5 p-3 my-2">${playerStats.name}</div>
                <div class="bg-dark col-5 h5 p-3 my-2">${playerStats.age} years old</div>
                <div class="bg-dark col-5 h5 p-3 my-2">${playerStats.daysGoneSinceBusinessStart} days</div>
                <div class="bg-dark col-5 h5 p-3 my-2">$${playerStats.money}</div>
            `;
        // add contents in showcase
        const showcaseContainer = document.createElement("div");
        rightColumn.append(playerStatsContainer, showcaseContainer);
        console.log(playerStats);

        container.append(leftColumn, rightColumn);
        return container;
    }
}

export { Application };