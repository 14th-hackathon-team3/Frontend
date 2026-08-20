import { useEffect, useState } from 'react';

import { authApi } from '../../../api/auth';
import { groupsApi } from '../../../api/groups';

import BottomNavigation from '../../../components/BottomNavigation';
import ToggleButton from '../../../components/ToggleButton';

import ProfilePage from './ProfilePage';
import ProfileEditPage from './ProfileEditPage';

import backButton from '../../../assets/back_button.svg';


const navigationItems = [
  { key: 'journey', label: '회복 여정' },
  { key: 'home', label: '홈' },
  { key: 'todo', label: '투두' },
  { key: 'mypage', label: '마이페이지' },
];


const notificationItems = [
  {
    key: 'todoCreated',
    apiKey: 'notify_todo_created',
    label: 'todo 생성 알림',
  },
  {
    key: 'familyTodoCompleted',
    apiKey: 'notify_family_todo_completed',
    label: '가족 todo 완료 알림',
  },
  {
    key: 'familyTodoPending',
    apiKey: 'notify_family_todo_incomplete',
    label: '가족 todo 미실행 알림',
  },
];


/* =========================
   회원 탈퇴 확인 모달
========================= */
const WithdrawModal = ({
  onCancel,
  onConfirm,
  isLoading,
}) => {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        mx-auto
        flex
        w-full
        max-w-[402px]
        items-center
        justify-center
        bg-black/30
        px-[30px]
      "
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="withdraw-title"
        className="
          w-full
          overflow-hidden
          rounded-[8px]
          bg-[#262626]
          text-center
          shadow-xl
        "
      >
        {/* 모달 내용 */}
        <div className="px-[20px] pb-[20px] pt-[17px]">

          {/* 탈퇴 아이콘 */}
          <div className="mx-auto flex h-[38px] items-center justify-center">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 문 */}
              <path
                d="M6.5 7H21V30H6.5V7Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* 화살표 */}
              <path
                d="M15 18.5H32"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M26.5 13L32 18.5L26.5 24"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>


          <h2
            id="withdraw-title"
            className="
              mt-[8px]
              text-[16px]
              font-semibold
              text-white
            "
          >
            탈퇴하시겠습니까?
          </h2>


          <p
            className="
              mt-[6px]
              text-[11px]
              leading-[16px]
              text-[#B8B8B8]
            "
          >
            탈퇴하실 경우 현재까지의 모든 데이터가 삭제되고,
            <br />
            재가입하셔야 합니다.
          </p>

        </div>


        {/* 하단 버튼 */}
        <div
          className="
            flex
            h-[50px]
            border-t
            border-[#4A4A4A]
          "
        >
          {/* 취소 */}
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="
              flex-1
              text-[14px]
              font-medium
              text-white
              disabled:opacity-50
            "
          >
            취소
          </button>


          <span className="w-px bg-[#4A4A4A]" />


          {/* 실제 탈퇴 */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="
              flex-1
              text-[14px]
              font-semibold
              text-[#FF9999]
              disabled:opacity-50
            "
          >
            {isLoading ? '탈퇴 중...' : '탈퇴'}
          </button>
        </div>

      </section>
    </div>
  );
};


/* =========================
   Mypage
========================= */
const Mypage = ({ onNavigate = () => {} }) => {

  /*
    알림 기본값
  */
  const [notifications, setNotifications] = useState({
    todoCreated: true,
    familyTodoCompleted: false,
    familyTodoPending: true,
  });


  /*
    main
    profile
    edit
  */
  const [view, setView] = useState('main');


  /*
    회원 탈퇴 모달
  */
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);


  /*
    탈퇴 API 실행 중 여부
  */
  const [isWithdrawing, setIsWithdrawing] = useState(false);


  /*
    프로필 정보
  */
  const [profile, setProfile] = useState({
    name: '홍길동',
    id: 'Hong_gildong',
    password: 'Becomingmom!123',
    motherId: '',
    birthDate: '2026-07-13',
    photo: null,
  });

  const [assignedMother, setAssignedMother] = useState(null);
  const [isMotherLoading, setIsMotherLoading] = useState(true);


  /* =========================
     사용자 / 알림 정보 조회
  ========================= */
  useEffect(() => {

    let isActive = true;


    Promise.allSettled([
      authApi.me(),
      groupsApi.getNotificationSettings(),
      groupsApi.getMembers(),
    ]).then(([userResult, settingsResult, membersResult]) => {

      if (!isActive) return;


      /* 사용자 정보 */
      if (userResult.status === 'fulfilled') {

        const user = userResult.value;


        setProfile((current) => ({
          ...current,
          name: user.name,
          id: user.email,
          password: '',
          photo: user.profile_image,
        }));
      }


      /* 알림 설정 */
      if (settingsResult.status === 'fulfilled') {

        const settings = settingsResult.value;


        setNotifications((current) =>
          Object.fromEntries(
            notificationItems.map((item) => [
              item.key,
              settings[item.apiKey] ?? current[item.key],
            ])
          )
        );
      }

      if (membersResult.status === 'fulfilled') {
        const members = Array.isArray(membersResult.value)
          ? membersResult.value
          : [];

        const mother = members.find((member) => member.role === 'owner')
          ?? null;

        setAssignedMother(mother);
        setProfile((current) => ({
          ...current,
          motherId: mother?.email ?? '',
        }));
      }

      setIsMotherLoading(false);

    });


    return () => {
      isActive = false;
    };

  }, []);


  /* =========================
     알림 토글
  ========================= */
  const toggleNotification = async (key) => {

    const item = notificationItems.find(
      (notification) => notification.key === key
    );


    const nextValue = !notifications[key];


    /* 화면 먼저 변경 */
    setNotifications((items) => ({
      ...items,
      [key]: nextValue,
    }));


    try {

      await groupsApi.updateNotificationSettings({
        [item.apiKey]: nextValue,
      });

    } catch (requestError) {

      console.error(requestError);


      /* 실패하면 이전 상태로 복구 */
      setNotifications((items) => ({
        ...items,
        [key]: !nextValue,
      }));

    }
  };


  /* =========================
     프로필 저장
  ========================= */
  const saveProfile = async (updatedProfile) => {

    await authApi.updateMe({
      name: updatedProfile.name,
    });


    /* 프로필 사진 변경 */
    if (updatedProfile.photoFile) {

      const photoResult = await authApi.uploadPhoto(
        updatedProfile.photoFile
      );


      updatedProfile.photo = photoResult.profile_image;
    }


    setProfile({
      ...updatedProfile,
      password: '',
      photoFile: undefined,
    });


    setView('profile');
  };


  /* =========================
     실제 회원 탈퇴
  ========================= */
  const handleWithdraw = async () => {

    /*
      중복 클릭 방지
    */
    if (isWithdrawing) return;


    try {

      setIsWithdrawing(true);


      /*
        여기에서 실제 회원 탈퇴 API 실행
      */
      await authApi.withdraw();


      /*
        탈퇴 성공 후 로그인 페이지 이동
      */
      onNavigate('login');

    } catch (error) {

      console.error('회원 탈퇴 실패:', error);

    } finally {

      setIsWithdrawing(false);

    }
  };


  /* =========================
     프로필 상세 페이지
  ========================= */
  if (view === 'profile') {

    return (
      <ProfilePage
        profile={profile}
        onBack={() => setView('main')}
        onEdit={() => setView('edit')}
        onLogout={async () => {

          await authApi.logout();

          onNavigate('login');
        }}
      />
    );
  }


  /* =========================
     프로필 수정 페이지
  ========================= */
  if (view === 'edit') {

    return (
      <ProfileEditPage
        initialProfile={profile}
        onBack={() => setView('profile')}
        onSave={saveProfile}
      />
    );
  }


  return (
    <main
      className="
        relative
        mx-auto
        min-h-screen
        w-full
        max-w-[402px]
        overflow-hidden
        bg-[#EDEAF5]
        pb-[132px]
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
          items-end
          justify-center
          border-b
          border-[#D5D5D5]
          bg-[#FCFCFC]
          pb-[15px]
        "
      >

        {/* 뒤로가기 */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          aria-label="뒤로가기"
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


        <h1
          className="
            text-[20px]
            font-medium
            text-[#1C1B1F]
          "
        >
          MyPage
        </h1>

      </header>


      {/* =========================
          Contents
      ========================= */}
      <section
        className="
          mx-auto
          mt-[23px]
          w-[360px]
          space-y-[15px]
        "
      >

        {/* =========================
            Profile Card
        ========================= */}
        <button
          type="button"
          onClick={() => setView('profile')}
          className="
            flex
            h-[77px]
            w-full
            items-center
            justify-between
            rounded-[13px]
            bg-[#31302E]
            px-[17px]
            text-left
          "
        >

          <span className="flex flex-col gap-[3px]">

            <strong
              className="
                text-[16px]
                font-semibold
                text-white
              "
            >
              {profile.name}
            </strong>


            <span
              className="
                text-[14px]
                font-normal
                text-[#FBFBFF]
              "
            >
              ID: {profile.id}
            </span>

          </span>


          <span
            aria-hidden="true"
            className="
              text-[28px]
              font-light
              leading-none
              text-white
            "
          >
            ›
          </span>

        </button>


        {/* =========================
            담당 산모
        ========================= */}
        <section
          className="
            rounded-[13px]
            bg-[#31302E]
            px-[17px]
            py-[16px]
          "
          aria-labelledby="assigned-mother-heading"
        >

          <h2
            id="assigned-mother-heading"
            className="
              text-[16px]
              font-bold
              text-white
            "
          >
            담당 산모
          </h2>


          {isMotherLoading ? (
            <p className="mt-[10px] text-[14px] text-[#D8D8D8]">
              담당 산모 정보를 불러오는 중이에요.
            </p>
          ) : assignedMother ? (
            <div className="mt-[10px] flex items-center justify-between">
              <span className="flex flex-col gap-[3px]">
                <strong className="text-[15px] font-medium text-white">
                  {assignedMother.name}
                </strong>
                <span className="text-[13px] text-[#D8D8D8]">
                  {assignedMother.email}
                </span>
              </span>

              {assignedMother.relation && (
                <span className="rounded-full bg-[#607BEB] px-[10px] py-[4px] text-[12px] text-white">
                  {assignedMother.relation}
                </span>
              )}
            </div>
          ) : (
            <p className="mt-[10px] text-[14px] text-[#D8D8D8]">
              연결된 산모가 없어요.
            </p>
          )}

        </section>


        {/* =========================
            Notification
        ========================= */}
        <section
          className="
            rounded-[13px]
            bg-[#31302E]
            px-[17px]
            py-[16px]
          "
          aria-labelledby="notification-heading"
        >

          <h2
            id="notification-heading"
            className="
              text-[16px]
              font-bold
              text-white
            "
          >
            알림 설정
          </h2>


          <div className="mt-[17px] space-y-[17px]">

            {notificationItems.map((item) => {

              const selected = notifications[item.key];


              return (
                <div
                  key={item.key}
                  className="
                    flex
                    h-[24px]
                    items-center
                    justify-between
                    gap-4
                  "
                >

                  <span
                    className="
                      text-[14px]
                      font-normal
                      text-white
                    "
                  >
                    {item.label}
                  </span>


                  <ToggleButton
                    selected={selected}
                    onClick={() =>
                      toggleNotification(item.key)
                    }
                    aria-label={`${item.label} ${
                      selected ? '끄기' : '켜기'
                    }`}
                    className={`
                      !flex
                      !h-[24px]
                      !w-[37px]
                      !shrink-0
                      !items-center
                      !rounded-full
                      !p-[2px]

                      ${
                        selected
                          ? '!bg-[#607BEB]'
                          : '!bg-[#1F1F1F]'
                      }
                    `}
                  >

                    <span
                      className={`
                        block
                        !size-[19px]
                        rounded-full
                        bg-white
                        transition-transform
                        duration-200

                        ${
                          selected
                            ? 'translate-x-[12px]'
                            : 'translate-x-0'
                        }
                      `}
                    />

                  </ToggleButton>

                </div>
              );
            })}

          </div>

        </section>


        {/* =========================
            회원 탈퇴
        ========================= */}
        <button
          type="button"

          /*
            여기서는 실제 탈퇴하지 않고
            모달만 열어줌
          */
          onClick={() => setIsWithdrawOpen(true)}

          className="
            flex
            h-[56px]
            w-full
            items-center
            rounded-[13px]
            bg-[#31302E]
            px-[17px]
            text-[14px]
            font-bold
            text-[#FF9999]
          "
        >
          회원 탈퇴
        </button>

      </section>


      {/* =========================
          Bottom Navigation
      ========================= */}
      <div
        className="
          fixed
          bottom-[22px]
          left-1/2
          z-10
          -translate-x-1/2
        "
      >
        <BottomNavigation
          activeKey="mypage"
          items={navigationItems}
          onChange={onNavigate}
          activeBgClass="bg-[#809CFF]"
          activeIconClass="text-[#F6F8FF]"
        />
      </div>


      {/* =========================
          회원 탈퇴 확인 모달
      ========================= */}
      {isWithdrawOpen && (
        <WithdrawModal

          isLoading={isWithdrawing}

          /* 취소 → 그냥 모달만 닫기 */
          onCancel={() => {

            if (!isWithdrawing) {
              setIsWithdrawOpen(false);
            }

          }}

          /* 탈퇴 → 실제 API 실행 */
          onConfirm={handleWithdraw}

        />
      )}

    </main>
  );
};


export default Mypage;
