import { Player } from "./Player.js";
import { Game } from "./Game.js";

let player = new Player("kt", 20, 50000, 25, 100);
console.log(player.getWagePerClick());
let game = new Game();
console.log(JSON.parse(game));