import { useState } from "react";
import { taskService } from "../services/taskService";

export default function CreateTaskModal({
  board,
  onClose,
  onCreated,
}: any) {
  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    const todoColumn = board.columns.find(
      (c: any) => c.title.toLowerCase() === "to do"
    );

    await taskService.createTask({
      title,
      columnId: todoColumn.id,
      order: 0,
    });

    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-[400px] space-y-3">

        <h2 className="text-lg font-bold">Create Task</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  );
}