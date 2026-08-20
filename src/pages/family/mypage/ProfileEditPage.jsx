import { useRef, useState } from 'react';

import backButton from '../../../assets/back_button.svg';
import profileIcon from '../../../assets/Mypage_profile.svg';
import profileEditIcon from '../../../assets/Family_mypage_profileedit.svg';

const ProfileEditPage = ({
  initialProfile,
  onBack,
  onSave,
}) => {
  const [profile, setProfile] = useState(initialProfile);
  const inputRef = useRef(null);

  const updateField = (key, value) => {
    setProfile((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handlePhotoChange = (event) => {
    const [file] = event.target.files;

    if (file) {
      setProfile((current) => ({
        ...current,
        photo: URL.createObjectURL(file),
        photoFile: file,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(profile);
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[402px] flex-col bg-[#EDEAF5] pb-[67px]">

      {/* Header */}
      <header className="relative flex h-[112px] shrink-0 items-end justify-center border-b border-[#F4F4F4] bg-[#FCFCFC] pb-[15px]">

        <button
          type="button"
          onClick={onBack}
          aria-label="프로필로 돌아가기"
          className="absolute bottom-[15px] left-[28px] flex size-[24px] items-center justify-center"
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


      {/* Profile Image */}
      <div className="relative mx-auto mt-[39px] size-[96px]">

        {profile?.photo ? (
          <img
            src={profile.photo}
            alt="선택한 프로필"
            className="size-full rounded-full object-cover"
          />
        ) : (
          <img
            src={profileIcon}
            alt="프로필"
            className="size-full"
          />
        )}

        {/* 프로필 수정 버튼 */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="프로필 사진 선택"
          className="absolute bottom-[-1px] right-[-1px] flex size-[31px] items-center justify-center rounded-full bg-[#809CFF]"
        >
          <img
            src={profileEditIcon}
            alt=""
            className="size-[23px]"
          />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />

      </div>


      {/* Profile Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-[26px] w-[362px]"
      >

        {/* 이름 */}
        <label className="block">

          <span className="text-[16px] font-semibold text-[#1C1B1F]">
            이름
          </span>

          <input
            type="text"
            value={profile?.name ?? ''}
            onChange={(event) =>
              updateField('name', event.target.value)
            }
            className="
              mt-[12px]
              h-[51px]
              w-full
              rounded-[10px]
              border
              border-[#CBCBCB]
              bg-[#F6F6F6]
              px-[14px]
              text-[14px]
              text-[#1C1B1F]
              outline-none
              focus:border-[#809CFF]
            "
          />

        </label>


        {/* ID */}
        <label className="mt-[20px] block">

          <span className="text-[16px] font-semibold text-[#1C1B1F]">
            ID
          </span>

          <input
            type="text"
            value={profile?.id ?? ''}
            readOnly
            className="
              mt-[12px]
              h-[51px]
              w-full
              rounded-[10px]
              border
              border-[#CBCBCB]
              bg-[#F6F6F6]
              px-[14px]
              text-[14px]
              text-[#1C1B1F]
              text-[#6E6E6E]
              outline-none
              focus:border-[#809CFF]
            "
          />

        </label>


        {/* 비밀번호 */}
        <label className="mt-[20px] block">

          <span className="text-[16px] font-semibold text-[#1C1B1F]">
            비밀번호
          </span>

          <input
            type="password"
            value="••••••••"
            readOnly
            className="
              mt-[12px]
              h-[51px]
              w-full
              rounded-[10px]
              border
              border-[#CBCBCB]
              bg-[#F6F6F6]
              px-[14px]
              text-[14px]
              text-[#1C1B1F]
              text-[#6E6E6E]
              outline-none
              focus:border-[#809CFF]
            "
          />

        </label>


        {/* 담당 산모 ID */}
        <label className="mt-[20px] block">

          <span className="text-[16px] font-semibold text-[#1C1B1F]">
            담당 산모 ID
          </span>

          <input
            type="text"
            value={profile?.motherId ?? ''}
            readOnly
            className="
              mt-[12px]
              h-[51px]
              w-full
              rounded-[10px]
              border
              border-[#CBCBCB]
              bg-[#F6F6F6]
              px-[14px]
              text-[14px]
              text-[#1C1B1F]
              text-[#6E6E6E]
              outline-none
              focus:border-[#809CFF]
            "
          />

        </label>


        {/* Save Button */}
        <button
          type="submit"
          className="
            mt-[28px]
            h-[50px]
            w-full
            rounded-[10px]
            bg-[#31302E]
            text-[16px]
            font-semibold
            text-white
          "
        >
          저장
        </button>

      </form>

    </main>
  );
};

export default ProfileEditPage;
