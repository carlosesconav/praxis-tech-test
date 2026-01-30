export interface AccountAttributes {
  id: string;
  accountNumber: string;
  accountType: string;
  balance: string; // DECIMAL → string (importante en banca)
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}