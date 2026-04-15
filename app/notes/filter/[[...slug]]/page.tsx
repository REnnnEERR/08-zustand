import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/Notes.client";

type Params = Promise<{ slug?: string[] }>;

export default async function FilteredNotesPage(props: { params: Params }) {
  const queryClient = new QueryClient();
  const params = await props.params;
  const tag = params?.slug?.[0];
  const activeTag = tag === "all" ? undefined : tag;

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", activeTag],
    queryFn: () => fetchNotes(1, "", 12, activeTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient params={props.params} />
    </HydrationBoundary>
  );
}