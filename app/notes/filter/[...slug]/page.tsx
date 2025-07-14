import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug[0] === "All" ? "All" : slug[0];

  return {
    title: tag !== "All" ? `Notes tagged "${tag}"` : "All notes",
    description:
      tag !== "All"
        ? `A collection of notes tagget with "${tag}"`
        : "A collection of all notes",
    openGraph: {
      title: `Notes: ${tag}`,
      description: "some description",
      url: "https://notehub.com/notes/",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: tag ? `Notes tagget "${tag}"` : "All notes",
        },
      ],
    },
  };
};

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  const data = await fetchNotes(1, "", 12, tag);

  return <NotesClient initialData={data} tag={tag} />;
}