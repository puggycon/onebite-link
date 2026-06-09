'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { FOLDERS } from '@/lib/data'

interface FolderContextType {
  folders: string[]
  addFolder: (name: string) => void
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  folderToDelete: string | null
  openDeleteModal: (folder: string) => void
  closeDeleteModal: () => void
  deleteFolder: () => void
}

const FolderContext = createContext<FolderContextType | null>(null)

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<string[]>(FOLDERS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('folders')
    if (saved) setFolders(JSON.parse(saved))
  }, [])

  function addFolder(name: string) {
    const updated = [...folders, name]
    setFolders(updated)
    localStorage.setItem('folders', JSON.stringify(updated))
  }

  function deleteFolder() {
    if (!folderToDelete) return
    const updated = folders.filter((f) => f !== folderToDelete)
    setFolders(updated)
    localStorage.setItem('folders', JSON.stringify(updated))
    setFolderToDelete(null)
  }

  return (
    <FolderContext.Provider
      value={{
        folders,
        addFolder,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        folderToDelete,
        openDeleteModal: (folder) => setFolderToDelete(folder),
        closeDeleteModal: () => setFolderToDelete(null),
        deleteFolder,
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
