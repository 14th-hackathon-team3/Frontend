import SelectButton from '../../../components/SelectButton';
import Button from '../../../components/Button';

const careTimeOptions = [
  {
    id: 'morning',
    label: '아침 (06:00-12:00)',
  },
  {
    id: 'afternoon',
    label: '오후 (12:00-18:00)',
  },
  {
    id: 'evening',
    label: '저녁 (18:00-22:00)',
  },
  {
    id: 'night',
    label: '밤 (22:00-06:00)',
  },
];

function CareTimeStep({
  value = [],
  onChange,
  onNext,
}) {
  const handleToggle = (time) => {
    if (value.includes(time)) {
      onChange(
        value.filter((item) => item !== time)
      );

      return;
    }

    onChange([...value, time]);
  };

  return (
    <>
      <section className="mt-[10px]">
        <h1 className="font-sans text-[20px] font-medium leading-[1.4] text-text-black">
          산모를 도와줄 수 있는 시간대를 선택해주세요.
        </h1>

        <p className="mt-[2px] font-sans text-[16px] font-normal text-gray-700/60">
          여러 개를 선택할 수 있어요.
        </p>
      </section>

      <div className="mt-[50px] flex flex-col gap-[25px]">
        {careTimeOptions.map((option) => (
          <SelectButton
            key={option.id}
            selected={value.includes(option.id)}
            onClick={() =>
              handleToggle(option.id)
            }
            selectedClassName="bg-[#809CFF] text-white"
            className="!h-[86px] !text-[16px]"
          >
            {option.label}
          </SelectButton>
        ))}
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

export default CareTimeStep;
