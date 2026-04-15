import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: {
    slug?: string[];
  };
};

export default async function FilteredNotesPage({ params }: Props) {
  const queryClient = new QueryClient();

  const tag = params.slug?.[0];
  const activeTag = tag === "all" ? undefined : tag;

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", activeTag],
    queryFn: () => fetchNotes(1, "", 12, activeTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}