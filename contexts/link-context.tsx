'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client'

export type LinkData = {
  id: number
  title: string
  url: string
  description: string
  folder_id: number | null
  thumbnail_url?: string
}

interface LinkContextType {
  links: LinkData[]
  addLink: (link: Omit<LinkData, 'id'>) => Promise<void>
  linkToDelete: LinkData | null
  openDeleteModal: (link: LinkData) => void
  closeDeleteModal: () => void
  deleteLink: () => Promise<void>
  linkToEdit: LinkData | null
  openEditModal: (link: LinkData) => void
  closeEditModal: () => void
  updateLink: (updated: Pick<LinkData, 'id' | 'title' | 'description' | 'folder_id'>) => Promise<void>
}

const LinkContext = createContext<LinkContextType | null>(null)

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<LinkData[]>([])
  const [linkToDelete, setLinkToDelete] = useState<LinkData | null>(null)
  const [linkToEdit, setLinkToEdit] = useState<LinkData | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('link')
      .select('id, url, title, description, thumbnail_url, folder_id')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setLinks(data)
      })
  }, [])

  async function addLink(link: Omit<LinkData, 'id'>) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('link')
      .insert({
        url: link.url,
        title: link.title,
        description: link.description,
        thumbnail_url: link.thumbnail_url,
        folder_id: link.folder_id,
      })
      .select('id, url, title, description, thumbnail_url, folder_id')
      .single()
    if (!error && data) {
      setLinks((prev) => [data, ...prev])
    }
  }

  async function deleteLink() {
    if (!linkToDelete) return
    const supabase = createClient()
    const { error } = await supabase
      .from('link')
      .delete()
      .eq('id', linkToDelete.id)
    if (!error) {
      setLinks((prev) => prev.filter((l) => l.id !== linkToDelete.id))
      setLinkToDelete(null)
    }
  }

  async function updateLink(fields: Pick<LinkData, 'id' | 'title' | 'description' | 'folder_id'>) {
    const supabase = createClient()
    const { error } = await supabase
      .from('link')
      .update({
        title: fields.title,
        description: fields.description,
        folder_id: fields.folder_id,
      })
      .eq('id', fields.id)
    if (!error) {
      setLinks((prev) =>
        prev.map((l) => (l.id === fields.id ? { ...l, ...fields } : l))
      )
      setLinkToEdit(null)
    }
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
