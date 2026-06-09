import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import NewLinkForm from '@/components/new-link-form'

export default function NewPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <NewLinkForm />
        </main>
      </div>
    </div>
  )
}
