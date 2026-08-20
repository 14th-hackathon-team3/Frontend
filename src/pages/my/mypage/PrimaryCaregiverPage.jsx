import { useEffect, useState } from 'react';
import { careApi } from '../../../api/care';
import { groupsApi } from '../../../api/groups';
import backButton from '../../../assets/back_button.svg';

const getMemberId = (member) =>
  member.membership_id ?? member.id;

const getMemberLabel = (member) =>
  member.name || member.email || '가족 구성원';

const PrimaryCaregiverPage = ({ onBack }) => {
  const [members, setMembers] = useState([]);

  // 선택된 주보호자 membership_id 목록
  const [selectedIds, setSelectedIds] = useState([]);

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    const fetchMembers = async () => {
      setIsLoading(true);
      setError('');

      try {
        // GET /api/groups/members/
        const data = await groupsApi.getMembers();

        if (!isActive) return;

        const nextMembers = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        setMembers(nextMembers);

        // 현재 주보호자로 지정되어 있는 멤버들
        const primaryIds = nextMembers
          .filter((member) => member.is_primary === true)
          .map((member) => getMemberId(member));

        setSelectedIds(primaryIds);
      } catch (requestError) {
        if (!isActive) return;

        console.error(
          '가족 구성원 조회 실패:',
          requestError,
        );

        setMembers([]);
        setSelectedIds([]);

        setError(
          requestError?.response?.data?.detail ||
            requestError?.message ||
            '가족 목록을 불러오지 못했습니다.',
        );
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchMembers();

    return () => {
      isActive = false;
    };
  }, []);

  const togglePrimaryMember = (memberId) => {
    setError('');

    setSelectedIds((prev) => {
      const isSelected = prev.includes(memberId);

      // 이미 선택된 멤버라면 해제
      if (isSelected) {
        return prev.filter(
          (id) => id !== memberId,
        );
      }

      // 최대 3명
      if (prev.length >= 3) {
        setError(
          '주보호자는 최대 3명까지 지정할 수 있습니다.',
        );

        return prev;
      }

      return [...prev, memberId];
    });
  };

  const savePrimaryMembers = async () => {
    if (selectedIds.length === 0) {
      setError(
        '주보호자를 최소 1명 이상 선택해주세요.',
      );
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      /*
       * 현재 서버의 is_primary 상태와
       * 사용자가 화면에서 선택한 상태 비교
       */
      const changedMembers = members.filter(
        (member) => {
          const memberId = getMemberId(member);

          const currentIsPrimary =
            member.is_primary === true;

          const nextIsPrimary =
            selectedIds.includes(memberId);

          return (
            currentIsPrimary !== nextIsPrimary
          );
        },
      );

      /*
       * 변경된 멤버만 PATCH
       *
       * PATCH
       * /api/groups/members/{membership_id}/primary/
       *
       * body:
       * {
       *   is_primary: true
       * }
       *
       * 또는
       *
       * {
       *   is_primary: false
       * }
       */
      await Promise.all(
        changedMembers.map((member) => {
          const memberId =
            getMemberId(member);

          const isPrimary =
            selectedIds.includes(memberId);

          return groupsApi.setPrimaryMember(
            memberId,
            isPrimary,
          );
        }),
      );

      /*
       * 주보호자 지정 완료 후
       * 케어 플랜 다시 생성
       */
      const plan =
        await careApi.generatePlan();

      /*
       * 기존 로직대로 생성된 plan 확인
       */
      if (plan?.plan_id != null) {
        await careApi.confirmPlan(
          plan.plan_id,
        );
      }

      onBack();
    } catch (requestError) {
      console.error(
        '주보호자 지정 실패:',
        requestError,
      );

      setError(
        requestError?.response?.data?.detail ||
          requestError?.message ||
          '주보호자를 지정하지 못했습니다.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[402px] flex-col bg-[#edeaf5] pb-[67px]">
      <header className="relative flex h-[112px] items-end justify-center border-b border-gray-300 bg-gray-50 pb-[15px]">
        <button
          type="button"
          onClick={onBack}
          aria-label="마이페이지로 돌아가기"
          className="absolute bottom-[15px] left-[28px] flex size-[24px] items-center justify-center"
        >
          <img
            src={backButton}
            alt=""
            className="h-[21px] w-[13px]"
          />
        </button>

        <h1 className="text-[20px] font-medium text-text-black">
          MyPage
        </h1>
      </header>

      <section className="mx-auto mt-[27px] w-[352px]">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-medium text-text-black">
            주보호자 지정
          </h2>

          <span className="text-[13px] font-medium text-[#bc75ee]">
            {selectedIds.length}/3
          </span>
        </div>

        <div className="mt-[22px] rounded-[10px] bg-[#31302e] px-[13px] py-1">
          {isLoading ? (
            <p className="py-6 text-center text-[14px] text-[#d3cfd7]">
              가족 목록을 불러오는 중입니다.
            </p>
          ) : (
            <>
              {members.map((member) => {
                const memberId =
                  getMemberId(member);

                const selected =
                  selectedIds.includes(memberId);

                const limitReached =
                  selectedIds.length >= 3 &&
                  !selected;

                return (
                  <button
                    key={memberId}
                    type="button"
                    onClick={() =>
                      togglePrimaryMember(
                        memberId,
                      )
                    }
                    disabled={
                      limitReached ||
                      isSaving
                    }
                    className={`flex h-[40px] w-full items-center justify-between border-b border-white/10 text-left last:border-0 ${
                      limitReached
                        ? 'cursor-not-allowed opacity-50'
                        : ''
                    }`}
                  >
                    <span className="text-[16px] text-white">
                      {getMemberLabel(member)}
                    </span>

                    <span
                      className={`flex h-[20px] w-[35px] items-center rounded-full p-[2px] transition-colors ${
                        selected
                          ? 'justify-end bg-[#bc75ee]'
                          : 'justify-start bg-[#5a5958]'
                      }`}
                    >
                      <span className="size-[16px] rounded-full bg-white" />
                    </span>
                  </button>
                );
              })}

              {members.length === 0 && (
                <p className="py-6 text-center text-[14px] text-[#d3cfd7]">
                  {error ||
                    '지정할 가족 구성원이 없습니다.'}
                </p>
              )}
            </>
          )}
        </div>

        <p className="mt-[170px] rounded-[10px] bg-white px-[14px] py-4 text-center text-[12px] leading-5 text-[#bc75ee]">
          주보호자는 최대 3명까지 지정할 수 있으며,
          <br />
          주보호자로 지정한 보호자에게만 투두를
          배정할 수 있습니다.
        </p>

        {error && members.length > 0 && (
          <p className="mt-3 text-center text-[12px] text-error">
            {error}
          </p>
        )}
      </section>

      <button
        type="button"
        onClick={savePrimaryMembers}
        disabled={
          selectedIds.length === 0 ||
          isSaving ||
          isLoading
        }
        className="mx-auto mt-auto h-[50px] w-[341px] rounded-[10px] bg-[#31302e] text-[16px] font-semibold text-white disabled:opacity-50"
      >
        {isSaving ? '지정 중...' : '지정'}
      </button>
    </main>
  );
};

export default PrimaryCaregiverPage;