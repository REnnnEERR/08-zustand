"use client";

export default function NoteDetailsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <p>Failed to load note details.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
