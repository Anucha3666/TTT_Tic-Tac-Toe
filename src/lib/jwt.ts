import jwt from "jsonwebtoken";
import { TokenType } from "../models/types";

const JWT = () => {
  const secretKey = process.env.SECRET_KEY ?? "";

  const generate = async (payload: TokenType | string | object | Buffer) => {
    const token = await jwt?.sign(payload, secretKey, { expiresIn: "1h" });
    return token ?? null;
  };

  const decode = async (token: string) => {
    try {
      const decodedData = await jwt?.verify(token, secretKey);
      return decodedData ?? null;
    } catch (error) {
      console.error("Invalid token");
      return null;
    }
  };

  return {
    generate,
    decode,
  };
};

export default JWT;
