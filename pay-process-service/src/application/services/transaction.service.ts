import { updateBalance, getAccountByNumber } from "./account.service.js";
import { randomUUID } from "crypto";
import { createHistory } from "./history.service.js";
import { getUserInfoByDocumentNumber } from "./user.service.js";
import { TransactionStatusEnum } from "@/domain/constants/transactions.status.enum.js";
import type { AccountAttributes } from "@/interfaces/account.interface.js";

const rechargeAccount = async (
  accountNumber: string,
  accountType: string,
  newBalance: string,
) => {
  updateBalance(accountNumber, accountType, newBalance);
};

const transactionRequest = async (
  accountNumberOrigin: string,
  accountTypeOrigin: string,
  accountNumberDestination: string,
  accountTypeDestination: string,
  value: string,
) => {
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

  const newOriginBalance: string =  ` ${Number(originAccount.balance) - Number(value)} `;
  const newDestinationBalance: string =  ` ${Number(destinationAccount.balance) + Number(value)} `;

  await rechargeAccount(accountNumberOrigin, accountTypeOrigin, newOriginBalance);
  await rechargeAccount(
    accountNumberDestination,
    accountTypeDestination,
    newDestinationBalance,
  );

  const result = await createHistory(originAccount.userId, originAccount.id, destinationAccount.id, txId, value, status);

  return result.get();

};

export { rechargeAccount, transactionRequest };
