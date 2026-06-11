import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-[var(--text)] text-center mb-8">한입 링크</h1>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[var(--text-sub)]">이메일</label>
            <input type="email" placeholder="이메일을 입력하세요" className="input-field" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-[var(--text-sub)]">비밀번호</label>
            <input type="password" placeholder="비밀번호를 입력하세요" className="input-field" />
          </div>
          <button className="btn-primary mt-2">로그인</button>
          <p className="text-center text-sm text-[var(--text-sub)]">
            계정이 없으신가요?{' '}
            <Link href="/signup" className="text-[var(--accent)] hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
