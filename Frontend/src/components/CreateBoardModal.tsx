import { useState } from "react";
import { boardService } from "@/services/boardService";

export default function CreateBoardModal({ onClose, onSuccess }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!title) return alert("Title wajib");

    try {
      await boardService.createBoard({
        title,
        description,
      });
      onSuccess();
      onClose();
    } catch (err) {
      alert("Gagal create board");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-lg font-bold">Create Board</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleCreate}
            className="bg-indigo-500 text-white px-4 py-1 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}