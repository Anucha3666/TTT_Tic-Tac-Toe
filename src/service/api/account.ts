import Bcrypt from "@/lib/bcrypt";
import JWT from "@/lib/jwt";
import clientPromise from "@/lib/mongodb";
import {
  TYPE_ACCOUNT_POST_LOGIN,
  TYPE_ACCOUNT_POST_REGISTER,
} from "@/models/types/account";
import axios from "axios";

const BASE_URL_API = process.env.BASE_URL_API ?? "http://localhost:3000/api";

export const API_ACCOUNT_POST_LOGIN = async (
  ReqData: TYPE_ACCOUNT_POST_LOGIN
) => {
  try {
    const { data } = await axios.post(`${BASE_URL_API}/account/login`, ReqData);

    return data;
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: String(error),
      data: [],
    };
  }
};
// export const API_ACCOUNT_POST_LOGIN = async (
//   ReqData: TYPE_ACCOUNT_POST_LOGIN
// ) => {
//   try {
//     const { username, password } = ReqData;
//     const data: any[] = [];

//     const verify = [
//       { label: "username", type: "string", minLength: 1 },
//       { label: "password", type: "string", minLength: 8 },
//     ];

//     for (let i = 0; i < verify?.length; i++) {
//       const value =
//         ReqData?.[`${verify[i]?.label}` as keyof TYPE_ACCOUNT_POST_LOGIN];
//       if (
//         typeof value !== verify[i]?.type ||
//         (verify[i]?.minLength && value.length < verify[i]?.minLength)
//       ) {
//         data?.push({
//           verify: verify[i]?.label,
//           data: value,
//           message: `This data does not meet the requirements. It should be a ${verify[i]?.type} with a minimum length of ${verify[i]?.minLength}.`,
//         });
//       }
//     }

//     if (data?.length > 0) {
//       return {
//         status: "error",
//         message: "verify",
//         data: data,
//       };
//     }

//     const client = await clientPromise;
//     const db = client?.db("BTL_Browser-Tab-Library")?.collection("accounts");

//     const dataDB = await db?.findOne({ username });

//     if (data?.length > 0) {
//       return {
//         status: "error",
//         message: "specific",
//         data: data,
//       };
//     }

//     if ((dataDB?.wrong_password_count ?? 0) >= 3) {
//       return {
//         status: "error",
//         message: "Your account has been locked.",
//         data: [],
//       };
//     }

//     const checkerPassword = await Bcrypt().comparePasswords(
//       password,
//       dataDB?.password ?? ""
//     );

//     if (checkerPassword) {
//       (dataDB?.wrong_password_count ?? 0) > 0 &&
//         db?.updateOne(
//           {
//             username,
//           },
//           { $set: { wrong_password_count: 0 } }
//         );

//       const name = dataDB?.name ?? null;
//       const role = dataDB?.role ?? null;
//       const email = dataDB?.email ?? null;

//       const dataToken = {
//         name,
//         username,
//         role,
//         email,
//         gen: new Date(),
//         ext: new Date(),
//       };

//       const token = await JWT()?.generate(dataToken);

//       return {
//         status: "success",
//         message: "Login successfully",
//         data: [
//           {
//             name,
//             username,
//             email,
//             token,
//           },
//         ],
//       };
//     }

//     db?.updateOne(
//       {
//         username,
//       },
//       { $inc: { wrong_password_count: 1 } }
//     );

//     return {
//       status: "error",
//       message: "The password is incorrect.",
//       data: [],
//     };
//   } catch (e) {
//     return {
//       status: "error",
//       message: String(e),
//       data: [],
//     };
//   }
// };

// export const API_ACCOUNT_POST_REGISTER = async (
//   ReqData: TYPE_ACCOUNT_POST_REGISTER
// ) => {
//   try {
//     const { username, email, password } = ReqData;
//     const data: any[] = [];

//     const verify = [
//       { label: "username", type: "string", minLength: 1 },
//       { label: "password", type: "string", minLength: 8 },
//       { label: "email", type: "string", minLength: 10 },
//     ];

//     for (let i = 0; i < verify?.length; i++) {
//       const value =
//         ReqData?.[`${verify[i]?.label}` as keyof TYPE_ACCOUNT_POST_REGISTER];
//       if (
//         typeof value !== verify[i]?.type ||
//         (verify[i]?.minLength && value.length < verify[i]?.minLength)
//       ) {
//         data?.push({
//           verify: verify[i]?.label,
//           data: value,
//           message: `This data does not meet the requirements. It should be a ${verify[i]?.type} with a minimum length of ${verify[i]?.minLength}.`,
//         });
//       }
//     }

//     if (data?.length > 0) {
//       return {
//         status: "error",
//         message: "verify",
//         data: data,
//       };
//     }

//     const client = await clientPromise;
//     const db = client?.db("BTL_Browser-Tab-Library")?.collection("accounts");

//     const specificUsername = await db?.find({ username })?.toArray();
//     specificUsername?.length > 0 &&
//       data?.push({
//         verify: "username",
//         data: username,
//         message:
//           "Sorry, this username is already in use. Please choose a different one.",
//       });

//     const specificEmail = await db?.find({ email })?.toArray();
//     specificEmail?.length > 0 &&
//       data?.push({
//         verify: "email",
//         data: email,
//         message:
//           "Sorry, this email is already in use. Please choose a different one.",
//       });

//     if (data?.length > 0) {
//       return {
//         status: "error",
//         message: "specific",
//         data: data,
//       };
//     }

//     const hashedPassword = await Bcrypt().hashPassword(password);
//     const newAccount = {
//       username,
//       password: hashedPassword,
//       email,
//       time_stamp: new Date(),
//     };
//     const result = await db?.insertOne(newAccount);

//     return {
//       status: "success",
//       message: "Register account successfully",
//       data: [result],
//     };
//   } catch (e) {
//     ({
//       status: "error",
//       message: String(e),
//       data: [],
//     });
//   }
// };
