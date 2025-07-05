"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/login");
        setIsChecking(false);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setIsChecking(false);
      }
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <span className="text-gray-500">Carregando...</span>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
