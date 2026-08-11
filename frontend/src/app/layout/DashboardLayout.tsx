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

      <SidebarInset className="bg-[#102016] text-(--text)">
        <AppNavbar />

        <main className="flex-1 min-h-screen bg-[#102016] p-6 text-(--text)">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}