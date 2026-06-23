"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {

  const [open, setOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "Period", path: "/period" },
    { name: "Water", path: "/water" },
    { name: "PCOS", path: "/pcos" },
    { name: "History", path: "/pcos-history" },
    { name: "AI Chat", path: "/ai-chat" },
    { name: "Analytics", path: "/analytics" },
  ];


  return (

    <nav className="bg-pink-500 text-white px-6 py-4">

      <div className="flex justify-between items-center">

        <h1 className="text-xl font-bold">
          🌸 BloomHer AI
        </h1>


        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

      </div>



      <div
        className={`
        ${open ? "flex" : "hidden"}
        md:flex
        flex-col
        md:flex-row
        gap-4
        mt-4
        md:mt-0
        `}
      >

        {links.map((link) => (

          <Link
            key={link.path}
            href={link.path}
            className="hover:text-pink-200"
            onClick={() => setOpen(false)}
          >

            {link.name}

          </Link>

        ))}

      </div>


    </nav>

  );
}