import { useState } from 'react';
import backButton from '../../../assets/back_button.svg';
import deleteIcon from '../../../assets/delete.svg';
import tickIcon from '../../../assets/tick-circle.svg';

const initialMembers = ['남편', '엄마', '아빠'];

const DeleteConfirmationModal = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 z-30 mx-auto flex w-full max-w-[402px] items-center justify-center bg-[#3b3b3b]/20 px-[37px]">
    <section role="dialog" aria-modal="true" aria-labelledby="delete-title" className="w-full overflow-hidden rounded-lg bg-[#262626] pt-3 text-center shadow-xl">
      <div className="px-4 pb-4">
        <img src={deleteIcon} alt="" className="mx-auto size-12" />
        <h2 id="delete-title" className="mt-3 text-[17px] font-medium text-white">삭제하시겠습니까?</h2>
        <p className="mt-1 text-[13px] leading-[18px] text-[#b0b0b0]">선택하신 가족을 삭제하실 경우 해당 구성원은<br />데이터를 열람할 수 없고, 다시 초대 링크를 받아야<br />가족에 재가입할 수 있습니다.</p>
      </div>
      <div className="flex h-11 border-t border-[#4f4f4f]">
        <button type="button" onClick={onCancel} className="flex-1 text-[17px] text-white">취소</button>
        <span className="w-px bg-[#4f4f4f]" />
        <button type="button" onClick={onConfirm} className="flex-1 text-[17px] font-semibold text-[#ff9999]">삭제</button>
      </div>
    </section>
  </div>
);

const FamilyMemberDeletePage = ({ onBack }) => {
  const [members, setMembers] = useState(initialMembers);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  const toggleMember = (member) => setSelectedMembers((current) => {
    const next = new Set(current);
    next.has(member) ? next.delete(member) : next.add(member);
    return next;
  });
  const toggleAll = () => setSelectedMembers(selectedMembers.size === members.length ? new Set() : new Set(members));
  const removeSelected = () => {
    setMembers((current) => current.filter((member) => !selectedMembers.has(member)));
    setSelectedMembers(new Set());
    setIsEditing(false);
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[402px] flex-col bg-[#edeaf5] pb-[67px]">
      <header className="relative flex h-[112px] items-end justify-center border-b border-gray-300 bg-gray-50 pb-[15px]">
        <button type="button" onClick={onBack} aria-label="마이페이지로 돌아가기" className="absolute bottom-[15px] left-[28px] flex size-[24px] items-center justify-center"><img src={backButton} alt="" className="h-[21px] w-[13px]" /></button>
        <h1 className="text-[20px] font-medium text-text-black">MyPage</h1>
      </header>
      <h2 className="mt-[27px] text-center text-[26px] font-semibold text-primary">my Profile</h2>
      <section className="mx-auto mt-[43px] w-[352px]">
        <div className="flex items-end justify-between"><h3 className="text-[20px] font-medium text-text-black">가족 목록</h3><button type="button" onClick={() => isEditing ? toggleAll() : setIsEditing(true)} className="text-[12px] text-[#848991] underline underline-offset-[3px]">{isEditing ? '전체 선택' : '수정하기'}</button></div>
        <div className="mt-[22px] space-y-[13px]">
          {members.map((member) => <button key={member} type="button" disabled={!isEditing} onClick={() => toggleMember(member)} className="flex h-[49px] w-full items-center justify-between rounded-lg bg-[#31302e] px-[13px] text-left text-[17px] text-white disabled:cursor-default"><span>{member}</span>{isEditing && <span className={`flex size-[24px] items-center justify-center rounded-full border-2 ${selectedMembers.has(member) ? 'border-primary bg-primary' : 'border-[#c485f8]'}`}>{selectedMembers.has(member) && <img src={tickIcon} alt="선택됨" className="size-[20px] brightness-0 invert" />}</span>}</button>)}
          {members.length === 0 && <p className="py-7 text-center text-[14px] text-[#848991]">삭제할 가족 구성원이 없습니다.</p>}
        </div>
        {isEditing && <button type="button" onClick={() => setIsDeleteConfirmationOpen(true)} disabled={selectedMembers.size === 0} className="mt-[48px] flex h-20 w-full items-center gap-2 rounded-[20px] bg-primary-background px-[25px] text-[16px] font-medium tracking-[-0.8px] text-text-black disabled:opacity-50"><img src={deleteIcon} alt="" className="size-[19px]" /><span className="ml-3">삭제하기</span></button>}
      </section>
      <button type="button" onClick={onBack} className="mx-auto mt-auto h-[50px] w-[341px] rounded-[10px] bg-[#31302e] text-[16px] font-semibold text-white">저장</button>
      {isDeleteConfirmationOpen && <DeleteConfirmationModal onCancel={() => setIsDeleteConfirmationOpen(false)} onConfirm={() => { removeSelected(); setIsDeleteConfirmationOpen(false); }} />}
    </main>
  );
};

export default FamilyMemberDeletePage;
