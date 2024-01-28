import prismaClient from "../prisma";
import jwt from "jsonwebtoken";

const verifyToken = async (token: string) => {
  const decodedToken = jwt.verify(token, "@login") as {
    id: string;
    email: string;
    iat: number;
    exp: number;
  };

  if (!decodedToken) {
    throw new Error("Token inválido.");
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: decodedToken.email,
    },
  });

  return user;
};

export default verifyToken;
