import { useState } from 'react';

import Chip from '../Chip';
import Button from '../Button';

const defaultPainOptions = [
  '회음부',
  '허리',
  '골반',
  '가슴(유방)',
  '손목',
  '치질',
  '특별한 통증 없음',
];

function PainStep({
  value,
  onChange,
  onNext,
}) {
  const [customOptions, setCustomOptions] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const allOptions = [
    ...defaultPainOptions,
    ...customOptions,
  ];

  const handleAddCustomOption = () => {
    const trimmedValue = customInput.trim();

    if (!trimmedValue) return;

    if (!allOptions.includes(trimmedValue)) {
      setCustomOptions((prev) => [
        ...prev,
        trimmedValue,
      ]);
    }

    onChange(trimmedValue);

    setCustomInput('');
    setShowInput(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddCustomOption();
    }
  };

  return (
    <>
      <section className="mt-[10px]">
        <h1 className="font-sans text-[20px] font-medium leading-[1.4] text-text-black">
          현재 가장 불편한 부위를 선택해주세요.
        </h1>

        <p className="mt-[2px] font-sans text-[16px] font-medium leading-[1.5] text-gray-700/60">
          현재 증상에 맞는 회복 가이드를 제공해드려요
        </p>
      </section>

      <div className="mt-[35px] flex flex-wrap gap-[10px]">
        {allOptions.map((pain) => (
          <Chip
            key={pain}
            selected={value === pain}
            onClick={() => onChange(pain)}
          >
            {pain}
          </Chip>
        ))}

        <button
          type="button"
          onClick={() => setShowInput(true)}
          className="
            inline-flex h-[40px]
            items-center justify-center
            rounded-[10px]
            bg-gray-50
            px-[30px]
            font-sans text-[16px] font-medium
            text-text-black
            underline
          "
        >
          직접 입력
        </button>
      </div>

      {showInput && (
        <div className="mt-[20px] flex gap-[10px]">
          <input
            type="text"
            value={customInput}
            onChange={(e) =>
              setCustomInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="불편한 부위를 입력해주세요"
            autoFocus
            className="
              h-[45px] min-w-0 flex-1
              rounded-[10px]
              border border-gray-300
              bg-gray-50
              px-[15px]
              font-sans text-[16px]
              text-text-black
              outline-none
            "
          />

          <button
            type="button"
            onClick={handleAddCustomOption}
            className="
              h-[45px]
              shrink-0
              rounded-[10px]
              bg-dark-gray
              px-[18px]
              font-sans text-[16px] font-medium
              text-white
            "
          >
            추가
          </button>
        </div>
      )}

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

export default PainStep;