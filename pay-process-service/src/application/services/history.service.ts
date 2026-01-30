import { History } from "@/domain/models/history.model.js";


const createHistory = async (
  userId: string,
  accountId: string,
  destinationAccount: string,
  transactionId: string,
  value: string,
  status: string
) => {
  return await History.create({
    userId: userId,
    accountId: accountId,
    transactionId: transactionId,
    destinationAccount: destinationAccount,
    transactionValue: value,
    transactionStatus: status,
  });
};

const getHistoryByTxId = async (txId: string) => {
    return await History.findOne({
        where: {
            transactionId: txId
        }
    });
};

export { getHistoryByTxId, createHistory };
