'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { LINKS } from '@/lib/data'

export type LinkData = {
  id: number
  title: string
  url: string
  description: string
  folder: string
  thumbnail?: string
}

interface LinkContextType {
  links: LinkData[]
  addLink: (link: Omit<LinkData, 'id'>) => void
  linkToDelete: LinkData | null
  openDeleteModal: (link: LinkData) => void
  closeDeleteModal: () => void
  deleteLink: () => void
  linkToEdit: LinkData | null
  openEditModal: (link: LinkData) => void
  closeEditModal: () => void
  updateLink: (updated: Pick<LinkData, 'id' | 'title' | 'description' | 'folder'>) => void
}

const LinkContext = createContext<LinkContextType | null>(null)

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkData[]>(LINKS)
  const [linkToDelete, setLinkToDelete] = useState<LinkData | null>(null)
  const [linkToEdit, setLinkToEdit] = useState<LinkData | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('links')
    if (saved) setLinks(JSON.parse(saved))
  }, [])

  function addLink(link: Omit<LinkData, 'id'>) {
    setLinks((prev) => {
      const updated = [{ ...link, id: Date.now() }, ...prev]
      localStorage.setItem('links', JSON.stringify(updated))
      return updated
    })
  }

  function deleteLink() {
    if (!linkToDelete) return
    setLinks((prev) => {
      const updated = prev.filter((l) => l.id !== linkToDelete.id)
      localStorage.setItem('links', JSON.stringify(updated))
      return updated
    })
    setLinkToDelete(null)
  }

  function updateLink(fields: Pick<LinkData, 'id' | 'title' | 'description' | 'folder'>) {
    setLinks((prev) => {
      const updated = prev.map((l) =>
        l.id === fields.id ? { ...l, ...fields } : l
      )
      localStorage.setItem('links', JSON.stringify(updated))
      return updated
    })
    setLinkToEdit(null)
  }

  return (
    <LinkContext.Provider
      value={{
        links,
        addLink,
        linkToDelete,
        openDeleteModal: (link) => setLinkToDelete(link),
        closeDeleteModal: () => setLinkToDelete(null),
        deleteLink,
        linkToEdit,
        openEditModal: (link) => setLinkToEdit(link),
        closeEditModal: () => setLinkToEdit(null),
        updateLink,
      }}
    >
      {children}
    </LinkContext.Provider>
  )
}

export function useLinks() {
  const ctx = useContext(LinkContext)
  if (!ctx) throw new Error('useLinks must be used within LinkProvider')
  return ctx
}
