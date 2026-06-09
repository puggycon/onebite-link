'use client'

import { useState } from 'react'

const FOLDERS = ['개발', '디자인', '마케팅', '영상']

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
      className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4 max-w-lg w-full"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="url" className="text-sm font-medium text-gray-700">
          링크 URL
        </label>
        <input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-500"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="folder" className="text-sm font-medium text-gray-700">
          폴더
        </label>
        <select
          id="folder"
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
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
        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        저장
      </button>
    </form>
  )
}
