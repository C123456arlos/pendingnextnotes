import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/AppSidebar";
import NoteProvider from "@/providers/NoteProvider";

export const metadata: Metadata = {
  title: "notes next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      >
        <ThemeProvider attribute='class' defaultTheme="system" enableSystem disableTransitionOnChange>
          <NoteProvider>
            <SidebarProvider>
              <AppSidebar></AppSidebar>
              <div className="flex min-h-screen w-full flex-col">
                <Header></Header>
                <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">{children}</main>
              </div>
            </SidebarProvider>
            <Toaster></Toaster>
          </NoteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
