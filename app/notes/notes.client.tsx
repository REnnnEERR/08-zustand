"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api"; 
import css from "./Notes.module.css"; // Переконайся, що файл називається саме так

export default function NoteDetailsClient() {
  const params = useParams();
  // Безпечно дістаємо ID
  const noteId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", noteId], 
    queryFn: () => fetchNoteById(noteId as string), 
    enabled: !!noteId, // Запит не піде, поки id порожній
    retry: 1, // Не мучити сервер, якщо нотатки немає
  });

  if (isLoading) {
    return <p className={css.loading}>Завантаження нотатки...</p>;
  }

  if (isError || !note) {
    return (
      <div className={css.errorContainer}>
        <p>Упс! Нотатку не знайдено або сталася помилка при завантаженні.</p>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <article className={css.item}>
        <header className={css.header}>
          <h2 className={css.title}>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </header>
        
        <div className={css.contentBody}>
          <p className={css.content}>{note.content}</p>
        </div>

        <footer className={css.footer}>
          <p className={css.date}>
            Створено: {note.createdAt ? new Date(note.createdAt).toLocaleString('uk-UA') : "Дата невідома"}
          </p>
        </footer>
      </article>
    </div>
  );
}