import inviteLogo from '../../../assets/logo1.svg';

const FamilyInvitePage = ({
  motherName = '산모',
  onAccept,
}) => {
  return (
    <main
      className="
        relative
        mx-auto
        min-h-[874px]
        w-full
        max-w-[402px]
        overflow-hidden
        bg-[#F6F8FF]
      "
    >
      {/* 중앙 로고 + 문구 */}
      <section
        className="
          absolute
          left-1/2
          top-[218px]
          flex
          w-[332px]
          -translate-x-1/2
          flex-col
          items-center
          text-center
        "
      >
        {/* 중앙 로고 */}
        <img
          src={inviteLogo}
          alt="초대"
          className="
            h-[80px]
            w-[78px]
            object-contain
          "
        />

        {/* 제목 */}
        <h1
          className="
            mt-[80px]
            text-[20px]
            font-medium
            leading-[34px]
            text-[#121212]
          "
        >
          {motherName}님의 회복 여정에
          <br />
          함께하시겠습니까?
        </h1>

        {/* 설명 */}
        <p
          className="
            mt-[15px]
            text-[12px]
            font-normal
            leading-[24px]
            text-[#666666]
          "
        >
          초대를 수락할 시, {motherName}님의 회복을 함께 돌보는
          <br />
          보호자로 참여할 수 있어요.
        </p>
      </section>

      {/* 초대 수락 버튼 */}
      <button
        type="button"
        onClick={onAccept}
        className="
          absolute
          left-1/2
          top-[734px]
          flex
          h-[50px]
          w-[341px]
          -translate-x-1/2
          items-center
          justify-center
          rounded-[10px]
          bg-[#809CFF]
          text-[12px]
          font-semibold
          text-white
        "
      >
        초대 수락하기
      </button>
    </main>
  );
};

export default FamilyInvitePage;
