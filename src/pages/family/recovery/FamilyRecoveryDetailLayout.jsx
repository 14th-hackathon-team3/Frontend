import backButton from '../../../assets/back_button.svg';

const FamilyRecoveryDetailLayout = ({ title, description, items, onBack = () => {} }) => (
  <main className="mx-auto min-h-[874px] w-full max-w-[402px] bg-primary-light text-gray-900">
    <header className="flex h-[112px] items-end border-b border-[#dcdcdc] bg-gray-50 px-5 pb-3 pt-[68px]">
      <div className="flex h-8 w-16 items-center">
        <button
          type="button"
          aria-label="이전 화면으로 돌아가기"
          onClick={onBack}
          className="flex size-8 items-center justify-center"
        >
          <img src={backButton} alt="" className="h-[21px] w-[13px]" />
        </button>
      </div>
      <h1 className="flex-1 self-center whitespace-nowrap text-center text-[20px] font-medium leading-none text-black">
        Recovery Guide
      </h1>
      <div className="h-8 w-16" aria-hidden="true" />
    </header>

    <section className="px-[21px] pt-[46px]">
      <h2 className="text-[20px] font-medium leading-normal text-[#809cff]">{title}</h2>
      <p className="mt-px whitespace-pre-line text-[16px] leading-[1.5] tracking-[-0.48px] text-gray-700">
        {description}
      </p>

      <div className="mt-[64px] flex flex-col gap-5">
        {items.map((item) => (
          <article key={item.title} className="flex h-[100px] gap-2">
            <div className="flex w-[100px] shrink-0 flex-col items-center justify-center gap-[13px] rounded-[10px] bg-gray-50">
              <img src={item.icon} alt="" className="size-[30px]" />
              <h3 className="text-center text-[16px] font-medium leading-[1.5] tracking-[-0.48px] text-[#809cff]">
                {item.title}
              </h3>
            </div>

            <div className="flex min-w-0 flex-1 items-center rounded-[10px] bg-gray-50 px-5">
              <ul className="w-full list-disc pl-[18px] text-[12px] leading-[1.5] tracking-[-0.36px] text-gray-700">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  </main>
);

export default FamilyRecoveryDetailLayout;
