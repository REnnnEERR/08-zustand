"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import { Pagination } from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './Notes.module.css';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search), 
    refetchOnMount: false,
  });

  return (
    <main className={css.container}>
      <div className={css.controls}>
        <SearchBox value={search} onChange={setSearch} />
        <button onClick={() => setIsModalOpen(true)} className={css.addButton}>
          Add Note
        </button>
      </div>

      {isLoading ? (
        <p>Завантажую нотатки...</p>
      ) : (
        <>
          <NoteList notes={data?.notes || []} />
          <Pagination 
            pageCount={data?.totalPages || 1} 
            currentPage={page} 
            onPageChange={(p) => setPage(p.selected + 1)} 
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