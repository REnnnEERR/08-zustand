import { getNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';

type Props = {
  params: { slug: string[] };
};

const NotesByCategory = async ({ params }: Props) => {
  const tag = params.slug[0] === 'all' ? undefined : params.slug[0];

  const data = await getNotes(tag);

  return (
    <div>
      <h1>Notes List</h1>
      {data?.notes?.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
};

export default NotesByCategory;