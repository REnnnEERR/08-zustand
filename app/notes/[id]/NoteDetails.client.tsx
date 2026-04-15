"use client";

import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";


type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  return <NotePreviewClient id={id} />;
}