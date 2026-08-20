import { useState } from 'react';
import Signup from './Signup';
import { authApi } from '../../../api/auth';
import logo from '../../../assets/logo1.svg';
import kakaoIcon from '../../../assets/kakao.svg';

const Login = ({ onLogin = () => {}, onSignup = () => {} }) => {
  const inviteCode = typeof window === 'undefined' ? '' : window.location.pathname.match(/^\/invite\/([^/]+)\/?$/)?.[1] ?? '';
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupOpen, setIsSignupOpen] = useState(Boolean(inviteCode));
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const data = await authApi.login({ email: id, password });
      onLogin(data);
    } catch (requestError) {
      setError(requestError.message || '로그인에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSignupOpen) return <Signup inviteCode={inviteCode} onBack={() => setIsSignupOpen(false)} onComplete={(signupData) => { onSignup(signupData); setIsSignupOpen(false); }} />;

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-primary-light">
      <div className="absolute left-1/2 top-[90px] flex -translate-x-1/2 flex-col items-center">
        <img src={logo} alt="Re:Me" className="h-[86px] w-[79px]" />
        <h1 className="mt-[24px] whitespace-nowrap text-center text-[20px] font-semibold text-gray-900">Welcome Re:Me</h1>
      </div>

      <form onSubmit={handleSubmit} className="absolute left-[31px] right-[30px] top-[307px]">
        <label className="block text-[16px] text-[#545454]">
          아이디
          <input
            value={id}
            onChange={(event) => setId(event.target.value)}
            type="text"
            inputMode="email"
            autoComplete="username"
            placeholder="아이디를 입력하세요"
            className="mt-[15px] block h-[51px] w-full rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] text-text-black outline-none placeholder:text-[#999] focus:border-primary"
          />
        </label>

        <label className="mt-[21px] block text-[16px] text-[#545454]">
          비밀번호
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력하세요"
            className="mt-[10px] block h-[51px] w-full rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] text-text-black outline-none placeholder:text-[#999] focus:border-primary"
          />
        </label>

        {error && <p className="absolute top-[194px] w-full text-center text-[12px] text-error">{error}</p>}

        <button
          type="button"
          aria-label="카카오톡으로 로그인 또는 회원가입"
          className="absolute top-[221px] flex h-[50px] w-full items-center justify-center gap-4 rounded-[10px] bg-[#ffcc00] text-[14px] font-semibold text-black"
        >
          <img src={kakaoIcon} alt="" className="h-[19px] w-[21px]" />
          카카오톡으로 로그인/회원가입 →
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute top-[285px] h-[50px] w-full rounded-[10px] bg-primary text-[16px] font-semibold text-white disabled:opacity-60"
        >
          {isSubmitting ? '로그인 중...' : '로그인 →'}
        </button>
      </form>

      <button type="button" onClick={() => setIsSignupOpen(true)} className="absolute left-1/2 top-[662px] -translate-x-1/2 whitespace-nowrap text-[16px] text-[#545454]">
        회원가입
      </button>
    </main>
  );
};

export default Login;
