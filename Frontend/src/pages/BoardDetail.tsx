import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { boardService } from "../services/boardService";
import { taskService } from "../services/taskService";

import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";

import ColumnDropZone from "../components/ColumnDropZone";
import TaskDetailModal from "../components/TaskDetailModal";
import CreateTaskModal from "../components/CreateTaskModal";

import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function BoardDetail() {
  const { id } = useParams();
  const [board, setBoard] = useState<any>(null);

  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const fetchBoard = async () => {
    const res = await boardService.getBoardDetail(id!);
    setBoard(res.data);
  };

  useEffect(() => {
    fetchBoard();

    // 🔥 REALTIME LISTENER
    socket.on("task:created", fetchBoard);
    socket.on("task:updated", fetchBoard);
    socket.on("task:deleted", fetchBoard);
    socket.on("task:moved", fetchBoard);

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
      socket.off("task:moved");
    };
  }, []);

  // ✅ FIX DRAG
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newColumnId = over.id;

    try {
      await taskService.moveTask({
        taskId,
        columnId: newColumnId,
        order: 0,
      });
    } catch (err) {
      console.error("Drag error:", err);
    }
  };

  if (!board) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">{board.title}</h1>

        <button
          onClick={() => setCreateOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
        >
          + Create Task
        </button>
      </div>

      {/* BOARD */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
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

      {/* DETAIL */}
      {detailOpen && selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setDetailOpen(false)}
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