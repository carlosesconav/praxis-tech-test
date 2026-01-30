export interface UserAttributes {
  id: string;
  name: string;
  documentNumber: string;
  documentType: string;
  personType: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}