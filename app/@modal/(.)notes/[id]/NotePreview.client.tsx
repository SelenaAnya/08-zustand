"use client";

import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import NotePreview from "@/components/NotPreview/NotPreview";
import { Note } from "@/types/note";

export default function NoteDetailsClient() {
  const { id } = useParams();
  const router = useRouter();

  const parseId = Number(id);
  const handleCloseModal = () => {
    router.back();
  };

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["notes", parseId],
    queryFn: () => fetchNoteById(parseId),
    refetchOnMount: false,
  });

  if (!id || Number.isNaN(id)) return <p>Invalid ID</p>;
  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleCloseModal}>
      <NotePreview note={note} onClose={handleCloseModal} />
    </Modal>
  );
}
