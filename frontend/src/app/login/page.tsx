"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User, Lock, LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.remove();
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      if (res.data.token) {
        toast.remove();
        toast.success("Login realizado com sucesso!");
        localStorage.setItem("token", res.data.token);
        router.push("/");
      } else {
        toast.remove();
        toast.error("Usuário ou senha inválidos.");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          toast.remove();
          toast.error("Não foi possível conectar ao servidor.");
        } else {
          const serverError =
            err.response.data?.message || err.response.data?.error;
          toast.remove();
          toast.error(serverError || "Usuário ou senha inválidos.");
        }
      } else {
        toast.remove();
        toast.error("Ocorreu um erro inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="border-b border-gray-200 p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
            <img
              src="/media4all_logo.png"
              alt="Logo Media4All"
              className="h-12 w-12 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bem-vindo de volta!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Acesse o seu painel de impressora da Media4All.
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="username"
                name="username"
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 text-gray-900 transition-colors focus:border-[#7a0098] focus:outline-none focus:ring-2 focus:ring-violet-200"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 text-gray-900 transition-colors focus:border-[#7a0098] focus:outline-none focus:ring-2 focus:ring-violet-200"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              className="flex w-full items-center justify-center rounded-lg bg-[#7a0098] p-3 text-base font-semibold text-white transition-all hover:bg-[#6b0086] focus:outline-none focus:ring-2 focus:ring-[#7a0098] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoaderCircle className="h-6 w-6 animate-spin" />
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
