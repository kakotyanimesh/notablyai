import { create } from "zustand";

type NoteTypes = {
  notes: string;
};

type NoteAction = {
  setNotes: (n: string) => void;
};

export const useNoteStore = create<NoteTypes & NoteAction>((set) => ({
    notes : "",
    setNotes : (n) => set({notes : n})
}))
