import { useState, useEffect } from "react";
import { taskService } from "../services/taskService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditTaskModal({
  task,
  onClose,
  onSuccess,
}: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  const handleUpdate = async () => {
    try {
      await taskService.updateTask(task.id, {
        title,
        description,
      });

      onSuccess();
      onClose();
    } catch {
      alert("Gagal update task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px] space-y-3">
        <h2 className="text-lg font-bold">Edit Task</h2>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleUpdate}>Save</Button>
        </div>
      </div>
    </div>
  );
}