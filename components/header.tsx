import Link from 'next/link'

export default function Header() {
  return (
    <header className="h-14 flex-shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-indigo-600">한입 링크</h1>
      <Link
        href="/new"
        className="flex items-center gap-1 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        + 새 링크
      </Link>
    </header>
  );
}
