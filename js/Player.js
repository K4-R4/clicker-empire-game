import { Wallet } from "./Wallet.js";

class Player{
    #name;
    #age;
    #wallet;
    #wagePerClick;
    #dailyWage;
    constructor(name, age = 20, initialCapital = 50000, wagePerClick = 25, dailyWage = 0){
        this.#name = name;
        this.#age = age;
        this.#wallet = new Wallet(initialCapital);
        this.#wagePerClick = wagePerClick;
        this.#dailyWage = dailyWage;
    }
    getWagePerClick(){
        return this.#wagePerClick;
    }
    getDailyWage(){
        return this.#dailyWage;
    }
    addWagePerClick(additionalWagePerClick){
        this.#wagePerClick += additionalWagePerClick;
    }
    addDailyWage(additionalDailyWage){
        this.#dailyWage += additionalDailyWage;
    }
    click(){
        this.#wallet.deposit(this.getWagePerClick());
        return this.#wallet.getMoney();
    }
    workForDay(){
        this.#wallet.deposit(this.getDailyWage());
    }
}

export { Player };
