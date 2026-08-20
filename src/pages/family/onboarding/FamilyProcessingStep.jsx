import backButton from '../../../assets/back_button.svg';

function FamilyProcessingStep({ onBack }) {
  return (
    <div className="relative min-h-screen w-full bg-primary-light">
      {/* Header */}
      <header
        className="
          flex h-[112px] w-full
          items-end
          border-b border-[#DCDCDC]
          bg-gray-50
          px-[20px] pb-[12px]
        "
      >
        <div className="flex h-[32px] w-[64px] items-center">
          <button
            type="button"
            onClick={onBack}
            aria-label="뒤로 가기"
            className="
              flex h-[31px] w-[31px]
              items-center justify-center
            "
          >
            <img
              src={backButton}
              alt=""
              className="h-[21px] w-[13px]"
            />
          </button>
        </div>

        <div className="flex h-[32px] flex-1 items-center justify-center">
          <h1 className="font-sans text-[20px] font-medium text-text-black">
            프로필 생성 중
          </h1>
        </div>

        <div className="h-[32px] w-[64px]" />
      </header>

      {/* Processing */}
      <div
        className="
          absolute left-1/2 top-[357px]
          flex w-[327px]
          -translate-x-1/2
          flex-col items-center
        "
      >
        <div className="flex flex-col items-center gap-[30px]">
          {/* Spinner */}
          <div className="relative h-[55px] w-[55px] animate-spin">
            <span className="absolute left-[23px] top-0 h-[9px] w-[9px] rounded-full bg-gray-300" />

            <span className="absolute right-[5px] top-[7px] h-[9px] w-[9px] rounded-full bg-gray-300" />

            <span className="absolute right-0 top-[23px] h-[9px] w-[9px] rounded-full bg-[#809CFF]" />

            <span className="absolute bottom-[7px] right-[5px] h-[9px] w-[9px] rounded-full bg-gray-300" />

            <span className="absolute bottom-0 left-[23px] h-[9px] w-[9px] rounded-full bg-gray-300" />

            <span className="absolute bottom-[7px] left-[5px] h-[9px] w-[9px] rounded-full bg-gray-300" />

            <span className="absolute left-0 top-[23px] h-[9px] w-[9px] rounded-full bg-gray-300" />

            <span className="absolute left-[5px] top-[7px] h-[9px] w-[9px] rounded-full bg-gray-300" />
          </div>

          <div className="text-center">
            <p className="font-sans text-[20px] font-medium text-gray-900">
              Processing Data...
            </p>

            <p className="mt-[10px] font-sans text-[16px] font-normal leading-[24px] text-gray-700">
              소중한 데이터를 분석 중이에요
              <br />
              곧 나만의 프로필이 완성돼요!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FamilyProcessingStep;
