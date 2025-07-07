import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type FilteredNotesPageProps = {
  params: Promise<{ slug: string[] }>;
};

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  const data = await fetchNotes(1, "", 12, tag);

  return <NotesClient initialData={data} tag={tag} />;
}
