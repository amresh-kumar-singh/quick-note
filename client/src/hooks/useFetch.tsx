import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  path: string;
  body?: any;
  method: "GET" | "POST" | "DELETE" | "PATCH";
}
export default function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const { data: session } = useSession();

  const handleFetch = async ({ path, body, method = "GET" }: Props) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_PATH}${path}`, {
        method,
        body,
        headers: {
          authorization: "token " + session?.user.token,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setData(data);
        return data;
      } else {
        const error: any = await res.json();
        const formattedError = Array.isArray(error.message)
          ? error.message[0]
          : error.message;
        if (formattedError == "Please login to continue!") {
          signOut();
        }
        throw new Error(formattedError);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, handleFetch };
}
