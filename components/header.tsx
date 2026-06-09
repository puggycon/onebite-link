import Link from 'next/link'

export default function Header() {
  return (
    <header className="h-12 flex-shrink-0 sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-[var(--border)] flex items-center justify-between px-6">
      <h1 className="text-base font-semibold text-[var(--text)]">한입 링크</h1>
      <Link
        href="/new"
        className="bg-[var(--accent)] text-white px-4 py-1.5 rounded-[6px] text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
      >
        + 새 링크
      </Link>
    </header>
  );
}
