"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Health Test", path: "/health-test" },
    { name: "PCOS", path: "/pcos" },
    { name: "Period", path: "/period" },
    { name: "Water", path: "/water" },
    { name: "AI Chat", path: "/ai-chat" },
    { name: "Analytics", path: "/analytics" },
    { name: "History", path: "/history" },
  ];

  return (
    <nav className="bg-pink-500 text-white sticky top-0 z-50 shadow-lg">

      <div className="max-w-7xl mx-auto px-5 py-4">

        <div className="flex justify-between items-center">

          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">
              🌸 BloomHer AI
            </h1>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">

            {links.map((link) => (

              <Link
                key={link.path}
                href={link.path}
                className={`transition ${
                  pathname === link.path
                    ? "font-bold text-yellow-300"
                    : "hover:text-pink-200"
                }`}
              >
                {link.name}
              </Link>

            ))}

          </div>

        </div>

        {/* Mobile Menu */}

        {open && (

          <div className="md:hidden flex flex-col mt-5 gap-4 border-t border-pink-300 pt-4">

            {links.map((link) => (

              <Link
                key={link.path}
                href={link.path}
                onClick={() => setOpen(false)}
                className={`text-lg ${
                  pathname === link.path
                    ? "font-bold text-yellow-300"
                    : "hover:text-pink-200"
                }`}
              >
                {link.name}
              </Link>

            ))}

          </div>

        )}

      </div>

    </nav>
  );
}