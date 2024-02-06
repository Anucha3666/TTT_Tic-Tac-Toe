import Bcrypt from "../../../lib/bcrypt";
import clientPromise from "../../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  status: "success" | "error";
  message: string;
  data?: any[];
};

// ? [POST] /api/account/register
const Register = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    const { body, method } = req;

    switch (method) {
      case "POST":
        const { username, email, password } = body;
        const data: any[] = [];

        const verify = [
          { label: "username", type: "string", minLength: 1 },
          { label: "password", type: "string", minLength: 8 },
          { label: "email", type: "string", minLength: 10 },
        ];

        for (let i = 0; i < verify?.length; i++) {
          const value = body?.[`${verify[i]?.label}`];
          if (
            typeof value !== verify[i]?.type ||
            (verify[i]?.minLength && value.length < verify[i]?.minLength)
          ) {
            data?.push({
              verify: verify[i]?.label,
              data: value,
              message: `This data does not meet the requirements. It should be a ${verify[i]?.type} with a minimum length of ${verify[i]?.minLength}.`,
            });
          }
        }

        if (data?.length > 0) {
          return res.status(200).json({
            status: "error",
            message: "verify",
            data: data,
          });
        }

        const client = await clientPromise;
        const db = client
          ?.db("BTL_Browser-Tab-Library")
          ?.collection("accounts");

        const specificUsername = await db?.find({ username })?.toArray();
        specificUsername?.length > 0 &&
          data?.push({
            verify: "username",
            data: username,
            message:
              "Sorry, this username is already in use. Please choose a different one.",
          });

        const specificEmail = await db?.find({ email })?.toArray();
        specificEmail?.length > 0 &&
          data?.push({
            verify: "email",
            data: email,
            message:
              "Sorry, this email is already in use. Please choose a different one.",
          });

        if (data?.length > 0) {
          return res.status(200).json({
            status: "error",
            message: "specific",
            data: data,
          });
        }

        const hashedPassword = await Bcrypt().hashPassword(password);
        const newAccount = {
          username,
          password: hashedPassword,
          email,
          time_stamp: new Date(),
        };
        const result = await db?.insertOne(newAccount);

        return res.status(200).json({
          status: "success",
          message: "Register account successfully",
          data: [result],
        });
      // break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({
          status: "error",
          message: `Method ${method} Not Allowed`,
        });
    }
  } catch (e) {
    res.status(200).json({
      status: "error",
      message: String(e),
      data: [],
    });
  }
};

export default Register;
