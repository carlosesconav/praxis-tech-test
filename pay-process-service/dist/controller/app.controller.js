import { Router } from "express";
import cors from "cors";
import { transactionRequest } from "@/application/services/transaction.service.js";
import { createUser, getUserInfoByDocumentNumber, } from "@/application/services/user.service.js";
import { createAccount } from "@/application/services/account.service.js";
import { emitEvent } from "@/application/services/publisher.service.js";
import { TransactionStatusEnum } from "@/domain/constants/transactions.status.enum.js";
const route = Router();
route.use(cors());
route.post("/api/v1/transactionRequest", async (req, res) => {
    let status = TransactionStatusEnum.SUCCESS;
    try {
        const { accountNumberOrigin, accountTypeOrigin, accountNumberDestination, accountTypeDestination, value, } = req.body;
        const result = await transactionRequest(accountNumberOrigin, accountTypeOrigin, accountNumberDestination, accountTypeDestination, value);
        return res.status(201).json({
            status: 201,
            message: "Successful transaction",
            data: result,
        });
    }
    catch (error) {
        status = TransactionStatusEnum.REJECTED;
        return res.status(500).json({
            status: 500,
            message: `Failed operation ${error}`,
        });
    }
    finally {
        emitEvent(`Operation result is completed; status: ${status}`);
    }
});
route.post("/api/v1/user/create", async (req, res) => {
    try {
        const { name, documentNumber, documentType, personType, email, phone } = req.body;
        const result = await createUser(name, documentNumber, documentType, personType, email, phone);
        return res.status(201).json({
            status: 201,
            message: "Successful transaction",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: `Failed operation ${error}`,
        });
    }
});
route.post("/api/v1/account/create", async (req, res) => {
    try {
        const { accountType, userId } = req.body;
        const result = await createAccount(accountType, userId);
        return res.status(201).json({
            status: 201,
            message: "Successful transaction",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: `Failed operation ${error}`,
        });
    }
});
route.get("/api/v1/user", async (req, res) => {
    try {
        const docNumber = req.query.docNumber?.toString();
        const docType = req.query.docType?.toString();
        if (!docNumber || !docType) {
            return res.status(400).json({
                status: 400,
                message: "docNumber and docType are required",
            });
        }
        const result = await getUserInfoByDocumentNumber(docNumber, docType);
        return res.status(201).json({
            status: 201,
            message: "Successful transaction",
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: `Failed operation ${error}`,
        });
    }
});
