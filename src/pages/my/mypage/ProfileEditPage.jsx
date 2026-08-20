import { useRef, useState } from 'react';
import backButton from '../../../assets/back_button.svg';
import profileIcon from '../../../assets/Mypage_profile.svg';
import profileEditIcon from '../../../assets/Mypage_profileedit.svg';

const ProfileEditPage = ({ initialProfile, onBack, onSave }) => {
  const [profile, setProfile] = useState(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const updateField = (key, value) => setProfile((current) => ({ ...current, [key]: value }));
  const handlePhotoChange = (event) => {
    const [file] = event.target.files;
    if (file) setProfile((current) => ({ ...current, photo: URL.createObjectURL(file), photoFile: file }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSaving(true);
    try {
      await onSave(profile);
    } catch (requestError) {
      setError(requestError.message || '프로필을 저장하지 못했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[402px] flex-col bg-[#edebf5] pb-[67px]">
      <header className="relative flex h-[112px] items-end justify-center border-b border-gray-300 bg-gray-50 pb-[15px]"><button type="button" onClick={onBack} aria-label="프로필로 돌아가기" className="absolute bottom-[15px] left-[28px] flex size-[24px] items-center justify-center"><img src={backButton} alt="" className="h-[21px] w-[13px]" /></button><h1 className="text-[20px] font-medium text-text-black">MyPage</h1></header>
      <div className="relative mx-auto mt-[37px] size-[112px]">{profile.photo ? <img src={profile.photo} alt="선택한 프로필" className="size-full rounded-full object-cover" /> : <img src={profileIcon} alt="프로필" className="size-full" />}<button type="button" onClick={() => inputRef.current?.click()} aria-label="프로필 사진 선택" className="absolute bottom-0 right-0 flex size-[31px] items-center justify-center rounded-full"><img src={profileEditIcon} alt="" className="size-full" /></button><input ref={inputRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" /></div>
      <form onSubmit={handleSubmit} className="mx-auto mt-[51px] w-[341px] space-y-[29px]">
        <label className="block"><span className="text-[20px] font-semibold text-text-black">이름</span><input value={profile.name} onChange={(event) => updateField('name', event.target.value)} className="mt-[14px] h-[51px] w-full rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] outline-none focus:border-primary" /></label>
        <label className="block"><span className="text-[20px] font-semibold text-text-black">ID</span><input value={profile.id} onChange={(event) => updateField('id', event.target.value)} className="mt-[14px] h-[51px] w-full rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] outline-none focus:border-primary" /></label>
        <label className="block"><span className="text-[20px] font-semibold text-text-black">비밀번호</span><input type="password" value={profile.password ?? ''} onChange={(event) => updateField('password', event.target.value)} placeholder="변경할 비밀번호를 입력하세요" className="mt-[14px] h-[51px] w-full rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] outline-none placeholder:text-[13px] placeholder:text-[#999] focus:border-primary" /></label>
        <label className="block"><span className="text-[20px] font-semibold text-text-black">출산일</span><input type="date" value={profile.birthDate} onChange={(event) => updateField('birthDate', event.target.value)} className="mt-[14px] h-[51px] w-full rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] outline-none focus:border-primary" /></label>
        {error && <p className="text-center text-[12px] text-error">{error}</p>}
        <button type="submit" disabled={isSaving} className="mt-[11px] h-[50px] w-full rounded-[10px] bg-[#31302e] text-[16px] font-semibold text-white disabled:opacity-50">{isSaving ? '저장 중...' : '저장'}</button>
      </form>
    </main>
  );
};

export default ProfileEditPage;
