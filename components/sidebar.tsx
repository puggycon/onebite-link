'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useFolders } from '@/contexts/folder-context'

export default function Sidebar() {
  const pathname = usePathname()
  const { folders, openDeleteModal } = useFolders()

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
          <li key={folder} className="group relative">
            <Link
              href={`/folder/${folder}`}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-[6px] text-sm transition-colors hover:bg-[var(--hover-bg)] ${
                pathname === `/folder/${folder}`
                  ? 'bg-[var(--hover-bg)] text-[var(--text)] font-medium'
                  : 'text-[var(--text-sub)]'
              }`}
            >
              <span>{folder}</span>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  openDeleteModal(folder)
                }}
                className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--text-sub)] hover:text-[var(--error)] transition-all"
                aria-label={`${folder} 폴더 삭제`}
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
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
