import { Account } from "@/domain/models/account.model.js";
const generateRandomNumber20 = () => {
    let result = "";
    for (let i = 0; i < 20; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
};
const getAccountByNumber = async (accountNumber) => {
    return await Account.findOne({
        where: {
            accountNumber: accountNumber,
        },
    });
};
const createAccount = async (accountType, userId) => {
    const accountNumber = generateRandomNumber20();
    await Account.create({
        accountNumber: accountNumber,
        accountType: accountType,
        balance: "0.0000", // saldo inicial bancario
        userId: userId,
    });
};
const updateBalance = async (accountNumber, accountType, newBalance) => {
    return await Account.update({ balance: newBalance }, {
        where: {
            accountNumber,
            accountType,
        },
    });
};
export { getAccountByNumber, createAccount, updateBalance };
