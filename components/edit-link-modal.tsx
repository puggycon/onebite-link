'use client'

import { useState, useEffect } from 'react'
import { useLinks } from '@/contexts/link-context'
import { useFolders } from '@/contexts/folder-context'

export default function EditLinkModal() {
  const { linkToEdit, closeEditModal, updateLink } = useLinks()
  const { folders } = useFolders()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [folder, setFolder] = useState('')

  useEffect(() => {
    if (linkToEdit) {
      setTitle(linkToEdit.title)
      setDescription(linkToEdit.description)
      setFolder(linkToEdit.folder)
    }
  }, [linkToEdit])

  if (!linkToEdit) return null

  function handleSave() {
    if (!linkToEdit) return
    updateLink({
      id: linkToEdit.id,
      title: title.trim() || linkToEdit.title,
      description: description.trim(),
      folder,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={closeEditModal}
    >
      <div
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[12px] p-6 w-96 flex flex-col gap-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">링크 수정</h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--text)]">폴더</label>
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] bg-[var(--card-bg)] transition-colors"
          >
            {folders.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--text)]">제목</label>
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] placeholder:text-[var(--placeholder)] transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[var(--text)]">설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] placeholder:text-[var(--placeholder)] transition-colors resize-none"
          />
        </div>

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
