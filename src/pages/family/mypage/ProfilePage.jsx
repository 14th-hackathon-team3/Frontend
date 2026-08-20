import { useState } from 'react';

import backButton from '../../../assets/back_button.svg';
import profileIcon from '../../../assets/Mypage_profile.svg';

import nameIcon from '../../../assets/Family_mypage_profile.svg';
import idIcon from '../../../assets/Family_mypage_Id.svg';
import passwordIcon from '../../../assets/Family_mypage_password.svg';
import profileEditIcon from '../../../assets/Family_mypage_mother.svg';

import logoutIcon from '../../../assets/Family_mypage_logout.svg';
import logoutModalIcon from '../../../assets/Mypage_logout_modal.svg';


/* =========================
   로그아웃 모달
========================= */
const LogoutModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-30 mx-auto flex w-full max-w-[402px] items-center justify-center bg-[#3b3b3b]/20 px-[37px]">

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        className="w-full overflow-hidden rounded-lg bg-[#262626] pt-3 text-center shadow-xl"
      >
        <div className="px-4 pb-4">

          <img
            src={logoutModalIcon}
            alt=""
            className="mx-auto size-12"
          />

          <h2
            id="logout-title"
            className="mt-3 text-[17px] font-medium text-white"
          >
            로그아웃 하시겠습니까?
          </h2>

          <p className="mt-1 text-[13px] leading-[18px] text-[#b0b0b0]">
            로그아웃하실 경우 기존의 아이디와 비밀번호로
            <br />
            재로그인하셔야 합니다.
          </p>

        </div>

        <div className="flex h-11 border-t border-[#4f4f4f]">

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 text-[17px] text-white"
          >
            취소
          </button>

          <span className="w-px bg-[#4f4f4f]" />

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 text-[17px] font-semibold text-[#ff9999]"
          >
            로그아웃
          </button>

        </div>
      </section>
    </div>
  );
};


/* =========================
   프로필 페이지
========================= */
const ProfilePage = ({
  profile,
  onBack,
  onEdit,
  onLogout,
}) => {

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);


  /* =========================
     프로필 정보
  ========================= */
  const profileRows = [
    {
      icon: nameIcon,
      label: '이름',
      value: profile?.name ?? 'family',

      // 이름 아이콘은 SVG 자체에 이미 파란 원이 있음
      hasCircle: true,
    },

    {
      icon: idIcon,
      label: 'ID',
      value: profile?.id ?? 'family@family.com',

      // 파란 원 추가
      hasCircle: false,
    },

    {
      icon: passwordIcon,
      label: '비밀번호',
      value: profile?.password || '••••••••',

      // 파란 원 추가
      hasCircle: false,
    },

    {
      icon: profileEditIcon,
      label: '담당 산모 ID',
      value: profile?.motherId || '연결된 산모 없음',

      // 파란 원 추가
      hasCircle: false,
    },
  ];


  return (
    <main
      className="
        relative
        mx-auto
        flex
        min-h-screen
        w-full
        max-w-[402px]
        flex-col
        bg-[#EDEAF5]
        pb-[67px]
      "
    >

      {/* =========================
          Header
      ========================= */}
      <header
        className="
          relative
          flex
          h-[112px]
          shrink-0
          items-end
          justify-center
          border-b
          border-[#F4F4F4]
          bg-[#FCFCFC]
          pb-[15px]
        "
      >

        <button
          type="button"
          onClick={onBack}
          aria-label="마이페이지로 돌아가기"
          className="
            absolute
            bottom-[15px]
            left-[28px]
            flex
            size-[24px]
            items-center
            justify-center
          "
        >
          <img
            src={backButton}
            alt=""
            className="h-[17px] w-[10px]"
          />
        </button>


        <h1 className="text-[20px] font-medium text-[#1C1B1F]">
          MyPage
        </h1>

      </header>


      {/* =========================
          Profile Image
      ========================= */}
      {profile?.photo ? (

        <img
          src={profile.photo}
          alt="선택한 프로필"
          className="
            mx-auto
            mt-[39px]
            size-[96px]
            rounded-full
            object-cover
          "
        />

      ) : (

        <img
          src={profileIcon}
          alt="프로필"
          className="
            mx-auto
            mt-[39px]
            size-[96px]
          "
        />

      )}


      {/* =========================
          Profile Information
      ========================= */}
      <section
        className="
          mx-auto
          mt-[62px]
          w-[362px]
        "
        aria-label="프로필 정보"
      >

        <div
          className="
            mx-auto
            w-[282px]
            space-y-[15px]
          "
        >

          {profileRows.map((row) => (

            <div
              key={row.label}
              className="
                flex
                h-[39px]
                items-center
                gap-5
              "
            >

              {/* =========================
                  아이콘
              ========================= */}

              {row.hasCircle ? (

                /*
                  이름 아이콘
                  → SVG 자체에 이미 파란 원이 있기 때문에 그대로 사용
                */
                <img
                  src={row.icon}
                  alt=""
                  className="size-[39px] shrink-0"
                />

              ) : (

                /*
                  ID / 비밀번호 / 담당 산모 ID

                  파란 원을 만든 후
                  그 위에 흰색 SVG 아이콘 배치
                */
                <div
                  className="
                    flex
                    size-[39px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#809CFF]
                  "
                >

                  <img
                    src={row.icon}
                    alt=""
                    className="
                      h-[27px]
                      w-[27px]
                      object-contain
                    "
                  />

                </div>

              )}


              {/* =========================
                  텍스트
              ========================= */}
              <span
                className="
                  whitespace-nowrap
                  text-[16px]
                  font-normal
                  text-[#1C1B1F]
                "
              >
                {row.label} | {row.value}
              </span>

            </div>

          ))}

        </div>


        {/* =========================
            Logout
        ========================= */}
        <button
          type="button"
          onClick={() => setIsLogoutOpen(true)}
          className="
            mt-[53px]
            flex
            h-[80px]
            w-full
            items-center
            gap-2
            rounded-[20px]
            bg-[#FBF5FF]
            px-[15px]
            text-[16px]
            font-medium
            tracking-[-0.8px]
            text-[#1C1B1F]
          "
        >

          <img
            src={logoutIcon}
            alt=""
            className="size-[39px] shrink-0"
          />

          <span className="px-[15px]">
            로그아웃하기
          </span>

        </button>

      </section>


      {/* =========================
          수정 버튼
      ========================= */}
      <button
        type="button"
        onClick={onEdit}
        className="
          mx-auto
          mt-auto
          h-[50px]
          w-[341px]
          rounded-[10px]
          bg-[#31302E]
          text-[16px]
          font-semibold
          text-white
        "
      >
        수정
      </button>


      {/* =========================
          Logout Modal
      ========================= */}
      {isLogoutOpen && (

        <LogoutModal
          onCancel={() => setIsLogoutOpen(false)}
          onConfirm={onLogout}
        />

      )}

    </main>
  );
};

export default ProfilePage;
