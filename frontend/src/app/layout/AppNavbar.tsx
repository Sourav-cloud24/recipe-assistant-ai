"use client";

import { Bell, Moon, Search } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function AppNavbar() {
  return (
    <header
      className="sticky top-0 z-40 flex h-16 items-center justify-between border-b px-6"
      style={{
        backgroundColor: "var(--header)",
        borderBottomColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <SidebarTrigger
          className="rounded-md transition hover:bg-(--primary)/10"
          style={{ color: "var(--text)" }}
        />

        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>
            Dashboard
          </h1>

          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Welcome back 👋
          </p>
        </div>
      </div>

      {/* Center */}
      <div className="hidden w-full max-w-md lg:block">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--primary)" }}
          />

          <Input
            placeholder="Search recipes..."
            className="pl-10"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text)",
              borderColor: "var(--border)",
            }}
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button
          className="rounded-lg p-2 transition hover:bg-(--color-accent-soft)"
          style={{ color: "var(--color-parchment)" }}
        >
          <Moon size={20} />
        </button>

        <button
          className="rounded-lg p-2 transition hover:bg-(--primary)/10"
          style={{ color: "var(--text)" }}
        >
          <Bell size={20} />
        </button>

        <Avatar className="cursor-pointer">
          <AvatarFallback
            className="font-semibold"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--text)",
            }}
          >
            SD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}