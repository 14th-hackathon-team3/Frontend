import { useState } from 'react';

import Chip from '../../../components/Chip';
import Button from '../../../components/Button';

const defaultRelationships = [
  '배우자',
  '부모님',
  '친척',
  '형제자매',
  '산후 도우미',
];

function RelationshipStep({
  value,
  onChange,
  onNext,
}) {
  const [customOptions, setCustomOptions] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const allOptions = [
    ...defaultRelationships,
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
        <h1 className="font-sans text-[20px] font-medium text-text-black">
          산모와 어떤 관계인가요?
        </h1>
      </section>

      {/* 관계 선택 */}
      <div className="mt-[38px] flex flex-wrap gap-[10px]">
        {allOptions.map((option) => (
          <Chip
            key={option}
            selected={value === option}
            onClick={() => onChange(option)}
          >
            {option}
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
            text-text-black underline
          "
        >
          직접 입력
        </button>
      </div>

      {/* 직접 입력 */}
      {showInput && (
        <div className="mt-[20px] flex gap-[10px]">
          <input
            type="text"
            value={customInput}
            onChange={(e) =>
              setCustomInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="관계를 입력해주세요"
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
              h-[45px] shrink-0
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

      {/* 다음 */}
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

export default RelationshipStep;