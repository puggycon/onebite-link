type Link = {
  id: number
  title: string
  url: string
  description: string
  folder: string
}

export default function LinkCard({ link }: { link: Link }) {
  const hostname = new URL(link.url).hostname

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2">
        <img
          src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
          alt=""
          width={16}
          height={16}
          className="rounded"
        />
        <span className="text-xs text-gray-400 truncate">{hostname}</span>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {link.title}
        </h3>
        {link.description && (
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">{link.description}</p>
        )}
      </div>
      <span className="mt-auto self-start text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">
        {link.folder}
      </span>
    </div>
  )
}
