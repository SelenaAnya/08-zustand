export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}


export interface CreateNoteData {
  title: string;
  content: string;
  tag: string;
}

export interface UpdateNoteData {
  id: number;
  title: string;
  content: string;
  tag: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";


export interface NotePreviewProps {
  note: {
    title: string;
    tag: string;
    content: string;
    createdAt: Date;
    note: Note;
  };
}
export interface NotesClient {
 title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}