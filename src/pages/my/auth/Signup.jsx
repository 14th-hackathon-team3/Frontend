import { useState } from 'react';

const Signup = ({ onBack = () => {}, onComplete = () => {} }) => {
  const [form, setForm] = useState({ id: '', password: '', passwordConfirm: '', name: '' });
  const [error, setError] = useState('');
  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = (event) => {
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
    onComplete(form);
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
        {fields.map((field) => <label key={field.key} className="flex h-[39px] items-end gap-[50px]"><span className="flex h-[39px] w-[62px] items-center py-[10px] text-[16px] text-[#020913]">{field.label}</span><input value={form[field.key]} onChange={updateField(field.key)} type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} className="h-[39px] w-[250px] rounded-[10px] border border-[#848991] bg-white px-3 text-[12px] text-text-black outline-none placeholder:text-[#848991] focus:border-primary" /></label>)}
        {error && <p className="pt-1 text-center text-[12px] text-[#eb2b2b]">{error}</p>}
        <button type="submit" className="absolute left-[42px] top-[734px] h-[50px] w-[320px] rounded-[30px] bg-primary text-[16px] font-bold text-white">가입완료 →</button>
      </form>
      <div className="absolute bottom-0 left-1/2 h-[31px] w-full max-w-[402px] -translate-x-1/2"><span className="absolute bottom-[9px] left-1/2 h-1 w-[120px] -translate-x-1/2 rounded-full bg-black" /></div>
    </main>
  );
};

export default Signup;
