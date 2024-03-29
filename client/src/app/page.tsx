"use client";
import Note from "../components/note";
import CreateNote from "../components/note/CreateNote";
import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useFetch from "../hooks/useFetch";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";

export default function Home() {
  const { data: session, ...rest } = useSession();
  const router = useRouter();
  const { isLoading, handleFetch, data } = useFetch();
  const [showModal, setShowModal] = useState("hidden");

  const handleFetchNotes = async () => {
    await handleFetch({ method: "GET", path: "/api/note" });
  };

  const toggleModal = () => {
    showModal === "visible" && router.push("/#Note");
    setShowModal((prev) => (prev === "hidden" ? "visible" : "hidden"));
  };

  useEffect(() => {
    if (session?.user.token) handleFetchNotes();
  }, [session?.user.token]);

  return (
    <>
      <Suspense>
        <CreateNote
          handleFetchNotes={handleFetchNotes}
          showModal={showModal}
          toggleModal={toggleModal}
        />
      </Suspense>
      <div className="w-full flex flex-wrap justify-around">
        {isLoading && <Loader />}

        {(data || []).length ? (
          (data || []).map(
            ({ title, content, updatedAt, _id }: any, index: number) => {
              return (
                <Note
                  key={_id}
                  {...{
                    title,
                    content,
                    id: _id,
                    updatedAt: new Date(updatedAt).toLocaleDateString(),
                    handleFetchNotes,
                    toggleModal,
                  }}
                />
              );
            }
          )
        ) : (
          <p className="text-justify">
            Please create your first note by clicking on{" "}
            <strong className="text-xl">⊕</strong> button in the bottom left
            corner.
          </p>
        )}
      </div>
    </>
  );
}
