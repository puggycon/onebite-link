'use client'

import { useState, useEffect } from 'react'
import { useFolders } from '@/contexts/folder-context'

export default function EditFolderModal() {
  const { folderToEdit, closeEditModal, renameFolder } = useFolders()
  const [name, setName] = useState('')

  useEffect(() => {
    if (folderToEdit) setName(folderToEdit.name)
  }, [folderToEdit])

  if (!folderToEdit) return null

  function handleSave() {
    if (!folderToEdit) return
    const trimmed = name.trim()
    if (!trimmed || trimmed === folderToEdit.name) {
      closeEditModal()
      return
    }
    renameFolder(trimmed)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={closeEditModal}
    >
      <div
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[12px] p-6 w-80 flex flex-col gap-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">폴더 수정</h2>
        <input
          autoFocus
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] placeholder:text-[var(--placeholder)] transition-colors"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={closeEditModal}
            className="px-4 py-1.5 rounded-[6px] text-sm text-[var(--text-sub)] hover:bg-[var(--hover-bg)] transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-[6px] text-sm font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
