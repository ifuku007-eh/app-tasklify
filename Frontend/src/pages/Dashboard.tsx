import { useEffect, useState } from "react";
import { boardService } from "../services/boardService";
import CreateBoardModal from "../components/CreateBoardModal";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [boards, setBoards] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  // EDIT STATE
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#6366f1");

  const fetchBoards = async () => {
    const res = await boardService.getBoards();
    setBoards(res.data);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  // DELETE
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus board?");
    if (!confirmDelete) return;

    try {
      await boardService.deleteBoard(id);
      fetchBoards();
    } catch (error) {
      alert("Gagal menghapus board");
    }
  };

  // OPEN EDIT
  const openEdit = (board: any) => {
    setSelectedBoard(board);
    setTitle(board.title);
    setDescription(board.description || "");
    setColor(board.color || "#6366f1");
    setIsEditOpen(true);
  };

  // UPDATE
  const handleUpdate = async () => {
    try {
      await boardService.updateBoard(selectedBoard.id, {
        title,
        description,
        color,
      });

      setIsEditOpen(false);
      fetchBoards();
    } catch (error) {
      alert("Gagal update board");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <Button onClick={() => setShowModal(true)}>+ Create Board</Button>
      </div>

      {/* BOARD LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {boards.map((board) => (
          <Card key={board.id} className="hover:shadow-xl transition">
            <CardContent className="p-4 space-y-3">
              <div
                className="w-full h-2 rounded"
                style={{ backgroundColor: board.color }}
              />

              {/* 👇 ONLY TITLE CLICKABLE */}
              <h2
                className="font-semibold text-lg cursor-pointer hover:underline"
                onClick={() => navigate(`/board/${board.id}`)}
              >
                {board.title}
              </h2>

              <p className="text-sm text-gray-500">
                {board.description || "No description"}
              </p>

              {/* ACTION AREA ONLY */}
              <div
                className="flex gap-2 pt-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  className="cursor-pointer"
                  onClick={() => openEdit(board)}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handleDelete(board.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <CreateBoardModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchBoards}
        />
      )}

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl space-y-3">
            <h2 className="text-xl font-bold">Edit Board</h2>

            <input
              className="w-full border p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />

            <textarea
              className="w-full border p-2 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10"
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>

              <Button onClick={handleUpdate}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
