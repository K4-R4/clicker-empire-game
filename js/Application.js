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
        const playerName = this.#loginForm.querySelector(`input[name="user-name"]`);
        return new Player(playerName);
    }
    generateGamePage(){
        const container = document.createElement("div");
        container.classList.add("bg-white", "d-flex", "justify-content-center", "align-items-center", "col-12", "text-center", "p-4");
        const leftColumn = document.createElement("div");
        leftColumn.classList.add("col-5");
        const rightColumn = document.createElement("div");
        rightColumn.classList.add("col-7");
        leftColumn.innerHTML =
            `
                <p>Hamburger</p>
            `;
        rightColumn.innerHTML =
            `
                <p>Info</p>
            `;
        container.append(leftColumn, rightColumn);
        return container;
    }
}

export { Application };