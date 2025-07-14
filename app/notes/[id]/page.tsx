import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const parseId = Number(id);
  const note = await fetchNoteById(parseId);
  return {
    title: note.title,
    description: note.content,
    openGraph: {
      title: note.title,
      description: note.content.slice(0, 200),
      url: `https://notehub.com/notes/${parseId}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 300,
          height: 300,
          alt: note.title,
        },
      ],
    },
  };
};

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