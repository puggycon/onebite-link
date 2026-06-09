'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client'

export interface Folder {
  id: number
  name: string
}

interface FolderContextType {
  folders: Folder[]
  addFolder: (name: string) => Promise<void>
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  folderToDelete: Folder | null
  openDeleteModal: (folder: Folder) => void
  closeDeleteModal: () => void
  deleteFolder: () => void
  folderToEdit: Folder | null
  openEditModal: (folder: Folder) => void
  closeEditModal: () => void
  renameFolder: (newName: string) => void
}

const FolderContext = createContext<FolderContextType | null>(null)

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null)
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('folder')
      .select('id, name')
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setFolders(data)
      })
  }, [])

  async function addFolder(name: string) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('folder')
      .insert({ name })
      .select('id, name')
      .single()
    if (!error && data) {
      setFolders((prev) => [...prev, data])
    }
  }

  async function renameFolder(newName: string) {
    if (!folderToEdit) return
    const supabase = createClient()
    const { error } = await supabase
      .from('folder')
      .update({ name: newName })
      .eq('id', folderToEdit.id)
    if (!error) {
      setFolders((prev) =>
        prev.map((f) => (f.id === folderToEdit.id ? { ...f, name: newName } : f))
      )
      setFolderToEdit(null)
    }
  }

  function deleteFolder() {
    if (!folderToDelete) return
    setFolders((prev) => prev.filter((f) => f.id !== folderToDelete.id))
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
        folderToEdit,
        openEditModal: (folder) => setFolderToEdit(folder),
        closeEditModal: () => setFolderToEdit(null),
        renameFolder,
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
