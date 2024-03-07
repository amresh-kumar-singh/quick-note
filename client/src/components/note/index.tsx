"use client";
import useFetch from "@/src/hooks/useFetch";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  title: string;
  content: string;
  updatedAt: string;
  id: string;
  handleFetchNotes: () => void;
  toggleModal: () => void;
}

export default function Note({
  title,
  content,
  updatedAt,
  id,
  handleFetchNotes,
  toggleModal,
}: Props) {
  const { isLoading, handleFetch, data } = useFetch();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const data = await handleFetch({
        path: `/api/note/${id}`,
        method: "DELETE",
      });
      if (data) {
        if (data.deletedCount) {
          toast.success("Note deleted!");
          handleFetchNotes();
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleClick = () => {
    router.push("/?id=" + id);
    toggleModal();
  };
  return (
    <div className="w-[280px] mb-3 bg-yellow-100 rounded flex flex-col justify-between overflow-hidden shadow-lg line-clamp-10 min-h-[200px] md:w-[320px]">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2" onClick={handleClick}>
          {title}
        </div>
        <p
          className="text-gray-700 text-base text-justify"
          onClick={handleClick}
        >
          {content}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between">
        <span
          className="inline-block  px-3 py-1 text-sm font-light text-gray-700 mr-2 mb-2"
          title="Created At"
        >
          {updatedAt}
        </span>
        <button
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          title="Updated At"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
