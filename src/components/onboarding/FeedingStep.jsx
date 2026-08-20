import SelectButton from '../SelectButton';
import Button from '../Button';

function FeedingStep({ value, onChange, onNext }) {
  return (
    <>
      <section className="mt-[10px]">
        <h1 className="font-sans text-[20px] font-medium leading-[1.4] text-text-black">
          현재 어떤 방식으로 수유 하시나요?
        </h1>

        <p className="mt-[2px] font-sans text-[16px] font-medium leading-[1.5] text-gray-700/60">
          수유 여부에 따라 영양, 수분 섭취, 회복 가이드를
          <br />
          맞춤 제공해드려요.
        </p>
      </section>

      <div className="mt-[64px] flex flex-col gap-[25px]">
        <SelectButton selected={value === 'breast'} onClick={() => onChange('breast')}>
          모유수유
        </SelectButton>

        <SelectButton selected={value === 'formula'} onClick={() => onChange('formula')}>
          분유수유
        </SelectButton>

        <SelectButton selected={value === 'mixed'} onClick={() => onChange('mixed')}>
          혼합수유
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

export default FeedingStep;
