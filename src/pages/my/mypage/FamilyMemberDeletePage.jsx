import { useEffect, useState } from 'react';
import { groupsApi } from '../../../api/groups';
import backButton from '../../../assets/back_button.svg';
import deleteIcon from '../../../assets/delete.svg';
import deleteModalIcon from '../../../assets/Mypage_delete_modal.svg';
import tickIcon from '../../../assets/tick-circle.svg';

const getMemberId = (member) => member.membership_id ?? member.id;
const getMemberLabel = (member) => member.relationship ?? member.relation ?? member.nickname ?? member.user?.name ?? member.name ?? member.user?.email ?? '가족 구성원';

const DeleteConfirmationModal = ({ onCancel, onConfirm, isDeleting }) => (
  <div className="fixed inset-0 z-30 mx-auto flex w-full max-w-[402px] items-center justify-center bg-[#3b3b3b]/20 px-[37px]">
    <section role="dialog" aria-modal="true" aria-labelledby="delete-title" className="w-full overflow-hidden rounded-lg bg-[#262626] pt-3 text-center shadow-xl">
      <div className="px-4 pb-4">
        <img src={deleteModalIcon} alt="" className="mx-auto size-12" />
        <h2 id="delete-title" className="mt-3 text-[17px] font-medium text-white">삭제하시겠습니까?</h2>
        <p className="mt-1 text-[13px] leading-[18px] text-[#b0b0b0]">선택하신 가족을 삭제하실 경우 해당 구성원은<br />데이터를 열람할 수 없고, 다시 초대 링크를 받아야<br />가족에 재가입할 수 있습니다.</p>
      </div>
      <div className="flex h-11 border-t border-[#4f4f4f]">
        <button type="button" onClick={onCancel} className="flex-1 text-[17px] text-white">취소</button>
        <span className="w-px bg-[#4f4f4f]" />
        <button type="button" onClick={onConfirm} disabled={isDeleting} className="flex-1 text-[17px] font-semibold text-[#ff9999] disabled:opacity-50">{isDeleting ? '삭제 중...' : '삭제'}</button>
      </div>
    </section>
  </div>
);

const FamilyMemberDeletePage = ({ onBack }) => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;
    groupsApi.getMembers()
      .then((data) => {
        if (!isActive) return;
        const nextMembers = Array.isArray(data) ? data : data?.results ?? data?.members ?? [];
        setMembers(nextMembers);
        if (nextMembers.length > 0) setSelectedMembers(new Set([getMemberId(nextMembers[0])]));
      })
      .catch((requestError) => {
        if (isActive) setError(requestError.message || '가족 목록을 불러오지 못했습니다.');
      });
    return () => { isActive = false; };
  }, []);

  const toggleMember = (member) => setSelectedMembers((current) => {
    const next = new Set(current);
    const memberId = getMemberId(member);
    next.has(memberId) ? next.delete(memberId) : next.add(memberId);
    return next;
  });
  const toggleAll = () => setSelectedMembers(selectedMembers.size === members.length ? new Set() : new Set(members.map(getMemberId)));
  const removeSelected = async () => {
    setError('');
    setIsDeleting(true);
    try {
      await Promise.all([...selectedMembers].map((membershipId) => groupsApi.removeMember(membershipId)));
      setMembers((current) => current.filter((member) => !selectedMembers.has(getMemberId(member))));
      setSelectedMembers(new Set());
      setIsDeleteConfirmationOpen(false);
    } catch (requestError) {
      setError(requestError.message || '가족 구성원을 삭제하지 못했습니다.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[402px] flex-col bg-[#edeaf5] pb-[67px]">
      <header className="relative flex h-[112px] items-end justify-center border-b border-gray-300 bg-gray-50 pb-[15px]">
        <button type="button" onClick={onBack} aria-label="마이페이지로 돌아가기" className="absolute bottom-[15px] left-[28px] flex size-[24px] items-center justify-center"><img src={backButton} alt="" className="h-[21px] w-[13px]" /></button>
        <h1 className="text-[20px] font-medium text-text-black">MyPage</h1>
      </header>
      <section className="mx-auto mt-[27px] w-[352px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-medium text-text-black">가족 목록</h2>
          <button type="button" onClick={toggleAll} className="flex items-center gap-1 text-[12px] text-[#848991]">
            <span className={`flex size-[12px] items-center justify-center rounded-full border ${members.length > 0 && selectedMembers.size === members.length ? 'border-primary bg-primary' : 'border-[#a5a5a5]'}`}>
              {members.length > 0 && selectedMembers.size === members.length && <span className="text-[8px] leading-none text-white">✓</span>}
            </span>
            전체 선택
          </button>
        </div>
        <div className="mt-[22px] space-y-[13px]">
          {members.map((member) => { const memberId = getMemberId(member); const selected = selectedMembers.has(memberId); return <button key={memberId} type="button" onClick={() => toggleMember(member)} className="flex h-[49px] w-full items-center justify-between rounded-lg bg-[#31302e] px-[13px] text-left text-[17px] text-white"><span>{getMemberLabel(member)}</span><span className={`flex size-[24px] items-center justify-center rounded-full border-2 ${selected ? 'border-primary bg-primary' : 'border-[#555555]'}`}>{selected && <img src={tickIcon} alt="선택됨" className="size-[20px] brightness-0 invert" />}</span></button>; })}
          {members.length === 0 && <p className="py-7 text-center text-[14px] text-[#848991]">{error || '삭제할 가족 구성원이 없습니다.'}</p>}
        </div>
        <button type="button" onClick={() => setIsDeleteConfirmationOpen(true)} disabled={selectedMembers.size === 0} className="mt-[48px] flex h-20 w-full items-center rounded-[20px] bg-primary-background px-[25px] text-[16px] font-medium tracking-[-0.8px] text-text-black disabled:opacity-50"><span className="flex size-[39px] shrink-0 items-center justify-center rounded-full bg-primary"><img src={deleteIcon} alt="" className="size-[19px] brightness-0 invert" /></span><span className="ml-4">삭제하기</span></button>
      </section>
      <button type="button" onClick={onBack} className="mx-auto mt-auto h-[50px] w-[341px] rounded-[10px] bg-[#31302e] text-[16px] font-semibold text-white">저장</button>
      {error && members.length > 0 && <p className="mx-auto mt-3 text-[12px] text-error">{error}</p>}
      {isDeleteConfirmationOpen && <DeleteConfirmationModal onCancel={() => setIsDeleteConfirmationOpen(false)} onConfirm={removeSelected} isDeleting={isDeleting} />}
    </main>
  );
};

export default FamilyMemberDeletePage;
