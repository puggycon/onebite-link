import type { Metadata } from "next";
import "./globals.css";
import { FolderProvider } from "@/contexts/folder-context";
import { LinkProvider } from "@/contexts/link-context";
import NewFolderModal from "@/components/new-folder-modal";
import DeleteFolderModal from "@/components/delete-folder-modal";
import EditFolderModal from "@/components/edit-folder-modal";
import DeleteLinkModal from "@/components/delete-link-modal";
import EditLinkModal from "@/components/edit-link-modal";

export const metadata: Metadata = {
  metadataBase: new URL("https://onebite.link"),
  title: {
    default: "한입 링크",
    template: "%s | 한입 링크",
  },
  description: "나만의 링크 모음",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "한입 링크",
    description: "나만의 링크 모음",
    siteName: "한입 링크",
    locale: "ko_KR",
    type: "website",
    images: ["/thumbnail.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "한입 링크",
    description: "나만의 링크 모음",
    images: ["/thumbnail.png"],
  },
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
            <EditLinkModal />
          </LinkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
