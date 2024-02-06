import Bcrypt from "@/lib/bcrypt";
import JWT from "@/lib/jwt";
import clientPromise from "@/lib/mongodb";
import { API_ACCOUNT_POST_LOGIN } from "@/service/api/account";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  status: "success" | "error";
  message: string;
  data?: any[];
};

// ? [POST] /api/account/login
const Login = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  try {
    const { body, method } = req;

    switch (method) {
      case "POST":
        const { username, password } = body;
        const data: any[] = [];

        const verify = [
          { label: "username", type: "string", minLength: 1 },
          { label: "password", type: "string", minLength: 8 },
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
              message: `This data doesn't meet the requirements.${
                typeof value !== verify[i]?.type
                  ? ` It should be of type ${verify[i]?.type}`
                  : ""
              }${
                verify[i]?.minLength
                  ? ` Minimum length required is ${verify[i]?.minLength}`
                  : ""
              }.`,
            });
          }
        }

        if (data?.length > 0) {
          return res.status(200).json({
            status: "error",
            message: "Please check the information.",
            data: data,
          });
        }

        const client = await clientPromise;
        const db = client
          ?.db("BTL_Browser-Tab-Library")
          ?.collection("accounts");

        const dataDB = await db?.findOne({ username });

        if (!dataDB?._id) {
          return res.status(200).json({
            status: "error",
            message: "There is no user information in the system.",
            data: [
              {
                verify: "username",
                data: username,
                message: "There is no user information in the system.",
              },
            ],
          });
        }

        if (data?.length > 0) {
          return res.status(200).json({
            status: "error",
            message: "specific",
            data: data,
          });
        }

        if ((dataDB?.wrong_password_count ?? 0) >= 3) {
          return res.status(200).json({
            status: "error",
            message: "Your account has been locked.",
            data: [],
          });
        }

        const checkerPassword = await Bcrypt().comparePasswords(
          password,
          dataDB?.password ?? ""
        );

        if (checkerPassword) {
          (dataDB?.wrong_password_count ?? 0) > 0 &&
            db?.updateOne(
              {
                username,
              },
              { $set: { wrong_password_count: 0 } }
            );

          const name = dataDB?.name ?? null;
          const role = dataDB?.role ?? null;
          const email = dataDB?.email ?? null;

          const dataToken = {
            name,
            username,
            role,
            email,
            gen: new Date(),
            ext: new Date(),
          };

          const token = await JWT()?.generate(dataToken);

          return res.status(200).json({
            status: "success",
            message: "Login successfully",
            data: [
              {
                name,
                username,
                email,
                token,
              },
            ],
          });
        }

        db?.updateOne(
          {
            username,
          },
          { $inc: { wrong_password_count: 1 } }
        );

        return res.status(200).json({
          status: "error",
          message: "The password is incorrect.",
          data: [],
        });

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

export default Login;
