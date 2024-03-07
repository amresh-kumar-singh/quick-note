"use client";
import Auth from "@/src/components/auth";
import { redirect, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function Register() {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
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
    }
  };
  const resetError = () => setError("");
  return <Auth {...{ handleSubmit, error, resetError, type: "Register" }} />;
}
