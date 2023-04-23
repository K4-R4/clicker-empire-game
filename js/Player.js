import { Wallet } from "./Wallet.js";

class Player{
    #name;
    #age;
    #wallet;
    #wagePerClick;
    #dailyWage;
    constructor(name, age, initialCapital, wagePerClick, dailyWage){
        this.#name = name;
        this.#age = age;
        this.#wallet = new Wallet(initialCapital);
        this.#wagePerClick = wagePerClick;
        this.#dailyWage = dailyWage;
    }
    getWagePerClick(){
        return this.#wagePerClick;
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
}

export { Player };
