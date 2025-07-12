'use client';

import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import css from './NoteDetails.module.css';
import ErrorText from '@/components/Error/Error';

export default function NoteDetailsClient() {
  const { id } = useParams();
  const parseId = Number(id);
  
  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["note", parseId],
    queryFn: () => fetchNoteById(parseId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <strong className={css.loading}>Loading note...</strong>;
  }

  if (isError || !note) {
    return <ErrorText message="Note not found or failed to load." />;
  }

  if (!id || Number.isNaN(id)) {
    return <ErrorText message="Invalid note ID." />;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.backBtn}>
            Go back
          </button>
        </div>
        <p className={css.content}>{note.content}</p>
        <div className={css.tagContainer}>
          <span className={css.tag}>{note.tag}</span>
        </div>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
        {note.updatedAt !== note.createdAt && (
          <p className={css.date}>
            Updated: {new Date(note.updatedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}