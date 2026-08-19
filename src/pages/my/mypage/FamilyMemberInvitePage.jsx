import { useEffect, useState } from 'react';
import { groupsApi } from '../../../api/groups';
import backButton from '../../../assets/back_button.svg';
import infoIcon from '../../../assets/Mypage_invite_info.svg';

const FamilyMemberInvitePage = ({ onBack }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const inviteLink = typeof window === 'undefined' || !inviteCode ? '' : `${window.location.origin}/invite/${inviteCode}`;

  useEffect(() => {
    let isActive = true;
    groupsApi.getMyGroup()
      .then((group) => {
        if (!isActive) return;
        setInviteCode(group.invite_code);
        if (!group.invite_code) setError('초대 코드를 확인하지 못했습니다.');
      })
      .catch((requestError) => {
        if (isActive) setError(requestError.message || '초대 링크를 불러오지 못했습니다.');
      });
    return () => { isActive = false; };
  }, []);

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1500);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-[402px] bg-[#edeaf5]">
      <header className="relative flex h-[112px] items-end justify-center border-b border-[#dcdcdc] bg-gray-50 pb-[15px]">
        <button type="button" onClick={onBack} aria-label="마이페이지로 돌아가기" className="absolute bottom-[15px] left-[21px] flex size-[31px] items-center justify-center">
          <img src={backButton} alt="" className="size-[31px]" />
        </button>
        <h1 className="text-[20px] font-medium text-text-black">MyPage</h1>
      </header>

      <section className="mx-auto mt-[18px] flex h-20 w-[360px] items-center rounded-[20px] bg-primary-background px-[20px]">
        <img src={infoIcon} alt="" className="size-8 shrink-0" />
        <p className="ml-[15px] text-[12px] font-medium tracking-[-0.6px] text-primary">
          아래 링크를 복사하여 초대하고 싶은 가족에게 전송해보세요.
        </p>
      </section>

      <section className="mx-auto mt-[18px] flex h-[198px] w-[352px] flex-col items-center rounded-[16px] bg-[#31302e] px-6 pt-[28px] text-center">
        <h2 className="text-[16px] font-bold tracking-[-0.4px] text-white">초대 링크</h2>
        <p className={`mt-[14px] max-w-[300px] break-all text-[15px] leading-5 tracking-[-0.4px] ${error ? 'text-[#ff9999]' : 'text-white/80'}`}>{error || inviteLink || '초대 링크를 불러오는 중...'}</p>
        <button type="button" onClick={copyInviteLink} disabled={!inviteLink} className="mt-[18px] h-7 rounded-[4px] bg-white px-3 text-[12px] font-medium text-black disabled:opacity-50">
          {isCopied ? '복사 완료' : '링크 복사하기'}
        </button>
        <span aria-live="polite" className="sr-only">{isCopied ? '초대 링크가 복사되었습니다.' : ''}</span>
      </section>
    </main>
  );
};

export default FamilyMemberInvitePage;
