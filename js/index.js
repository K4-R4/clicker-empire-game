import { Game } from "./Game.js";
import {Player} from "./Player.js";
import {Ability} from "./Ability.js";
import {Investment} from "./Investment.js";
import {RealEstate} from "./RealEstate.js";

const config = {
    initialPage : document.getElementById("initial-page"),
    gamePage : document.getElementById("game-page"),
    game: null,
    hamburgerImage : "../img/hamburger.png"
}
config.initialPage.querySelector("#register").addEventListener("click", (event) => {
    event.preventDefault();
    const player = initializeUserAccount();
    if(player === null) return;
    initializeGame(player);
});

config.initialPage.querySelector("#login").addEventListener("click", (event) => {
    event.preventDefault();
    const player = initializeUserAccount();
    if(player === null) return;
    config.game = loadDataInLocalStorage(player.getName());
    if(config.game === null) return;
    config.game.startGameLoop();
    displayBlock(config.initialPage);
    displayNone(config.gamePage);
    config.gamePage.append(generateGamePage());
});
document.addEventListener("playerStatsUpdated", () => {
    updatePlayerStats();
});
function displayNone(ele){
    ele.classList.add("d-block");
    ele.classList.remove("d-none");
}
function displayBlock(ele){
    ele.classList.add("d-none");
    ele.classList.remove("d-block");
}
function initializeUserAccount(){
    const playerName = config.initialPage.querySelector("#login-form").querySelector(`input[name="user-name"]`).value;
    if(playerName === ""){
        alert("Please put your name");
        return null;
    }
    return new Player(20, 0, 0, 0, 50000, playerName, 25);
}
function initializeGame(player){
    config.game = new Game(player, [
        new Ability(500, "../img/flip-machine.png", 500, "Flip Machine", 15_000, 0, 25),
        new Investment(Infinity, "../img/stock.png", Infinity, "ETF Stock", 300_000, 0, 0.1),
        new Investment(Infinity, "../img/stock.png", Infinity, "ETF Bonds", 300_000, 0, 0.07),
        new RealEstate(1_000, "../img/lemonade.png", 1_000, "Lemonade Stand", 30_000, 0, 30),
        new RealEstate(500, "../img/ice-cream-truck.png", 500, "Ice Cream Truck", 100_000, 0, 120),
        new RealEstate(100, "../img/house.png", 100, "House", 2_000_000, 0, 32_000),
        new RealEstate(100, "../img/townhouse.png", 100, "Town House", 4_000_000, 0, 64_000),
        new RealEstate(20, "../img/mansion.png", 20, "Mansion", 25_000_000, 0, 500_000),
        new RealEstate(10, "../img/industrial-space.png", 10, "Industrial Space", 1_000_000_000, 0, 2_200_000),
        new RealEstate(5, "../img/hotel.png", 5, "Hotel Skyscraper", 10_000_000_000, 0, 25_000_000),
        new RealEstate(1, "../img/bullet-train.png", 1, "Bullet-Speed Sky Railway", 10_000_000_000_000, 0, 30_000_000_000)
    ]);
    displayBlock(config.initialPage);
    displayNone(config.gamePage);
    config.game.startGameLoop();
    config.gamePage.innerHTML = "";
    config.gamePage.append(generateGamePage());
}
function generateGamePage(){
    const container = document.createElement("div");
    container.classList.add("bg-dark-blue", "vh-85", "d-flex", "justify-content-center", "col-12", "text-white", "text-center");
    container.append(generateLeftColumnOfGamePage(), generateRightColumnOfGamePage());
    return container;
}
function generateLeftColumnOfGamePage(){
    const leftColumn = document.createElement("div");
    leftColumn.setAttribute("id", "left-column");
    leftColumn.classList.add("col-3", "bg-dark", "flex-column", "my-2", "ml-2", "mr-1", "px-2");
    leftColumn.append(generateScoreContainer(), generateHamburgerContainer());
    return leftColumn;
}
function generateRightColumnOfGamePage(){
    const rightColumn = document.createElement("div");
    rightColumn.setAttribute("id", "right-column");
    rightColumn.classList.add("col-9", "my-2", "mr-2", "ml-1");
    rightColumn.append(generateMainUiContainer(), generateSubUiContainer());
    return rightColumn;
}
function generateScoreContainer(){
    const playerStats = config.game.getPlayerStats();
    const scoreContainer = document.createElement("div");
    scoreContainer.setAttribute("id", "score-container");
    scoreContainer.classList.add("col-12", "bg-dark-blue", "py-2", "mt-2", "flex-grow-0");
    scoreContainer.innerHTML =
        `
            <div class="font-size-large">${playerStats.hamburgerCount.toLocaleString()} Burgers</div>
            <div class="font-size-medium">one click $${playerStats.wagePerClick.toLocaleString()}</div>
        `;
    return scoreContainer;
}
function generateHamburgerContainer(){
    const hamburgerContainer = document.createElement("div");
    hamburgerContainer.classList.add("col", "h-75", "d-flex", "justify-content-center", "align-items-center", "flex-grow-1");
    hamburgerContainer.innerHTML =
        `
            <img alt="Hamburger" src="${config.hamburgerImage}" class="hamburger scaleOnClick w-100">
        `;
    hamburgerContainer.append();
    hamburgerContainer.addEventListener("click", () => {
        config.game.click();
    });
    return hamburgerContainer;
}
function generateMainUiContainer(){
    const mainUiContainer = document.createElement("div");
    mainUiContainer.setAttribute("id", "main-ui-container");
    mainUiContainer.classList.add("col-12", "main-ui", "p-0", "mt-1");
    mainUiContainer.append(generatePlayerStatsContainer(), generateShopContainer());
    return mainUiContainer;
}

function generateSubUiContainer(){
    const subUiContainer = document.createElement("div");
    subUiContainer.setAttribute("id", "sub-ui-container");
    subUiContainer.classList.add("col-12", "d-flex", "justify-content-end", "align-items-center", "sub-ui", "mt-2");
    subUiContainer.innerHTML =
        `
            <i id="reset-button" class="fa-solid fa-rotate-right fa-2x icon"></i>
            <i id="save-button" class="fa-regular fa-floppy-disk fa-2x icon"></i> 
        `;

    const resetButton = subUiContainer.querySelector("#reset-button");
    const saveButton = subUiContainer.querySelector("#save-button")
    resetButton.addEventListener("click", () => {
        if(!confirm("Are you sure you want to reset all data?")) return;
        const playerName = config.game.player.getName();
        const player = new Player(20, 0, 0, 0, 50000, playerName, 25);
        config.game.stopGameLoop();
        initializeGame(player);
    });
    saveButton.addEventListener("click", () => {
        alert("Saved your data. Please put the same name when you login");
        saveDataInLocalStorage();
        config.gamePage.innerHTML = "";
        config.game.stopGameLoop();
        displayNone(config.initialPage);
        displayBlock(config.gamePage);
    });
    return subUiContainer;
}
function generatePlayerStatsContainer(){
    const playerStats = config.game.getPlayerStats();
    const playerStatsContainer = document.createElement("div");
    playerStatsContainer.setAttribute("id", "player-stats-container");
    playerStatsContainer.classList.add("player-stats", "col-12", "p-0", "bg-dark", "d-flex", "flex-wrap", "justify-content-around", "align-items-center");
    playerStatsContainer.innerHTML =
        `
            <div class="bg-dark-blue col-12 col-lg-6 stats-border py-2 font-size-medium">${playerStats.name}</div>
            <div class="bg-dark-blue col-12 col-lg-6 stats-border py-2 font-size-medium">${playerStats.age} years old</div>
            <div class="bg-dark-blue col-12 col-lg-6 stats-border py-2 font-size-medium">${playerStats.daysGoneSinceBusinessStart.toLocaleString()} days</div>
            <div class="bg-dark-blue col-12 col-lg-6 stats-border py-2 font-size-medium">$${playerStats.money.toLocaleString()}</div>
        `;
    return playerStatsContainer;
}
function generateShopContainer(){
    const items = config.game.getItems();
    const container = document.createElement("div");
    container.setAttribute("id", "shop-container");
    container.classList.add("shop-page", "mt-4", "py-1", "px-2", "col-12", "bg-dark", "d-flex", "flex-wrap", "justify-content-center", "align-items-center");
    for(const item of items){
        container.append(generateItemContainer(item));
    }
    return container;
}
function generateItemContainer(item){
    const itemContainer = document.createElement("div");
    const thumbnail = document.createElement("div");
    const description = document.createElement("div");
    itemContainer.classList.add("col-12", "d-flex", "flex-row", "bg-dark-blue", "py-3", "my-1", "item");
    thumbnail.classList.add("col-lg-3", "d-flex", "justify-content-center", "align-items-center", "d-none", "d-lg-block", "p-0");
    description.classList.add("col-12", "col-lg-9", "d-flex", "flex-column", "justify-content-center", "align-items-center", "text-start", "p-0");
    thumbnail.innerHTML =
        `
            <img alt="thumbnail" src="${item.getImagePath()}" class="thumbnail">
        `;
    description.innerHTML =
        `
            <div class="col-12 d-flex flex-wrap p-0">
                <div class="col-12 d-flex p-0">
                    <div class="col-6 font-size-large text-left p-0">${item.getName()}</div>
                    <div class="col-6 font-size-large text-right p-0">${item.getSoldStock()}</div>
                </div>
                <div class="col-12 d-flex p-0 mt-2">
                    <div class="col-6 font-size-medium text-left p-0">$${item.getPrice().toLocaleString()}</div>
                    <div class="col-6 font-size-medium text-success text-right p-0">${item.getDescription()}</div>
                </div>
            </div>
        `;
    itemContainer.append(thumbnail, description);

    itemContainer.addEventListener("click", () => {
        document.getElementById("shop-container").remove();
        document.getElementById("main-ui-container").append(generateTransactionContainer(item));
    });
    return itemContainer;
}
function generateTransactionContainer(item){
    const transactionContainer = document.createElement("div");
    transactionContainer.setAttribute("id", "transaction-container");
    transactionContainer.classList.add("transaction-page", "mt-4", "py-1", "col-12", "d-flex", "flex-row", "flex-wrap", "bg-dark", "py-4", "my-1");
    transactionContainer.innerHTML =
        `
            <div class="col-8 d-flex flex-column justify-content-center text-left">
                <div class="font-size-large">${item.getName()}</div>
                <div class="font-size-medium mt-2">
                    Max Purchase: ${parseFloat(item.getMaxStock()) === Infinity ? "\u{221e}" : item.getMaxStock()}</br>
                    Price: $${item.getPrice().toLocaleString()}</br>
                </div>
                <div class="font-size-medium text-success">
                    ${item.getDescription()}
                </div>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <img alt="thumbnail" src="${item.getImagePath()}" class="thumbnail">
            </div>
            <div class="col-12 form-group text-left font-size-medium">
                <label for="number-of-orders" class="col-12 col-form-label pl-0 mt-4">How many would you like to purchase?</label>
                <input type="number" name="number-of-orders" value="0" id="number-of-orders" class="col-12 form-control">
                <div id="total-cost" class="col-12 p-0 text-right">
                    Total: $${item.calculateTotalCost(0).toLocaleString()}
                </div>
            </div>
        `;
    transactionContainer.querySelector("#number-of-orders").addEventListener("change", (event) => {
        const quantity = event.target.value;
        document.getElementById("total-cost").innerHTML =
            `
                Total: $${item.calculateTotalCost(quantity).toLocaleString()}
            `;
    });

    const buttons = createButtons("Go Back", "Purchase");
    const backButton = buttons.querySelector(".back-button");
    const nextButton = buttons.querySelector(".next-button");
    backButton.addEventListener("click", () => {
        const rightColumn = document.getElementById("right-column");
        document.getElementById("transaction-container").remove();
        rightColumn.querySelector("#main-ui-container").append(generateShopContainer());
    });
    nextButton.addEventListener("click", () => {
        const quantity = document.getElementById("number-of-orders").value;
        const amount = item.calculateTotalCost(quantity);
        if(!item.isStockAvailable(quantity)){
            alert("Invalid number");
            return;
        }
        if(!config.game.getPlayer().isAffordable(amount)){
            alert("You don't have enough money");
            return;
        }
        config.game.executeOrder(item, quantity);

        const rightColumn = document.getElementById("right-column");
        document.getElementById("transaction-container").remove();
        rightColumn.querySelector("#main-ui-container").append(generateShopContainer());
    });
    transactionContainer.append(buttons);
    return transactionContainer;
}
function updatePlayerStats(){
    const leftColumn = config.gamePage.querySelector("#left-column");
    const rightColumn = config.gamePage.querySelector("#right-column");

    document.getElementById("score-container").remove();
    leftColumn.prepend(generateScoreContainer());
    document.getElementById("player-stats-container").remove();
    rightColumn.querySelector("#main-ui-container").prepend(generatePlayerStatsContainer());
}
function createButtons(leftButtonName, rightButtonName){
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

function saveDataInLocalStorage(){
    const playerName = config.game.getPlayer().getName();
    const gameJsonData = JSON.stringify(config.game, (key, value) => {
        return value === Infinity ? "Infinity" : value;
    });
    localStorage.setItem(playerName, gameJsonData);
}

function loadDataInLocalStorage(playerName){
    const gameJsonData = localStorage.getItem(playerName);
    if(gameJsonData === null){
        alert("There is no data");
        return null;
    }
    const gameDataObject = JSON.parse(gameJsonData, (key, value) => {
        return value === "Infinity" ? Infinity : value;
    });
    const player = new Player(
        gameDataObject.player.age,
        gameDataObject.player.dailyWage,
        gameDataObject.player.daysGoneSinceBusinessStart,
        gameDataObject.player.hamburgerCount,
        gameDataObject.player.wallet.money,
        gameDataObject.player.name,
        gameDataObject.player.wagePerClick
    );
    let items = [];
    for(let i = 0; i <= 0; i++){
        const item = new Ability(
            gameDataObject.items[i].availableStock,
            gameDataObject.items[i].imagePath,
            gameDataObject.items[i].maxStock,
            gameDataObject.items[i].name,
            gameDataObject.items[i].price,
            gameDataObject.items[i].soldStock,
            gameDataObject.items[i].additionalWagePerClick
        );
        items.push(item);
    }
    for(let i = 1; i <= 2; i++){
        const item = new Investment(
            gameDataObject.items[i].availableStock,
            gameDataObject.items[i].imagePath,
            gameDataObject.items[i].maxStock,
            gameDataObject.items[i].name,
            gameDataObject.items[i].price,
            gameDataObject.items[i].soldStock,
            gameDataObject.items[i].interest
        );
        items.push(item);
    }
    for(let i = 3; i <= 10; i++){
        const item = new RealEstate(
            gameDataObject.items[i].availableStock,
            gameDataObject.items[i].imagePath,
            gameDataObject.items[i].maxStock,
            gameDataObject.items[i].name,
            gameDataObject.items[i].price,
            gameDataObject.items[i].soldStock,
            gameDataObject.items[i].additionalDailyWage
        );
        items.push(item);
    }
    return new Game(player, items);
}
