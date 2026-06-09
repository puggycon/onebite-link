'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { FOLDERS } from '@/lib/data'

interface FolderContextType {
  folders: string[]
  addFolder: (name: string) => void
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const FolderContext = createContext<FolderContextType | null>(null)

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<string[]>(FOLDERS)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('folders')
    if (saved) setFolders(JSON.parse(saved))
  }, [])

  function addFolder(name: string) {
    const updated = [...folders, name]
    setFolders(updated)
    localStorage.setItem('folders', JSON.stringify(updated))
  }

  return (
    <FolderContext.Provider
      value={{
        folders,
        addFolder,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
      }}
    >
      {children}
    </FolderContext.Provider>
  )
}

export function useFolders() {
  const ctx = useContext(FolderContext)
  if (!ctx) throw new Error('useFolders must be used within FolderProvider')
  return ctx
}
