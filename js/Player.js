import { Wallet } from "./Wallet.js";

class Player{
    constructor(age, dailyWage, daysGoneSinceBusinessStart, hamburgerCount, initialCapital, name, wagePerClick){
        this.age = age;
        this.dailyWage = dailyWage;
        this.daysGoneSinceBusinessStart = daysGoneSinceBusinessStart;
        this.hamburgerCount = hamburgerCount;
        this.name = name;
        this.wallet = new Wallet(initialCapital);
        this.wagePerClick = wagePerClick;
    }
    getAge(){
        return this.age;
    }
    getDailyWage(){
        return this.dailyWage;
    }
    getDaysGoneSinceBusinessStart(){
        return this.daysGoneSinceBusinessStart;
    }
    getHamburgerCount(){
        return this.hamburgerCount;
    }
    getName(){
        return this.name;
    }
    getWagePerClick(){
        return this.wagePerClick;
    }
    setDaysGoneSinceBusinessStart(daysGoneSinceBusinessStart){
        this.daysGoneSinceBusinessStart = daysGoneSinceBusinessStart;
    }
    setHamburgerCount(amount){
        this.hamburgerCount = amount;
    }
    getStats(){
        return {
            name: this.getName(),
            age: this.getAge(),
            daysGoneSinceBusinessStart: this.getDaysGoneSinceBusinessStart(),
            hamburgerCount: this.getHamburgerCount(),
            money: this.wallet.getMoney(),
            dailyWage: this.getDailyWage(),
            wagePerClick: this.getWagePerClick()
        };
    }
    addDailyWage(additionalDailyWage){
        this.dailyWage += additionalDailyWage;
    }
    addWagePerClick(additionalWagePerClick){
        this.wagePerClick += additionalWagePerClick;
    }
    click(){
        this.wallet.deposit(this.getWagePerClick());
        this.setHamburgerCount(this.getHamburgerCount() + 1);
        return this.wallet.getMoney();
    }
    workForDay(){
        this.wallet.deposit(this.getDailyWage());
        this.setDaysGoneSinceBusinessStart(this.getDaysGoneSinceBusinessStart() + 1);
    }
    isAffordable(amount){
        return amount <= this.wallet.getMoney();
    }
    buyItem(amount){
        this.wallet.withdraw(amount);
    }
}

export { Player };
