"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChefHat,
  Heart,
  Home,
  LogOut,
  Package,
  ShoppingCart,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Pantry",
    url: "/pantry",
    icon: Package,
  },
  {
    title: "AI Recipes",
    url: "/recipes",
    icon: ChefHat,
  },
  {
    title: "Meal Planner",
    url: "/meal-plan",
    icon: CalendarDays,
  },
  {
    title: "Shopping List",
    url: "/shopping-list",
    icon: ShoppingCart,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: Heart,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      className="border-r"
      style={{
        backgroundColor: "var(--color-parchment)",
        color: "var(--color-ink)",
        borderRightColor: "var(--color-accent-soft)",
      }}
    >
      {/* Logo */}
      <SidebarHeader
        className="border-b px-6 py-5"
        style={{ borderBottomColor: "var(--color-accent-soft)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl text-(--color-parchment) shadow"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            🍽️
          </div>

          <div>
            <h2 className="text-lg font-bold text-(--color-ink)">
              Recipe Assistant
            </h2>

            <p className="text-xs" style={{ color: "var(--color-accent)" }}>
              AI Powered Cooking
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3 py-4">
        <SidebarMenu>
          {menuItems.map((item) => {
            const active = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={active}
                  className={`mb-1 h-11 rounded-xl transition-all ${
                    active
                      ? "bg-(--color-accent) text-(--color-parchment)"
                      : "hover:bg-(--color-accent-soft)] hover:text-(--color-accent)"
                  }`}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter
        className="border-t p-4"
        style={{ borderTopColor: "var(--color-accent-soft)" }}
      >
        <div
          className="rounded-xl border p-3"
          style={{
            backgroundColor: "var(--color-surface-muted)",
            borderColor: "var(--color-accent-soft)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-full text-(--color-parchment)"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              <User size={18} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-(--color-ink)">
                Sourav Dash
              </p>

              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                Software Developer
              </p>
            </div>
          </div>

          <button
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium transition hover:bg-(--color-accent-soft)"
            style={{
              borderColor: "var(--color-accent-soft)",
              color: "var(--color-accent)",
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}