'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const handleSend = async () => {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })
    setLoading(false)

    if (error) {
      showToast('이메일 발송에 실패했습니다. 다시 시도해주세요.')
      return
    }

    setSent(true)
  }

  return (
    <>
      {toast && <div className="toast-error">{toast}</div>}
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-[var(--text)] text-center mb-8">한입 링크</h1>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 flex flex-col gap-4">
            {sent ? (
              <p className="text-center text-sm text-[var(--text-sub)]">
                비밀번호 재설정 링크를 이메일로 보냈습니다.
              </p>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-[var(--text-sub)]">이메일</label>
                  <input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  className="btn-primary mt-2"
                  onClick={handleSend}
                  disabled={email.trim() === '' || loading}
                >
                  {loading ? '처리 중...' : '비밀번호 재설정 링크 발송'}
                </button>
              </>
            )}
            <p className="text-center text-sm text-[var(--text-sub)]">
              <Link href="/login" className="text-[var(--accent)] hover:underline">
                로그인으로 돌아가기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
