"use client";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import Auth from "../auth";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function Login({ title = "Login", ...props }) {
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      let res = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        callbackUrl: searchParams.get("callbackUrl") || "/",
      });
      if (!res?.ok) {
        setError(res?.error || "");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const resetError = () => setError("");

  return (
    <Auth
      handleSubmit={handleSubmit}
      type="Login"
      error={error}
      resetError={resetError}
    />
  );
}
