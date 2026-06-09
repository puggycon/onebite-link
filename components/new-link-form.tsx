'use client'

import { useState } from 'react'
import { FOLDERS } from '@/lib/data'

export default function NewLinkForm() {
  const [url, setUrl] = useState('')
  const [folder, setFolder] = useState(FOLDERS[0])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: 저장 로직
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[8px] p-6 flex flex-col gap-5 max-w-lg w-full"
    >
      <h2 className="text-xl font-semibold text-[var(--text)]">새 링크 추가</h2>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
          링크 URL
        </label>
        <input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-base text-[var(--text)] outline-none focus:border-[var(--accent)] placeholder:text-[var(--placeholder)] transition-colors"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
          폴더
        </label>
        <select
          id="folder"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] bg-[var(--card-bg)] transition-colors"
        >
          {FOLDERS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-[var(--accent)] text-white px-4 py-2 rounded-[6px] text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors self-start"
      >
        저장
      </button>
    </form>
  )
}
