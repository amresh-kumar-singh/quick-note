"use client";
import style from "@/src/components/note/note.module.css";
import useFetch from "@/src/hooks/useFetch";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, MouseEvent, useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
  handleFetchNotes: () => void;
  showModal: string;
  toggleModal: () => void;
}

export default function CreateNote({
  handleFetchNotes,
  toggleModal,
  showModal,
}: Props) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { isLoading, handleFetch, data } = useFetch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const handleCreateOrUpdateNote = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const body = JSON.stringify({
      title,
      content,
    });

    const data = await handleFetch({
      method: id ? "PATCH" : "POST",
      path: "/api/note" + (id ? `/${id}` : ""),
      body,
    });
    if (data) {
      setContent("");
      setTitle("");
      toast.success("Note created successfully!");
      handleFetchNotes();
      toggleModal();
    }
  };

  const handleFetchNote = async () => {
    if (!id) return;
    const data = await handleFetch({ method: "GET", path: `/api/note/${id}` });
    if (data) {
      setTitle(data.title);
      setContent(data.content);
    }
  };

  useEffect(() => {
    if (id) handleFetchNote();
    else {
      setContent("");
      setTitle("");
    }
  }, [id]);

  return (
    <>
      <button
        className={style.add}
        onClick={() => {
          toggleModal();
          router.push("/");
        }}
      >
        ➕
      </button>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${showModal} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full flex ${style.bgblop}`}
        onClick={toggleModal}
      >
        <div
          className="relative p-4 w-full max-w-md max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Note
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type title here"
                  />
                </div>
                <div className="col-span-2">
                  <textarea
                    id="content"
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                  ></textarea>
                </div>
              </div>
              <button
                onClick={handleCreateOrUpdateNote}
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Save note
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
