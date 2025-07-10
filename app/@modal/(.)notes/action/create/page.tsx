import type { Metadata } from "next";
import NoteCreateClient from "./NoteCreate.client";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub. Organize your thoughts and ideas with our simple note-taking interface.",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub. Organize your thoughts and ideas with our simple note-taking interface.",
    url: "https://notehub.example.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Create Note",
      },
    ],
    type: "website",
  },
};

export default function CreateNotePage() {
  return <NoteCreateClient />;
}