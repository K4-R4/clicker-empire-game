import { Wallet } from "./Wallet.js";

class Player{
    constructor(age, dailyWage, daysGoneSinceBusinessStart, hamburgerCount, initialCapital, name, wagePerClick){
        this.age = age;
        this.dailyWage = dailyWage;
        this.daysGoneSinceBusinessStart = daysGoneSinceBusinessStart;
        this.daysPerYear = 365;
        this.hamburgerCount = hamburgerCount;
        this.initialAge = 20;
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
    getDaysPerYear(){
        return this.daysPerYear;
    }
    getHamburgerCount(){
        return this.hamburgerCount;
    }
    getInitialAge(){
        return this.initialAge;
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
    setAge(age){
        this.age = age;
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
        this.setAge(this.getInitialAge() + parseInt(this.getDaysGoneSinceBusinessStart() / this.getDaysPerYear()));
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
