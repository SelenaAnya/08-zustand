import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const parseId = Number(id);

  try {
    const note = await fetchNoteById(parseId);

    return {
      title: `${note.title} | NoteHub`,
      description: note.content.length > 160
        ? `${note.content.substring(0, 160)}...`
        : note.content,
      openGraph: {
        title: `${note.title} | NoteHub`,
        description: note.content.length > 160
          ? `${note.content.substring(0, 160)}...`
          : note.content,
        url: `https://notehub.example.com/notes/${note.id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: `Note: ${note.title}`,
          },
        ],
        type: "article",
      },
    };
  } catch (error) {
    return {
      title: "Note Not Found | NoteHub",
      description: "The requested note could not be found.",
    };
  }
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const parseId = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", parseId],
    queryFn: () => fetchNoteById(parseId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;