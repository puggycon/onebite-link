'use client'

import { use } from 'react'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import LinkCard from '@/components/link-card'
import { useLinks } from '@/contexts/link-context'

export default function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>
}) {
  const { folderId } = use(params)
  const folder = decodeURIComponent(folderId)
  const { links } = useLinks()
  const folderLinks = links.filter((link) => link.folder === folder)

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[var(--bg)] p-6">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-5">{folder}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folderLinks.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
