'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const ERROR_MESSAGES: Record<string, string> = {
  'User already registered': '이미 사용 중인 이메일입니다.',
  'Password should be at least 6 characters': '비밀번호는 최소 6자 이상이어야 합니다.',
  'Unable to validate email address: invalid format': '올바른 이메일 형식이 아닙니다.',
  'Signup requires a valid password': '올바른 비밀번호를 입력해주세요.',
}

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const allFilled = email.trim() !== '' && password !== '' && confirmPassword !== ''

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      showToast('비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)

    if (error) {
      showToast(ERROR_MESSAGES[error.message] ?? '회원가입에 실패했습니다. 다시 시도해주세요.')
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
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[var(--text-sub)]">비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                className="input-field"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="btn-primary mt-2"
              onClick={handleSignup}
              disabled={!allFilled || loading}
            >
              {loading ? '처리 중...' : '회원가입'}
            </button>
            <p className="text-center text-sm text-[var(--text-sub)]">
              이미 계정이 있으신가요?{' '}
              <Link href="/login" className="text-[var(--accent)] hover:underline">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
