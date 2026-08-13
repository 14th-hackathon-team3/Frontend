import SelectButton from '../../../components/SelectButton';
import Button from '../../../components/Button';

function LivingTogetherStep({
  value,
  onChange,
  onNext,
}) {
  return (
    <>
      <section className="mt-[10px]">
        <h1 className="font-sans text-[20px] font-medium text-text-black">
          산모와 함께 살고 있나요?
        </h1>
      </section>

      <div className="mt-[100px] flex flex-col gap-[40px]">
        <SelectButton
          selected={value === 'together'}
          onClick={() => onChange('together')}
        >
          네, 함께 살고 있어요.
        </SelectButton>

        <SelectButton
          selected={value === 'separate'}
          onClick={() => onChange('separate')}
        >
          아니요, 따로 살고 있어요.
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

export default LivingTogetherStep;