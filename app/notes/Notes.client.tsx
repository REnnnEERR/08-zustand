"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import { Pagination } from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { Modal } from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./Notes.module.css";

export default function NotesClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    
    placeholderData: keepPreviousData,
  });

  return (
    <main className={css.container}>
      <div className={css.controls}>
        <SearchBox value={search} onChange={handleSearchChange} />
        <button onClick={() => setIsModalOpen(true)} className={css.addButton}>
          Add New Note
        </button>
      </div>

      {isLoading && !data ? (
        <p>Loading, please wait...</p>
      ) : (
        <>
          <NoteList notes={data?.notes || []} />
          <Pagination
            pageCount={data?.totalPages || 1}
            currentPage={page} 
            onPageChange={(p: { selected: number }) => setPage(p.selected + 1)}
          />
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm 
            onSuccess={() => setIsModalOpen(false)} 
            onCancel={() => setIsModalOpen(false)} 
          />
        </Modal>
      )}
    </main>
  );
}