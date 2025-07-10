"use client";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useRouter } from "next/navigation";

export default function NoteCreateClient() {
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  const handleSuccess = () => {
    router.back();
  };

  return (
    <Modal onClose={handleCloseModal}>
      <NoteForm onClose={handleCloseModal} onSuccess={handleSuccess} />
    </Modal>
  );
}