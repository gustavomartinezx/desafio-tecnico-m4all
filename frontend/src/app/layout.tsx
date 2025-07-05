"use client";

import "./globals.css";
import { ReactNode, useState } from "react";
import { Providers } from "./Providers";
import { Navbar } from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";
import { ActivityLogProvider } from "@/context/ActivityLogContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [navbarOpen, setNavbarOpen] = useState(true);
  const pathname = usePathname();

  const showNavbar = pathname !== "/login";

  return (
    <html lang="pt-br">
      <body>
        <Providers>
          <ActivityLogProvider>
            {showNavbar ? (
              <div className="flex min-h-screen bg-gray-50">
                <Navbar setOpen={setNavbarOpen} open={navbarOpen} />
                <main
                  className={`flex-1 transition-all duration-300 ${
                    navbarOpen
                      ? "ml-60"
                      : "ml-20 flex items-center justify-center"
                  }`}
                >
                  {children}
                </main>
              </div>
            ) : (
              <main className="flex min-h-screen w-full items-center justify-center bg-gray-50">
                {children}
              </main>
            )}
          </ActivityLogProvider>
        </Providers>
      </body>
    </html>
  );
}
