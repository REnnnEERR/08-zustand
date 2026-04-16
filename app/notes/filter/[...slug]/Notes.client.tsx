"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Modal } from "@/components/Modal/Modal";
import css from "@/app/notes/Notes.module.css";

type Props = {
  tag?: string;
};

export default function FilterNotesClient({ tag }: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag],
    queryFn: () => fetchNotes(page, debouncedSearch, 12, tag),
    placeholderData: keepPreviousData,
  });

  return (
    <section className={css.container}>
      <div className={css.controls}>
        
<SearchBox
  value={search}
  onChange={(value) => {
    setSearch(value);
    setPage(1);
  }}
/>

        <button
          className={css.addButton}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Note
        </button>
      </div>

      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        <>
          <NoteList notes={data?.notes ?? []} />
          <Pagination
            currentPage={page}
            pageCount={data?.totalPages ?? 1}
            onPageChange={(e) => setPage(e.selected + 1)}
          />
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
            onSuccess={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </section>
  );
}
``