// app/notes/[id]/NoteDetails.client.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient({ id }: { id: string }) {
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: !!id,
  });

  if (isLoading) return <p>Завантажую...</p>;
  if (error || !note) return <p>Сталася помилка.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <h2>{note.title}</h2>
        <span className={css.tag}>{note.tag}</span>
        <p>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}