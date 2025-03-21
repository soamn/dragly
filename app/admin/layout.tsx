import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import Head from "next/head";
import { Toaster } from "@/components/ui/sonner"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <SidebarProvider className="dark">
        <AppSidebar />
        <main className="w-full bg-[#171717] p-1">
          <SidebarTrigger className="text-white" />
          {children}
        </main>
        <Toaster />
      </SidebarProvider>
    </>
  );
}
