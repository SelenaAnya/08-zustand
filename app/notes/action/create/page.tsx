"use client";

import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useRouter } from "next/navigation";

export default function NoteCreateModal() {
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  const handleSuccess = () => {
    router.push("/notes/filter/All");
  };

  return (
    <Modal onClose={handleCloseModal}>
      <div style={{ padding: "20px", maxWidth: "500px" }}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Create New Note</h2>
        <NoteForm onClose={handleCloseModal} onSuccess={handleSuccess} />
      </div>
    </Modal>
  );
}