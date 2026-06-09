import type { Metadata } from "next";
import "./globals.css";
import { FolderProvider } from "@/contexts/folder-context";
import { LinkProvider } from "@/contexts/link-context";
import NewFolderModal from "@/components/new-folder-modal";
import DeleteFolderModal from "@/components/delete-folder-modal";
import EditFolderModal from "@/components/edit-folder-modal";
import DeleteLinkModal from "@/components/delete-link-modal";

export const metadata: Metadata = {
  title: "한입 링크",
  description: "나만의 링크 모음",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col">
        <FolderProvider>
          <LinkProvider>
            {children}
            <NewFolderModal />
            <DeleteFolderModal />
            <EditFolderModal />
            <DeleteLinkModal />
          </LinkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
