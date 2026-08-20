import { useState } from 'react';
import { authApi } from '../../../api/auth';
import { groupsApi } from '../../../api/groups';

const Signup = ({ inviteCode = '', onBack = () => {}, onComplete = () => {}, accentColor = '#c485f8' }) => {
  const [form, setForm] = useState({ id: '', password: '', passwordConfirm: '', name: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.id || !form.password || !form.passwordConfirm || !form.name) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      if (inviteCode) {
        const invitation = await groupsApi.verifyInvite(inviteCode);
        if (invitation?.is_valid === false) throw new Error('유효하지 않거나 만료된 초대 링크입니다.');
      }
      const data = await authApi.signup({
        email: form.id,
        password: form.password,
        name: form.name,
        user_type: inviteCode ? 'guardian' : 'mother',
        ...(inviteCode ? { invite_code: inviteCode } : {}),
      });
      await authApi.login({ email: form.id, password: form.password });
      onComplete(data);
    } catch (requestError) {
      setError(requestError.message || '회원가입에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields = [
    { key: 'id', label: '아이디', placeholder: '아이디를 입력하세요', type: 'text', autoComplete: 'username' },
    { key: 'password', label: '비밀번호', placeholder: '비밀번호를 입력하세요', type: 'password', autoComplete: 'new-password' },
    { key: 'passwordConfirm', label: '비밀번호 확인', placeholder: '비밀번호를 한번 더 입력하세요', type: 'password', autoComplete: 'new-password' },
    { key: 'name', label: '이름', placeholder: '이름을 입력하세요', type: 'text', autoComplete: 'name' },
  ];

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-primary-light px-[19px] pt-[93px]">
      <button type="button" onClick={onBack} className="text-[24px] font-medium text-black">회원가입</button>
      <form onSubmit={handleSubmit} className="mt-[55px] space-y-10">
        {fields.map((field) => <label key={field.key} className="flex h-[39px] items-end gap-[50px]"><span className="flex h-[39px] w-[62px] items-center py-[10px] text-[16px] text-[#020913]">{field.label}</span><input value={form[field.key]} onChange={updateField(field.key)} type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} style={{ '--signup-accent': accentColor }} className="h-[39px] w-[250px] rounded-[10px] border border-[#848991] bg-white px-3 text-[12px] text-text-black outline-none placeholder:text-[#848991] focus:border-(--signup-accent)" /></label>)}
        {error && <p className="pt-1 text-center text-[12px] text-[#eb2b2b]">{error}</p>}
        <button type="submit" disabled={isSubmitting} style={{ backgroundColor: accentColor }} className="absolute left-[42px] top-[734px] h-[50px] w-[320px] rounded-[30px] text-[16px] font-bold text-white disabled:opacity-60">{isSubmitting ? '가입 중...' : '가입완료 →'}</button>
      </form>
      <div className="absolute bottom-0 left-1/2 h-[31px] w-full max-w-[402px] -translate-x-1/2"><span className="absolute bottom-[9px] left-1/2 h-1 w-[120px] -translate-x-1/2 rounded-full bg-black" /></div>
    </main>
  );
};

export default Signup;
