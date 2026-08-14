import { useState } from 'react';
import backButton from '../../../assets/back_button.svg';
import profileIcon from '../../../assets/Mypage_profile.svg';
import nameIcon from '../../../assets/Mypage_name.svg';
import idIcon from '../../../assets/Mypage_ID.svg';
import passwordIcon from '../../../assets/Mypage_password.svg';
import profileEditIcon from '../../../assets/Mypage_profileedit.svg';
import logoutIcon from '../../../assets/Mypage_logout.svg';

const profileRows = [
  { icon: nameIcon, text: '이름 | ***' },
  { icon: idIcon, text: 'ID | parents1' },
  { icon: passwordIcon, text: '비밀번호 | password123!' },
  { icon: profileEditIcon, text: '담당 산모 ID | Hong_gildong' },
];

const LogoutModal = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 z-30 mx-auto flex w-full max-w-[402px] items-center justify-center bg-[#3b3b3b]/20 px-[37px]">
    <section role="dialog" aria-modal="true" aria-labelledby="logout-title" className="w-full overflow-hidden rounded-lg bg-[#262626] pt-3 text-center shadow-xl">
      <div className="px-4 pb-4">
        <img src={logoutIcon} alt="" className="mx-auto size-12" />
        <h2 id="logout-title" className="mt-3 text-[17px] font-medium text-white">로그아웃 하시겠습니까?</h2>
        <p className="mt-1 text-[13px] leading-[18px] text-[#b0b0b0]">로그아웃하실 경우 기존의 아이디와 비밀번호로<br />재로그인하셔야 합니다.</p>
      </div>
      <div className="flex h-11 border-t border-[#4f4f4f]"><button type="button" onClick={onCancel} className="flex-1 text-[17px] text-white">취소</button><span className="w-px bg-[#4f4f4f]" /><button type="button" onClick={onConfirm} className="flex-1 text-[17px] font-semibold text-[#ff9999]">로그아웃</button></div>
    </section>
  </div>
);

const ProfilePage = ({ profile, onBack, onEdit, onLogout }) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
  <main className="relative mx-auto flex min-h-screen w-full max-w-[402px] flex-col bg-[#edeaf5] pb-[67px]">
    <header className="relative flex h-[112px] items-end justify-center border-b border-gray-300 bg-gray-50 pb-[15px]">
      <button type="button" onClick={onBack} aria-label="마이페이지로 돌아가기" className="absolute bottom-[15px] left-[28px] flex size-[24px] items-center justify-center"><img src={backButton} alt="" className="h-[17px] w-[10px]" /></button>
      <h1 className="text-[20px] font-medium text-text-black">MyPage</h1>
    </header>

    <h2 className="mt-[27px] text-center text-[26px] font-semibold text-primary">my Profile</h2>
    {profile.photo ? <img src={profile.photo} alt="선택한 프로필" className="mx-auto mt-[37px] size-[112px] rounded-full object-cover" /> : <img src={profileIcon} alt="프로필" className="mx-auto mt-[37px] size-[112px]" />}

    <section className="mx-auto mt-[54px] w-[341px]" aria-label="프로필 정보">
      <div className="mx-auto w-[266px] space-y-[15px]">
        {profileRows.map((row) => <div key={row.text} className="flex h-[39px] items-center gap-5"><img src={row.icon} alt="" className="size-[39px]" /><span className="text-[16px] text-text-black">{row.text === '이름 | ***' ? `이름 | ${profile.name}` : row.text === 'ID | parents1' ? `ID | ${profile.id}` : row.text === '비밀번호 | password123!' ? `비밀번호 | ${profile.password}` : row.text}</span></div>)}
      </div>

      <button type="button" onClick={() => setIsLogoutOpen(true)} className="mt-[53px] flex h-20 w-full items-center gap-2 rounded-[20px] bg-primary-background px-[15px] text-[16px] font-medium tracking-[-0.8px] text-text-black"><img src={logoutIcon} alt="" className="size-[39px]" /><span className="px-[15px]">로그아웃하기</span></button>
    </section>

    <button type="button" onClick={onEdit} className="mx-auto mt-auto h-[50px] w-[341px] rounded-[10px] bg-[#31302e] text-[16px] font-semibold text-white">수정</button>
    {isLogoutOpen && <LogoutModal onCancel={() => setIsLogoutOpen(false)} onConfirm={onLogout} />}
  </main>
  );
};

export default ProfilePage;
