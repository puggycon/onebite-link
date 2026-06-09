'use client'

import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import LinkCard from '@/components/link-card'
import { useLinks } from '@/contexts/link-context'

export default function Home() {
  const { links } = useLinks()

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[var(--bg)] p-6">
          <h2 className="text-xl font-semibold text-[var(--text)] mb-5">전체 링크</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {links.map((link) => (
              <LinkCard key={link.id} link={link} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
