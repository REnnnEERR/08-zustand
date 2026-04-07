import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./[id]/Notes.client";

export default async function NotesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // В Next.js 15 params треба await-ити
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
  queryKey: ["notes", ""], 
  queryFn: () => fetchNoteById(id), // ПЕРЕВІР: має бути fetchNotes, а не fetchNoteById
});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}