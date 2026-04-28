import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

export default function ColumnDropZone({ column, onDetail }: any) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className="w-80 bg-gray-100 p-3 rounded flex-shrink-0"
    >
      <h2 className="font-bold mb-3">{column.title}</h2>

      {column.tasks.map((task: any) => (
        <TaskCard
          key={task.id}
          task={task}
          onDetail={onDetail}
        />
      ))}
    </div>
  );
}
