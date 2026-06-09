'use client'

import { useLinks } from '@/contexts/link-context'

export default function DeleteLinkModal() {
  const { linkToDelete, closeDeleteModal, deleteLink } = useLinks()

  if (!linkToDelete) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={closeDeleteModal}
    >
      <div
        className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[12px] p-6 w-80 flex flex-col gap-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">링크 삭제</h2>
        <p className="text-sm text-[var(--text-sub)]">
          <span className="font-medium text-[var(--text)]">{linkToDelete.title}</span> 링크를 삭제할까요?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={closeDeleteModal}
            className="px-4 py-1.5 rounded-[6px] text-sm text-[var(--text-sub)] hover:bg-[var(--hover-bg)] transition-colors"
          >
            취소
          </button>
          <button
            onClick={deleteLink}
            className="px-4 py-1.5 rounded-[6px] text-sm font-medium bg-[var(--error)] text-white hover:opacity-90 transition-opacity"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
