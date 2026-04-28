import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-center px-6">
      
      <h1 className="text-5xl font-bold mb-4">Tasklify</h1>
      <p className="text-lg mb-8 max-w-md">
        Kelola tugas dan board kamu dengan mudah, cepat, dan modern 🚀
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-indigo-700 px-6 py-3 rounded-lg font-semibold shadow hover:scale-105 transition"
        >
          Register
        </Link>
      </div>

    </div>
  );
}