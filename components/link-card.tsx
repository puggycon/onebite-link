'use client'

import { LinkData, useLinks } from '@/contexts/link-context'

export default function LinkCard({ link }: { link: LinkData }) {
  const { openDeleteModal, openEditModal } = useLinks()
  const hostname = new URL(link.url).hostname

  function handleDelete(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    openDeleteModal(link)
  }

  function handleEdit(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    openEditModal(link)
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-[var(--card-bg)] border border-[var(--border)] rounded-[8px] overflow-hidden flex flex-col hover:bg-[var(--hover-bg)] transition-colors"
    >
      <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={handleEdit}
          aria-label="링크 수정"
          className="p-1.5 rounded-[6px] bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors"
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
          onClick={handleDelete}
          aria-label="링크 삭제"
          className="p-1.5 rounded-[6px] bg-[var(--card-bg)] border border-[var(--border)] text-[var(--text-sub)] hover:text-[var(--error)] hover:border-[var(--error)] transition-colors"
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
      </div>

      {link.thumbnail && (
        <img
          src={link.thumbnail}
          alt=""
          className="w-full h-36 object-cover flex-shrink-0"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <img
            src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
            alt=""
            width={16}
            height={16}
            className="rounded flex-shrink-0"
          />
          <span className="text-xs text-[var(--text-sub)] truncate">{hostname}</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-2 leading-snug">
            {link.title}
          </h3>
          {link.description && (
            <p className="mt-1 text-xs text-[var(--text-sub)] line-clamp-2 leading-relaxed">
              {link.description}
            </p>
          )}
        </div>
        <span className="mt-auto self-start text-xs bg-[var(--hover-bg)] text-[var(--text-sub)] px-2 py-0.5 rounded-[4px]">
          {link.folder}
        </span>
      </div>
    </a>
  )
}
