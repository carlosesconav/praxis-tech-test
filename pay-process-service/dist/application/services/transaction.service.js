import { updateBalance, getAccountByNumber } from "./account.service.js";
import { randomUUID } from "crypto";
import { createHistory } from "./history.service.js";
import { getUserInfoByDocumentNumber } from "./user.service.js";
import { TransactionStatusEnum } from "@/domain/constants/transactions.status.enum.js";
const rechargeAccount = async (accountNumber, accountType, newBalance) => {
    updateBalance(accountNumber, accountType, newBalance);
};
const transactionRequest = async (accountNumberOrigin, accountTypeOrigin, accountNumberDestination, accountTypeDestination, value) => {
    const txId = randomUUID();
    const status = TransactionStatusEnum.SUCCESS;
    const originAccount = await getAccountByNumber(accountNumberOrigin);
    const destinationAccount = await getAccountByNumber(accountNumberDestination);
    if (originAccount == null || destinationAccount == null) {
        throw new Error("Account not found");
    }
    if (Number(originAccount.balance) < Number(value)) {
        throw new Error("Insufficient money");
    }
    const newOriginBalance = ` ${Number(originAccount.balance) - Number(value)} `;
    const newDestinationBalance = ` ${Number(destinationAccount.balance) + Number(value)} `;
    await rechargeAccount(accountNumberOrigin, accountTypeOrigin, newOriginBalance);
    await rechargeAccount(accountNumberDestination, accountTypeDestination, newDestinationBalance);
    const result = await createHistory(originAccount.userId, originAccount.id, destinationAccount.id, txId, value, status);
    return result.get();
};
export { rechargeAccount, transactionRequest };
