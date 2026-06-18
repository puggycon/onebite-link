'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'Email not confirmed': '이메일 인증이 완료되지 않았습니다.',
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const allFilled = email.trim() !== '' && password !== ''

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const handleLogin = async () => {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) {
      showToast(ERROR_MESSAGES[error.message] ?? '로그인에 실패했습니다. 다시 시도해주세요.')
      return
    }

    router.push('/')
  }

  return (
    <>
      {toast && <div className="toast-error">{toast}</div>}
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-6">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-[var(--text)] text-center mb-8">한입 링크</h1>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 flex flex-col gap-4">
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
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-sub)]">비밀번호</label>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="btn-primary mt-2"
              onClick={handleLogin}
              disabled={!allFilled || loading}
            >
              {loading ? '처리 중...' : '로그인'}
            </button>
            <p className="text-center text-sm text-[var(--text-sub)]">
              계정이 없으신가요?{' '}
              <Link href="/signup" className="text-[var(--accent)] hover:underline">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
