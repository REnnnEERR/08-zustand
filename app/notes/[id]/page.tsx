import NoteDetailsClient from "./NoteDetails.client";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <NoteDetailsClient id={id} />;
}