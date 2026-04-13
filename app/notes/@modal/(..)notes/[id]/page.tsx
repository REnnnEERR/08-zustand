"use client";

import { useRouter } from "next/navigation";
import { Modal } from "@/components/Modal/Modal";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

export default function NotePreviewModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // 🔥 повертає назад (закриває модалку)
  };

  return (
    <Modal onClose={handleClose}>
      <NoteDetailsClient id={params.id} />
    </Modal>
  );
}