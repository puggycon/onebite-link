'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FOLDERS } from '@/lib/data'

export default function Sidebar() {
  const pathname = usePathname()

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
        {FOLDERS.map((folder) => (
          <li key={folder}>
            <Link
              href={`/folder/${folder}`}
              className={`block w-full text-left px-3 py-2 rounded-[6px] text-sm transition-colors hover:bg-[var(--hover-bg)] ${
                pathname === `/folder/${folder}`
                  ? 'bg-[var(--hover-bg)] text-[var(--text)] font-medium'
                  : 'text-[var(--text-sub)]'
              }`}
            >
              {folder}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
