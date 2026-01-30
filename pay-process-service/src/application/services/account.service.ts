import { Account } from "@/domain/models/account.model.js";
import type { AccountAttributes } from "@/interfaces/account.interface.js";

const generateRandomNumber20 = (): string => {
  let result = "";
  for (let i = 0; i < 20; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

const getAccountByNumber = async (accountNumber: string): Promise<AccountAttributes | null> => {
  return await Account.findOne({
    where: {
      accountNumber: accountNumber,
    },
  });
};

const createAccount = async (accountType: string, userId: string) => {
    
    const accountNumber: string = generateRandomNumber20();
    return await Account.create({
    accountNumber: accountNumber,
    accountType: accountType,
    balance: "0.0000", // saldo inicial bancario
    userId: userId,
  });
};

const updateBalance = async (accountNumber: string, accountType: string, newBalance:string) => {
    return await Account.update(
    { balance: newBalance },
    {
      where: {
        accountNumber,
        accountType,
      },
    }
  );
}

export { getAccountByNumber, createAccount, updateBalance };
