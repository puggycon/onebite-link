'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFolders } from '@/contexts/folder-context'

export default function Sidebar() {
  const pathname = usePathname()
  const { folders, openDeleteModal, openEditModal } = useFolders()

  return (
    <aside className="w-52 flex-shrink-0 border-r border-[var(--border)] bg-[var(--bg)] overflow-y-auto p-3">
      <Link
        href="/"
        className={`block w-full text-left px-3 py-2 rounded-[6px] text-sm font-semibold mb-2 transition-colors hover:bg-[var(--hover-bg)] ${
          pathname === '/'
            ? 'bg-[var(--hover-bg)] text-[var(--text)]'
            : 'text-[var(--text-sub)]'
        }`}
      >
        전체
      </Link>
      <p className="px-3 mb-1 text-xs font-medium text-[var(--text-sub)] uppercase tracking-wider">
        폴더
      </p>
      <ul className="space-y-0.5">
        {folders.map((folder) => (
          <li key={folder.id} className="group relative">
            <Link
              href={`/folder/${folder.id}`}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-[6px] text-sm transition-colors hover:bg-[var(--hover-bg)] ${
                pathname === `/folder/${folder.id}`
                  ? 'bg-[var(--hover-bg)] text-[var(--text)] font-medium'
                  : 'text-[var(--text-sub)]'
              }`}
            >
              <span>{folder.name}</span>
              <span className="flex items-center gap-0.5">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    openEditModal(folder)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--text-sub)] hover:text-[var(--accent)] transition-all"
                  aria-label={`${folder.name} 폴더 수정`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    openDeleteModal(folder)
                  }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--text-sub)] hover:text-[var(--error)] transition-all"
                  aria-label={`${folder.name} 폴더 삭제`}
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                </svg>
                </button>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
