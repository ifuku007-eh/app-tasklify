import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full h-14 border-b flex items-center justify-between px-6 bg-white">
      {/* LOGO */}
      <div
        className="font-bold text-lg cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        🚀 Tasklify
      </div>

      {/* NAV ACTIONS */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Boards
        </Button>

        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}