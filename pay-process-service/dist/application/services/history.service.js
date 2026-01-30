import { History } from "@/domain/models/history.model.js";
const createHistory = async (userId, accountId, destinationAccount, transactionId, value, status) => {
    return await History.create({
        userId: userId,
        accountId: accountId,
        transactionId: transactionId,
        destinationAccount: destinationAccount,
        transactionValue: value,
        transactionStatus: status,
    });
};
const getHistoryByTxId = async (txId) => {
    return await History.findOne({
        where: {
            transactionId: txId
        }
    });
};
export { getHistoryByTxId, createHistory };
