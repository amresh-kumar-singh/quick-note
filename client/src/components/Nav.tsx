"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import style from "@/src/components/note/note.module.css";
import { useState } from "react";

export default function Nav(props: any) {
  const [show, setShow] = useState("hidden");
  const { data: session } = useSession();
  const pathname = usePathname();
  const toggleShow = () =>
    setShow((prev) => (prev === "hidden" ? "visible" : "hidden"));
  return (
    <section className="relative mx-auto">
      <Toaster position="bottom-left" />
      <nav className="flex justify-between bg-gray-900 text-white">
        <div className="px-5 xl:px-12 py-6 flex items-center w-screen">
          <a className="text-3xl font-bold font-heading" href="/">
            Quick Note
          </a>
          <ul className="hidden md:flex justify-end px-4 ml-auto font-semibold font-heading space-x-12">
            {session?.user?.email ? (
              <>
                <li>
                  <button
                    className="hover:text-gray-200"
                    title={session.user.username}
                  >
                    {session.user.email}
                  </button>
                </li>
                <li>
                  <button
                    className="hover:text-gray-200"
                    onClick={() => signOut()}
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                {pathname.includes("register") ? (
                  <Link href="/login">Login</Link>
                ) : (
                  <Link href="/register">Register</Link>
                )}
              </li>
            )}
          </ul>
        </div>
        {/* <!-- Responsive navbar --> */}
        {/* <a className="md:hidden flex mr-6 items-center" href="#">
          <span className="flex absolute -mt-5 ml-4">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        </a> */}
        <div
          className="navbar-burger self-center mr-12 cursor-pointer relative md:hidden"
          onClick={toggleShow}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 hover:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <div className={style.popover + " absolute bg-gray-400 p-4 " + show}>
            <ul className="flex flex-col justify-end items-end w-[60px] ml-auto font-semibold font-heading space-x-12">
              {session?.user?.email ? (
                <>
                  <li className="w-full">
                    <div
                      className="hover:text-gray-200 text-center"
                      title={session.user.email}
                    >
                      {session.user.username}
                    </div>
                  </li>
                  <li className="w-full">
                    <button
                      className="hover:text-gray-200 underline"
                      onClick={() => signOut()}
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  {pathname.includes("register") ? (
                    <Link
                      href="/login"
                      className="w-full underline text-center"
                    >
                      Login
                    </Link>
                  ) : (
                    <Link href="/register" className="w-full underline">
                      Register
                    </Link>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}
