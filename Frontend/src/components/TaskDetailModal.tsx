import { taskService } from "../services/taskService";
import { useState } from "react";

export default function TaskDetailModal({
  task,
  onClose,
  onUpdated,
}: any) {
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  if (!task) return null;

  // UPDATE TASK
  const handleUpdate = async () => {
    await taskService.updateTask(task.id, {
      title,
      description,
    });

    setIsEdit(false);
    onUpdated();
    onClose();
  };

  // DELETE TASK
  const handleDelete = async () => {
    const ok = window.confirm("Yakin ingin menghapus task?");
    if (!ok) return;

    await taskService.deleteTask(task.id);
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded-xl w-[420px] space-y-3">

        {/* VIEW MODE */}
        {!isEdit && (
          <>
            <h2 className="text-lg font-bold">{task.title}</h2>

            <p className="text-gray-600">
              {task.description || "No description"}
            </p>

            <div className="flex justify-end gap-2 pt-3">

              {/* EDIT BUTTON */}
              <button
                onClick={() => setIsEdit(true)}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                Edit
              </button>

              {/* DELETE */}
              <button
                onClick={handleDelete}
                className="px-3 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>

              <button
                onClick={onClose}
                className="px-3 py-2 border rounded"
              >
                Close
              </button>

            </div>
          </>
        )}

        {/* EDIT MODE */}
        {isEdit && (
          <>
            <h2 className="text-lg font-bold">Edit Task</h2>

            <input
              className="w-full border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-end gap-2 pt-3">

              <button
                onClick={() => setIsEdit(false)}
                className="px-3 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-3 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>

            </div>
          </>
        )}

      </div>
    </div>
  );
}