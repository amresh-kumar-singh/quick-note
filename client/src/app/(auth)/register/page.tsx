"use client";
import Auth from "@/src/components/auth";
import { redirect, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}/api/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        toast.success("User created! Please log in.");
        router.replace("/login");
      } else {
        const error = await response.json();
        const message = Array.isArray(error.message)
          ? error.message?.[0]
          : error.message;
        setError(message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const resetError = () => setError("");
  return (
    <Auth
      {...{ handleSubmit, error, resetError, type: "Register", isLoading }}
    />
  );
}
