import Link from 'next/link'
import NewFolderButton from '@/components/new-folder-button'

export default function Header() {
  return (
    <header className="h-12 flex-shrink-0 sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-[var(--border)] flex items-center justify-between px-6">
      <h1 className="text-base font-semibold text-[var(--text)]">한입 링크</h1>
      <div className="flex items-center gap-2">
        <NewFolderButton />
        <Link
          href="/new"
          className="bg-[var(--accent)] text-white px-4 py-1.5 rounded-[6px] text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
        >
          + 새 링크
        </Link>
      </div>
    </header>
  );
}
