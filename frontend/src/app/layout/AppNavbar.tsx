"use client";

import { Bell, Moon, Search, SidebarIcon } from "lucide-react";

import {
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";

export default function AppNavbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6">

      {/* Left */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="rounded-md hover:bg-gray-100" />

        <div>
          <h1 className="text-xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-xs text-gray-500">
            Welcome back 👋
          </p>
        </div>
      </div>

      {/* Center */}
      <div className="hidden w-full max-w-md lg:block">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <Input
            placeholder="Search recipes..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <button className="rounded-lg p-2 transition hover:bg-gray-100">
          <Moon size={20} />
        </button>

        <button className="rounded-lg p-2 transition hover:bg-gray-100">
          <Bell size={20} />
        </button>

        <Avatar className="cursor-pointer">
          <AvatarFallback className="bg-green-600 text-white font-semibold">
            SD
          </AvatarFallback>
        </Avatar>

      </div>

    </header>
  );
}