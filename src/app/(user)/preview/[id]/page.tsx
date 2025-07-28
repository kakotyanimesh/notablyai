import { getNotes } from "@/app/actions/notes";
import { AIsummary } from "@/app/components/chatBox";

export default async function Preview({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const notes = await getNotes({ id: Number(id) });
  // console.log(notes);

  if (!notes || "errorInfo" in notes) {
    return <div>empaty notes no </div>;
  }

  return (
    <div className="flex flex-row justify-between gap-10">
      <div className="flex flex-col space-y-5 flex-1 text-left border border-purple-900 rounded-2xl px-5 min-h-[500px] w-[700px]">
        <h1 className="text-3xl font-bold bg-pink-800 rounded-t-2xl px-4 -mx-5">{notes.notesTile}</h1>
        <p className="text-md w-fit rounded-tr-2xl rounded-bl-2xl bg-purple-500/40 px-2 py-1">
          {notes.createdAt.toDateString()}
        </p>
        <p>{notes.data}</p>
      </div>
        <AIsummary notes={notes.data} />
    </div>
  );
}
