import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";

export default function TaskCard({
  task,
  onDetail,
}: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      animate={{ scale: isDragging ? 1.03 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-white p-3 mb-2 rounded shadow select-none"
    >

      {/* DRAG HANDLE */}
      <div
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
        className="cursor-grab active:cursor-grabbing mb-2 text-xs text-gray-400"
      >
        ⋮ drag
      </div>

      {/* TITLE */}
      <div className="font-medium mb-2">
        {task.title}
      </div>

      {/* ONLY DETAIL BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={() => onDetail(task)}
          className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          Detail
        </button>
      </div>

    </motion.div>
  );
}