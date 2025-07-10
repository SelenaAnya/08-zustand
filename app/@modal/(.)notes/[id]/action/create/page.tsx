"use client";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useRouter } from "next/navigation";

export default function CreateNoteModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };
  return (
    <Modal onClose={handleClose}>
      <NoteForm />
    </Modal>
  );
}