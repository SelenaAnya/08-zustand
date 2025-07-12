import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DraftNote } from '@/types/note';

const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStore ={
  draft: DraftNote;
  setDraft: (note: DraftNote) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note: DraftNote) => set({ draft: note }),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage',
    }
  )
);