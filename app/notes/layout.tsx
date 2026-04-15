import React from "react";

type Props = {
  children: React.ReactNode;
  modal?: React.ReactNode;
  sidebar?: React.ReactNode;
};

export default function NotesLayout(props: Props) {
  const { children, modal, sidebar } = props;

  return (
    <div style={{ display: "flex", gap: "24px", padding: "20px" }}>
      {sidebar && (
        <aside style={{ width: "220px", flexShrink: 0 }}>{sidebar}</aside>
      )}
      <main style={{ flex: 1 }}>{children}</main>
      {modal}
    </div>
  );
}