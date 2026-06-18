'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const ERROR_MESSAGES: Record<string, string> = {
  'Password should be at least 6 characters': '비밀번호는 최소 6자 이상이어야 합니다.',
}

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const allFilled = password !== '' && confirmPassword !== ''

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      showToast('비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      showToast(ERROR_MESSAGES[error.message] ?? '비밀번호 재설정에 실패했습니다. 다시 시도해주세요.')
      return
    }

    router.push('/login')
  }

  return (
    <>
      {toast && <div className="toast-error">{toast}</div>}
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-[var(--text)] text-center mb-8">한입 링크</h1>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-sub)]">새 비밀번호</label>
              <input
                type="password"
                placeholder="새 비밀번호를 입력하세요"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-sub)]">새 비밀번호 확인</label>
              <input
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="btn-primary mt-2"
              onClick={handleUpdate}
              disabled={!allFilled || loading}
            >
              {loading ? '처리 중...' : '비밀번호 재설정'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
