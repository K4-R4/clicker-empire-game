class Wallet {
    constructor(money) {
        this.money = money;
    }

    getMoney() {
        return this.money;
    }

    setMoney(money) {
        this.money = money;
    }

    deposit(amount) {
        const amountToDeposit = Math.max(amount, 0);
        this.setMoney(this.getMoney() + amountToDeposit);
        return amountToDeposit;
    }

    withdraw(amount) {
        const currentMoney = this.getMoney();
        const amountToWithdraw = Math.min(Math.max(amount, 0), currentMoney);
        this.setMoney(this.getMoney() - amountToWithdraw);
        return amountToWithdraw;
    }
}

export {Wallet};
