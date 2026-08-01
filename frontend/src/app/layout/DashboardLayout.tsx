import AppNavbar from "./AppNavbar";
import AppSidebar from "./AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar />

      <SidebarInset className="bg-(--color-ink) text-(--color-parchment)">
        <AppNavbar />

        <main className="flex-1 min-h-screen bg-(--color-ink) p-6 text-(--color-parchment)">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}