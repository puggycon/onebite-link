import { LinkData } from '@/contexts/link-context'

export default function LinkCard({ link }: { link: LinkData }) {
  const hostname = new URL(link.url).hostname

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[var(--card-bg)] border border-[var(--border)] rounded-[8px] overflow-hidden flex flex-col hover:bg-[var(--hover-bg)] transition-colors"
    >
      {link.thumbnail && (
        <img
          src={link.thumbnail}
          alt=""
          className="w-full h-36 object-cover flex-shrink-0"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <img
            src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
            alt=""
            width={16}
            height={16}
            className="rounded flex-shrink-0"
          />
          <span className="text-xs text-[var(--text-sub)] truncate">{hostname}</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-2 leading-snug">
            {link.title}
          </h3>
          {link.description && (
            <p className="mt-1 text-xs text-[var(--text-sub)] line-clamp-2 leading-relaxed">
              {link.description}
            </p>
          )}
        </div>
        <span className="mt-auto self-start text-xs bg-[var(--hover-bg)] text-[var(--text-sub)] px-2 py-0.5 rounded-[4px]">
          {link.folder}
        </span>
      </div>
    </a>
  )
}
