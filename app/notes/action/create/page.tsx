import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create New Note",
  description: "Create a new note in your personal note-taking app. Organize your thoughts and ideas efficiently.",
  openGraph: {
    title: "Create New Note | NoteHub",
    description: "Create a new note in your personal note-taking app. Organize your thoughts and ideas efficiently.",
    url: "https://notehub.example.com/notes/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Create New Note",
      },
    ],
    type: "website",
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h2 className={css.title}>Create New Note</h2>
        <NoteForm />
      </div>
    </main>
  );
}