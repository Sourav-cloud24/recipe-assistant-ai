"use client";

import { Bell, Moon, Search, SidebarIcon } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function AppNavbar() {
  return (
    <header
      className="sticky top-0 z-40 flex h-16 items-center justify-between border-b px-6"
      style={{
        backgroundColor: "var(--color-ink)",
        borderBottomColor: "var(--color-accent-soft)",
        color: "var(--color-parchment)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <SidebarTrigger
          className="rounded-md transition hover:bg-(--color-accent-soft)"
          style={{ color: "var(--color-parchment)" }}
        />

        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--color-parchment)" }}>
            Dashboard
          </h1>

          <p className="text-xs" style={{ color: "var(--color-sage)" }}>
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
            style={{ color: "var(--color-accent)" }}
          />

          <Input
            placeholder="Search recipes..."
            className="pl-10"
            style={{
              backgroundColor: "rgba(232, 225, 204, 0.12)",
              color: "var(--color-parchment)",
              borderColor: "var(--color-accent-soft)",
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
          className="rounded-lg p-2 transition hover:bg-(--color-accent-soft)"
          style={{ color: "var(--color-parchment)" }}
        >
          <Bell size={20} />
        </button>

        <Avatar className="cursor-pointer">
          <AvatarFallback
            className="font-semibold"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-parchment)",
            }}
          >
            SD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}