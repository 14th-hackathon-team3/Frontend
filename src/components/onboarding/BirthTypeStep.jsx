import SelectButton from '../SelectButton';
import Button from '../Button';

function BirthTypeStep({
  value,
  onChange,
  onNext,
}) {
  return (
    <>
      <section className="mt-[10px]">
        <h1 className="font-sans text-[20px] font-medium leading-[1.4] text-text-black">
          산모의 출산 방식을 선택해 주세요.
        </h1>

        <p className="mt-[2px] font-sans text-[16px] font-medium leading-[1.5] text-gray-700/60">
          출산 방식에 따라 회복 과정과 필요한 관리가 달라져요.
        </p>
      </section>

      <div className="mt-[114px] flex flex-col gap-[50px]">
        <SelectButton
          selected={value === 'natural'}
          onClick={() => onChange('natural')}
        >
          자연분만
        </SelectButton>

        <SelectButton
          selected={value === 'cesarean'}
          onClick={() => onChange('cesarean')}
        >
          제왕절개
        </SelectButton>
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

export default BirthTypeStep;