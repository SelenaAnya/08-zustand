import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

// type FilteredNotesPageProps = {
//   params: Promise<{ slug: string[] }>;
// };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  // Extract the slug from params 
  const { slug } = await params;
  const tag = slug[0] === "All" ? "All" : slug[0];

  return {
    title: tag !== "All" ? `${tag} Notes | NoteHub` : "All Notes | NoteHub",
    description:
      tag !== "All"
        ? `Browse your ${tag} notes in NoteHub. Filter and organize your notes by ${tag} category.`
        : "Browse all your notes in NoteHub. Organize and manage your thoughts, ideas, and important information.",
    openGraph: {
      title: 'Notes: ${tag}',
      description: "display all notes or filter by tag",
      url: "https://notehub.com/notes/",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: tag ? `Notes tagged "${tag}"` : "All notes",
        },
      ],
    }
  }

  }

export default async function FilteredNotesPage({
  params,
}: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  const data = await fetchNotes(1, "", 12, tag);

  return <NotesClient initialData={data} tag={tag} />;
}