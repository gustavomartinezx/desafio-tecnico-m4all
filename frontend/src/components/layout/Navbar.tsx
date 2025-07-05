"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Printer, PlusCircle, ChevronLeft, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { NavItemType } from "@/types/navbar";

function NavItem({ item, open }: { item: NavItemType; open: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <li className="relative">
      <Link
        href={item.href}
        className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? "bg-violet-100 text-[#7a0098]"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        <item.icon className="h-5 w-5 shrink-0" />
        <AnimatePresence>
          {open && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {!open && (
          <div className="invisible absolute left-full top-1/2 z-20 ml-4 -translate-y-1/2 rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
            {item.label}
          </div>
        )}
      </Link>
    </li>
  );
}

export function Navbar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const navItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/printers", label: "Impressoras", icon: Printer },
    { href: "/form", label: "Nova Impressora", icon: PlusCircle },
  ];
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-50 hidden h-screen flex-col bg-white shadow-lg transition-all duration-300 ease-in-out md:flex ${
          open ? "w-60" : "w-20"
        }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="absolute -right-3 top-8 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-gray-200 transition-transform hover:scale-110"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          <ChevronLeft
            className={`h-4 w-4 text-[#7a0098] transition-transform duration-300 ${
              open ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>

        <div className="flex h-full flex-col justify-between overflow-x-hidden">
          <div>
            <div
              className={`flex items-center gap-2 border-b p-4 ${
                open ? "justify-start" : "justify-center"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100">
                <img
                  src="/media4all_logo.png"
                  alt="Logo Media4All"
                  className="h-8 w-8 object-contain"
                />
              </div>
              {open && (
                <AnimatePresence>
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    className="whitespace-nowrap text-lg font-bold text-[#7a0098]"
                  >
                    Media4all
                  </motion.h1>
                </AnimatePresence>
              )}
            </div>

            <ul className="flex flex-col gap-1 p-2">
              {navItems.map((item) => (
                <NavItem key={item.href} item={item} open={open} />
              ))}
            </ul>
          </div>

          <div className="border-t p-2">
            <ul className="flex flex-col gap-1">
              <li className="relative">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  style={{
                    outline: "none",
                    border: "none",
                    background: "none",
                  }}
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  <AnimatePresence>
                    {open && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        Sair
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {!open && (
                    <div className="invisible absolute left-full top-1/2 z-20 ml-4 -translate-y-1/2 rounded-md bg-gray-800 px-2 py-1 text-xs font-medium text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                      Sair
                    </div>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center bg-white shadow-md md:hidden">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-violet-100"
          aria-label="Abrir menu"
        >
          <img
            src="/media4all_logo.png"
            alt="Logo Media4All"
            className="h-8 w-8 object-contain"
          />
        </button>
        <span className="ml-3 text-lg font-bold text-[#7a0098]">Media4all</span>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-50 flex h-full w-64 flex-col bg-white shadow-lg">
            <div className="flex items-center gap-2 border-b p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                <img
                  src="/media4all_logo.png"
                  alt="Logo Media4All"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <span className="text-lg font-bold text-[#7a0098]">
                Media4all
              </span>
            </div>
            <ul className="flex flex-col gap-1 p-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "bg-violet-100 text-[#7a0098]"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t p-2">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                style={{ outline: "none", border: "none", background: "none" }}
              >
                <LogOut className="h-5 w-5" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
