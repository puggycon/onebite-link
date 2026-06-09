import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import LinkCard from '@/components/link-card'
import { LINKS } from '@/lib/data'

export default async function FolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>
}) {
  const { folderId } = await params
  const folder = decodeURIComponent(folderId)
  const links = LINKS.filter((link) => link.folder === folder)

  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
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
