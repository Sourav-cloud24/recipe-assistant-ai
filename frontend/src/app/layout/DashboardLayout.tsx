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

      <SidebarInset>

        <AppNavbar />

        <main className="flex-1 bg-gray-50 p-6">
          {children}
        </main>

      </SidebarInset>
    </>
  );
}