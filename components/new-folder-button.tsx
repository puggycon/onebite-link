'use client'

import { useFolders } from '@/contexts/folder-context'

export default function NewFolderButton() {
  const { openModal } = useFolders()
  return (
    <button
      onClick={openModal}
      className="border border-[var(--border)] text-[var(--text)] px-4 py-1.5 rounded-[6px] text-sm font-medium hover:bg-[var(--hover-bg)] transition-colors"
    >
      + 새 폴더
    </button>
  )
}
