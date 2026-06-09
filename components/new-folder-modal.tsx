'use client'

import { useState } from 'react'
import { useFolders } from '@/contexts/folder-context'

export default function NewFolderModal() {
  const { isModalOpen, closeModal, addFolder } = useFolders()
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isModalOpen) return null

  async function handleSave() {
    const trimmed = name.trim()
    if (!trimmed || isSubmitting) return
    setIsSubmitting(true)
    await addFolder(trimmed)
    setName('')
    setIsSubmitting(false)
    closeModal()
  }

  function handleCancel() {
    if (isSubmitting) return
    setName('')
    closeModal()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleCancel}
    >
      <div
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[12px] p-6 w-80 flex flex-col gap-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">새 폴더</h2>
        <input
          autoFocus
          type="text"
          placeholder="폴더 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] placeholder:text-[var(--placeholder)] transition-colors"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-4 py-1.5 rounded-[6px] text-sm text-[var(--text-sub)] hover:bg-[var(--hover-bg)] transition-colors disabled:opacity-50"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-4 py-1.5 rounded-[6px] text-sm font-medium bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  )
}
