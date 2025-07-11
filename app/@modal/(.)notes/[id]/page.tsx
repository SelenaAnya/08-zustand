import type { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes, fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "../../../notes/[id]/NoteDetails.client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params;
  const parseId = Number(id);

  try {
    const note = await fetchNoteById(parseId);

    const title = `${note.title} | NoteHub`;
    const description = note.content.length > 160
      ? `${note.content.substring(0, 157)}...`
      : note.content || `Read the full note "${note.title}" on NoteHub.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://notehub.example.com/notes/${parseId}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: `NoteHub - ${note.title}`,
          },
        ],
        type: "article",
      },
    };
  } catch (error) {
    // Fallback metadata if note fetch fails
    return {
      title: "Note Not Found | NoteHub",
      description: "The requested note could not be found. Browse other notes on NoteHub.",
      openGraph: {
        title: "Note Not Found | NoteHub",
        description: "The requested note could not be found. Browse other notes on NoteHub.",
        url: `https://notehub.example.com/notes/${parseId}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub - Note Not Found",
          },
        ],
        type: "website",
      },
    };
  }
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const parseId = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", parseId],
    queryFn: () => fetchNotes(parseId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;