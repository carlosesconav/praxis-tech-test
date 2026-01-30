import { User, type UserModel } from "@/domain/models/user.model.js";

const getUserInfoByDocumentNumber = async (
  number: string,
  type: string,
): Promise<UserModel | null> => {
    const user: UserModel | null = await User.findOne({
      where: {
        documentNumber: number,
        documentType: type,
      },
    });
    return user;

};

const getUserById = async (id: string): Promise<UserModel | null> => {
  return await User.findByPk(id);
};

const createUser = async (
  name: string,
  documentNumber: string,
  documentType: string,
  personType: string,
  email: string,
  phone: string,
) => {
  const userResult = await getUserInfoByDocumentNumber(
    documentNumber,
    documentType,
  );

  if (userResult !== null) {
    throw new Error("The user is already registered in the system");
  }

  if (
    !name ||
    name.trim().length < 3 ||
    name.length > 100 ||
    !documentNumber ||
    !/^\d{6,12}$/.test(documentNumber) ||
    !documentType ||
    !["CC", "CE", "NIT", "PAS"].includes(documentType) ||
    !personType ||
    !["PN", "PJ"].includes(personType) ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !phone ||
    !/^\+?\d{7,15}$/.test(phone)
  ) {
    throw new Error("Invalid user data");
  }

 return await User.create({
    name: name,
    documentNumber: documentNumber,
    documentType: documentType,
    personType: personType,
    email: email.toLowerCase(),
    phone: phone,
  });
};

export { getUserInfoByDocumentNumber, getUserById, createUser };
