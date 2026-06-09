'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FOLDERS } from '@/lib/data'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 flex-shrink-0 border-r border-gray-200 bg-gray-50 overflow-y-auto p-4">
      <Link
        href="/"
        className={`block w-full text-left px-3 py-2 rounded-md text-sm font-semibold mb-3 transition-colors ${
          pathname === '/'
            ? 'bg-indigo-100 text-indigo-700'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        ALL
      </Link>
      <p className="px-3 mb-1 text-xs font-medium text-gray-400 uppercase tracking-wider">
        폴더
      </p>
      <ul className="space-y-1">
        {FOLDERS.map((folder) => (
          <li key={folder}>
            <Link
              href={`/folder/${folder}`}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                pathname === `/folder/${folder}`
                  ? 'bg-indigo-100 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
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
