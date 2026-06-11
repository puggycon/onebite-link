'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useFolders } from '@/contexts/folder-context'
import { useLinks } from '@/contexts/link-context'

export default function NewLinkForm() {
  const { folders } = useFolders()
  const { addLink } = useLinks()
  const router = useRouter()

  const [url, setUrl] = useState('')
  const [folderId, setFolderId] = useState<number | null>(folders[0]?.id ?? null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (folderId === null && folders.length > 0) {
      setFolderId(folders[0].id)
    }
  }, [folders])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || '링크 정보를 가져올 수 없습니다.')
      }

      await addLink({
        url,
        folder_id: folderId,
        title: data.title || url,
        description: data.description || '',
        thumbnail_url: data.image || '',
      })

      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
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
          disabled={loading}
          className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-base text-[var(--text)] outline-none focus:border-[var(--accent)] placeholder:text-[var(--placeholder)] transition-colors disabled:opacity-50"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
          폴더
        </label>
        <select
          id="folder"
          value={folderId ?? ''}
          onChange={(e) => setFolderId(e.target.value ? Number(e.target.value) : null)}
          disabled={loading}
          className="border border-[var(--border)] rounded-[6px] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)] bg-[var(--card-bg)] transition-colors disabled:opacity-50"
        >
          <option value="">폴더 없음</option>
          {folders.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="text-sm text-[var(--error)]">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="bg-[var(--accent)] text-white px-4 py-2 rounded-[6px] text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors self-start disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? '저장 중...' : '저장'}
      </button>
    </form>
  )
}
