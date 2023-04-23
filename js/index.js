import { Player } from "./Player.js";
import { Item } from "./Item.js";

let player = new Player("kt", 20, 50000, 25, 100);
console.log(player.getWagePerClick());
let item = new Item("machine", 100, 298);
console.log(item.buy(90));