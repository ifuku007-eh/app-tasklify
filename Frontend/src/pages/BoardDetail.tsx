import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { boardService } from "../services/boardService";
import { taskService } from "../services/taskService";

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

import ColumnDropZone from "../components/ColumnDropZone";
import TaskDetailModal from "../components/TaskDetailModal";
import CreateTaskModal from "../components/CreateTaskModal";

export default function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState<any>(null);

  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [editTask] = useState<any>(null);
  const [editOpen, setEditOpen] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const fetchBoard = async () => {
    const res = await boardService.getBoardDetail(id!);
    setBoard(res.data);
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over) return;

    await taskService.updateTask(active.id, {
      columnId: over.id,
    });

    fetchBoard();
  };

  if (!board) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">{board.title}</h1>

        <button
          onClick={() => setCreateOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Task
        </button>
      </div>

      {/* BOARD */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto">
          {board.columns.map((col: any) => (
            <ColumnDropZone
              key={col.id}
              column={col}
              onDetail={(task: any) => {
                setSelectedTask(task);
                setDetailOpen(true);
              }}
            />
          ))}
        </div>
      </DndContext>

      {/* DETAIL MODAL */}
      {detailOpen && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setDetailOpen(false)}
        />
      )}

      {/* EDIT MODAL (reuse modal atau buat sendiri) */}
      {editOpen && editTask && (
        <TaskDetailModal
          task={editTask}
          mode="edit"
          onClose={() => setEditOpen(false)}
          onUpdated={fetchBoard}
        />
      )}

      {/* CREATE */}
      {createOpen && (
        <CreateTaskModal
          board={board}
          onClose={() => setCreateOpen(false)}
          onCreated={fetchBoard}
        />
      )}
    </div>
  );
}
