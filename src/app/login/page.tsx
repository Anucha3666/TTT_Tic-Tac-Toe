"use client";
import { API_ACCOUNT_POST_LOGIN } from "@/service/api/account";
import Image from "next/image";
import { Layout } from "@/layout";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { TYPE_ACCOUNT_POST_LOGIN } from "@/models/types/account";
import { Toastify } from "@/utils";

const SignIn = () => {
  const [dataLogin, setDataLogin] = useState<TYPE_ACCOUNT_POST_LOGIN>(
    {} as TYPE_ACCOUNT_POST_LOGIN
  );
  const [dataError, setDataError] = useState([]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { status, message, data } = await API_ACCOUNT_POST_LOGIN(dataLogin);

    status === "error" && setDataError(data);

    Toastify({ status, message });
  };

  return (
    <Layout>
      <div className='w-screen h-screen flex flex-col items-center justify-center gap-2 relative'>
        <form className='max-w-sm mx-auto' onSubmit={handleSubmit}>
          <div className='mb-5'>
            <label className='block mb-2 text-sm font-medium '>Username</label>
            <input
              className='bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Username'
              required
              onChange={(e) => {
                setDataLogin({ ...dataLogin, username: e.target.value });
                dataError?.filter(({ verify }) => verify === "username")
                  ?.length > 0 &&
                  setDataError(
                    dataError?.filter(({ verify }) => verify !== "username")
                  );
              }}
            />
            <p className='text-xs text-red-500'>
              {(
                dataError?.filter(
                  ({ verify }) => verify === "username"
                )?.[0] as { message?: string }
              )?.message || ""}
            </p>
          </div>
          <div className='mb-5 w-[20rem]'>
            <label className='block mb-2 text-sm font-medium '>Password</label>
            <input
              type='password'
              id='password'
              className='bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500'
              required
              placeholder='password'
              onChange={(e) => {
                setDataLogin({ ...dataLogin, password: e.target.value });
                dataError?.filter(({ verify }) => verify === "password")
                  ?.length > 0 &&
                  setDataError(
                    dataError?.filter(({ verify }) => verify !== "password")
                  );
              }}
            />
            <p className='text-xs text-red-500'>
              {(
                dataError?.filter(
                  ({ verify }) => verify === "password"
                )?.[0] as { message?: string }
              )?.message || ""}
            </p>
          </div>

          <div></div>

          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
