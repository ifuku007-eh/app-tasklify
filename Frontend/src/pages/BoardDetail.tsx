import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { boardService } from "../services/boardService";
import { Button } from "@/components/ui/button";

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState<any>(null);

  const fetchBoard = async () => {
    try {
      const res = await boardService.getBoardDetail(id!);
      setBoard(res.data);
    } catch (error) {
      alert("Gagal mengambil detail board");
    }
  };

  useEffect(() => {
    if (id) fetchBoard();
  }, [id]);

  if (!board) {
    return <div className="p-6">Loading board...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{board.title}</h1>
          <p className="text-gray-500">{board.description}</p>
        </div>

        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back
        </Button>
      </div>

      {/* COLUMN PREVIEW (TEMP BEFORE DRAG DROP) */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {board.columns.map((col: any) => (
          <div key={col.id} className="bg-gray-100 p-3 rounded-lg">
            <h2 className="font-semibold mb-2">{col.title}</h2>

            {col.tasks.length === 0 ? (
              <p className="text-sm text-gray-400">No tasks</p>
            ) : (
              col.tasks.map((task: any) => (
                <div
                  key={task.id}
                  className="bg-white p-2 rounded shadow-sm mb-2"
                >
                  {task.title}
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}