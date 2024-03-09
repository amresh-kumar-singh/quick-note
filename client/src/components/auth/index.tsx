import style from "@/src/components/auth/auth.module.css";
import Link from "next/link";
import { FormEvent } from "react";
import Loader from "../Loader";

interface Props {
  type: "Login" | "Register";
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error: string;
  resetError: () => void;
  isLoading: boolean;
}

export default function Auth({
  type,
  handleSubmit,
  error,
  resetError,
  isLoading,
}: Props) {
  return (
    <div className={style.card + " w-full lg:w-[500px] sm:w-[400px]"}>
      {isLoading && <Loader />}
      <h2 className="text-2xl text-center text-black">{type}</h2>
      {
        <p className={`${style.alert} ${error ? "" : "invisible"}`}>
          {error || "Dummy"}
        </p>
      }
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="w-3/4">
          {type === "Register" && (
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User Name
              </label>
              <input
                type="text"
                onFocus={resetError}
                id="username"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john doe"
                required
              />
            </div>
          )}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              onFocus={resetError}
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onFocus={resetError}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <p className="text-center mt-2 text-gray-500 text-sm">
            {type === "Login" ? (
              <>
                Don't have an account?{" "}
                <Link href="/register">Register here</Link>
              </>
            ) : (
              <>
                Already have an account ? <Link href="/login">Login here</Link>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
