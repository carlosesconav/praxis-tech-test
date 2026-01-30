export interface HistoryAttributes {
  id: string;
  userId: string;
  accountId: string;
  destinationAccount: string;
  transactionId: string;
  transactionValue: string; // DECIMAL → string (clave en banca)
  transactionStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}