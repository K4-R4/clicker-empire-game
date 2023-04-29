import { Wallet } from "./Wallet.js";

class Player{
    #name;
    #age;
    #daysGoneSinceBusinessStart;
    #hamburgerCount;
    #wallet;
    #wagePerClick;
    #dailyWage;
    constructor(name, age = 20, daysGoneSinceBusinessStart = 0, hamburgerCount = 0, initialCapital = 50000, wagePerClick = 25, dailyWage = 0){
        this.#name = name;
        this.#age = age;
        this.#daysGoneSinceBusinessStart = daysGoneSinceBusinessStart;
        this.#hamburgerCount = hamburgerCount;
        this.#wallet = new Wallet(initialCapital);
        this.#wagePerClick = wagePerClick;
        this.#dailyWage = dailyWage;
    }
    getName(){
        return this.#name;
    }
    getAge(){
        return this.#age;
    }
    getDaysGoneSinceBusinessStart(){
        return this.#daysGoneSinceBusinessStart;
    }
    getHamburgerCount(){
        return this.#hamburgerCount;
    }
    getWagePerClick(){
        return this.#wagePerClick;
    }
    getDailyWage(){
        return this.#dailyWage;
    }
    getStats(){
        return {
            name: this.getName(),
            age: this.getAge(),
            daysGoneSinceBusinessStart: this.getDaysGoneSinceBusinessStart(),
            hamburgerCount: this.getHamburgerCount(),
            money: this.#wallet.getMoney(),
            dailyWage: this.getDailyWage(),
            wagePerClick: this.getWagePerClick()
        };
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
