import { useState } from "react";
import { login } from "../services/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      // simpan token
      localStorage.setItem("token", data.token);

      alert("Login berhasil");
      navigate("/dashboard");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-600 tracking-light">Tasklify</h1>
          <p className="text-gray-500 mt-2">Silakan masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="nama@email.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold p-3 rounded-lg transition-colors shadow-sm mt-2"
          >
            Masuk Sekarang
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun? <Link to="/register" className="text-blue-600 hover:underline font-medium">Daftar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}