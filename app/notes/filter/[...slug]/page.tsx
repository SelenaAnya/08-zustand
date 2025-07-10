import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type FilteredNotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: FilteredNotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "All" ? "All" : slug[0];

  const title = tag === "All"
    ? "All Notes | NoteHub"
    : `${tag} Notes | NoteHub`;

  const description = tag === "All"
    ? "Browse all your notes in NoteHub. Organize and manage your thoughts, ideas, and important information."
    : `Browse your ${tag} notes in NoteHub. Filter and organize your notes by ${tag} category.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.example.com/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${tag} Notes`,
        },
      ],
      type: "website",
    },
  };
}

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  const data = await fetchNotes(1, "", 12, tag);

  return <NotesClient initialData={data} tag={tag} />;
}