import { useState } from 'react';
import Signup from './Signup';
import { authApi } from '../../../api/auth';

const Login = ({ onLogin = () => {}, onSignup = () => {} }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupOpen, setIsSignupOpen] = useState(false);
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

  if (isSignupOpen) return <Signup onBack={() => setIsSignupOpen(false)} onComplete={(signupData) => { onSignup(signupData); setIsSignupOpen(false); }} />;

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-primary-light">
      <form onSubmit={handleSubmit} className="px-[31px] pt-[307px]">
        <label className="block text-[16px] text-[#545454]">이메일
          <input value={id} onChange={(event) => setId(event.target.value)} type="email" autoComplete="username" placeholder="이메일을 입력하세요" className="mt-[18px] block h-[51px] w-[341px] rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] text-text-black outline-none placeholder:text-[#999] focus:border-primary" />
        </label>
        <label className="mt-[40px] block text-[16px] text-[#545454]">비밀번호
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" placeholder="비밀번호를 입력하세요" className="mt-[18px] block h-[51px] w-[341px] rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] text-text-black outline-none placeholder:text-[#999] focus:border-primary" />
        </label>
        {error && <p className="mt-3 text-center text-[13px] text-[#dc2626]">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="mt-[42px] h-[50px] w-[335px] rounded-[10px] border border-[#cbcbcb] bg-primary text-[16px] font-semibold text-white disabled:opacity-60">{isSubmitting ? '로그인 중...' : '로그인 →'}</button>
      </form>
      <button type="button" onClick={() => setIsSignupOpen(true)} className="absolute left-1/2 top-[615px] -translate-x-1/2 text-[16px] text-[#545454]">회원가입</button>
      <div className="absolute bottom-0 left-1/2 h-[31px] w-full max-w-[402px] -translate-x-1/2"><span className="absolute bottom-[9px] left-1/2 h-1 w-[120px] -translate-x-1/2 rounded-full bg-black" /></div>
    </main>
  );
};

export default Login;
