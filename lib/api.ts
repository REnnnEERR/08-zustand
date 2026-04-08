import axios from 'axios';
import type { Note } from '../types/note';

// Функція для створення екземпляра Axios
const getApi = () => {
  return axios.create({
    baseURL: 'https://notehub-public.goit.study/api',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });
};

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Отримання списку нотаток
export const fetchNotes = async (
  page: number = 1,
  search: string = '',
  perPage: number = 12
): Promise<FetchNotesResponse> => {
  const response = await getApi().get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search },
  });
  return response.data;
};


export const createNote = async (
  noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const response = await getApi().post<Note>('/notes', noteData);
  return response.data;
};

// Видалення нотатки
export const deleteNote = async (noteId: string): Promise<Note> => {
  const response = await getApi().delete<Note>(`/notes/${noteId}`);
  return response.data;
};

// Отримання однієї нотатки по ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await getApi().get<Note>(`/notes/${id}`);
  return data;
};