import inviteLogo from '../../../assets/logo1.svg';

const FamilyInviteExpiredPage = () => {
  return (
    <main
      className="
        relative
        mx-auto
        h-screen
        min-h-[874px]
        w-full
        max-w-[402px]
        overflow-hidden
        bg-[#F6F8FF]
      "
    >
      <section
        className="
          absolute
          left-1/2
          top-[218px]
          flex
          w-[341px]
          -translate-x-1/2
          flex-col
          items-center
        "
      >
        {/* 중앙 로고 */}
        <img
          src={inviteLogo}
          alt=""
          className="
            h-[80px]
            w-[78px]
            object-contain
          "
        />

        {/* 안내 문구 */}
        <div
          className="
            mt-[80px]
            flex
            w-[332px]
            flex-col
            items-center
            text-center
          "
        >
          <h1
            className="
              text-[20px]
              font-medium
              text-[#121212]
            "
          >
            초대 링크를 확인해주세요
          </h1>

          <p
            className="
              mt-[21px]
              text-[12px]
              font-normal
              leading-[24px]
              text-[#666666]
            "
          >
            초대 링크가 만료되었거나
            <br />
            더 이상 사용할 수 없는 링크예요.
            <br />
            <br />
            산모님에게 새로운 초대 링크를 요청해주세요.
          </p>
        </div>
      </section>
    </main>
  );
};

export default FamilyInviteExpiredPage;
