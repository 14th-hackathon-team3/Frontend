import Button from '../Button';

function BirthDateStep({
  value,
  onChange,
  onNext,
}) {
  return (
    <>
      <section className="mt-[10px]">
        <h1 className="font-sans text-[20px] font-medium leading-[1.4] text-text-black">
          아기가 태어난 날짜를 선택해주세요.
        </h1>

        <p className="mt-[2px] font-sans text-[16px] font-medium leading-[1.5] text-gray-700/60">
          출산 후 경과 일수에 맞춰 회복 계획을 제공해드릴게요.
        </p>
      </section>

      <div className="mt-[58px]">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-[51px] w-full
            rounded-[10px]
            border border-gray-300
            bg-[#F6F6F6]
            px-[16px]
            font-sans text-[16px]
            font-normal text-gray-700
            outline-none
          "
        />
      </div>

      <div className="fixed bottom-[68px] left-1/2 w-full max-w-[402px] -translate-x-1/2 px-[30px]">
        <Button
          onClick={onNext}
          className="
            !h-[50px]
            !w-full
            !rounded-[10px]
            !bg-dark-gray
            !p-0
            !font-sans
            !text-[16px]
            !font-semibold
            !text-white
          "
        >
          다음
        </Button>
      </div>
    </>
  );
}

export default BirthDateStep;