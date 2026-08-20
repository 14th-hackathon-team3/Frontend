import backButton from '../../../assets/back_button.svg';
import smoothieImage from '../../../assets/smoothie.png';

const motherParagraphs = [
  '산후 피부 노화 예방이 중요한 이유는 출산 후 급격한 호르몬 변화와 수면 부족, 스트레스로 인해 콜라겐 합성이 줄어들고 피부 탄력이 빠르게 떨어지기 때문입니다. 이 시기에는 피부 장벽이 약해지고 색소침착·건조가 심해져, 평소보다 더 적극적인 케어가 필요합니다.',
  'AAC홀딩스의 SWELLNESSY 리프팅 스트로베리 스무디는 이런 산모의 피부 고민을 일상 속 작은 습관으로 해결할 수 있도록 설계된 기능성 음료입니다. 비타민 C가 풍부한 스트로베리는 멜라닌 생성을 억제하고 콜라겐 합성을 돕는 대표적인 안티에이징 성분입니다. 스무디에 함유된 단백질과 항산화 성분은 수유로 인한 영양 소모를 보충하고, 피부 재생을 지원합니다.',
  '또한, AAC의 AI 피부 진단 데이터와 연계된 맞춤형 영양 설계로, 산모의 피부 상태에 따라 섭취 패턴을 최적화할 수 있습니다. 카페인이 없고 소화가 잘되는 포뮬러라 수유 중에도 부담 없이 즐길 수 있습니다.',
  '“관리해야 하는 건강”이 아니라, 기분 좋게 나를 선택하는 경험을 제공하는 이 음료는 산모가 하루의 리듬 속에서 자연스럽게 피부 노화를 예방할 수 있도록 돕습니다.',
];

const RecoveryContentPage = ({ onNavigate = () => {}, paragraphs = motherParagraphs }) => (
  <main className="mx-auto min-h-screen w-full max-w-[402px] bg-primary-light pb-12 text-[#121212]">
    <header className="flex h-[112px] items-end border-b border-[#dcdcdc] bg-[#fcfcfc] px-5 pb-3 pt-[68px]">
      <button type="button" aria-label="뒤로 가기" onClick={() => onNavigate('home')} className="flex size-8 items-center justify-center">
        <img src={backButton} alt="" className="size-[31px]" />
      </button>
      <h1 className="flex-1 text-center text-[20px] font-medium">회복 콘텐츠</h1>
      <div className="size-8" aria-hidden="true" />
    </header>

    <section className="relative h-[300px] overflow-hidden bg-[#e5e5e5]">
      <img src={smoothieImage} alt="리프팅 스트로베리 스무디" className="absolute left-1/2 top-[43px] h-[232px] w-[154px] -translate-x-1/2 object-cover" />
    </section>

    <article className="px-[21px] pt-5">
      <span className="inline-flex h-[21px] items-center rounded-[20px] bg-primary px-[10px] text-[11px] font-semibold tracking-[0.33px] text-white">Swellnessy Drink</span>
      <h2 className="mt-[10px] text-[20px] font-medium leading-[28px] tracking-[-0.4px]">리프팅 스트로베리 스무디를 통해<br />산후 피부 노화를 예방할 수 있습니다.</h2>
      <div className="mt-5 h-px w-[calc(100%+42px)] -translate-x-[21px] bg-[#dcdcdc]" />
      <div className="mt-[25px] text-[16px] font-light leading-[25px] tracking-[-0.32px]">
        {paragraphs.map((paragraph, index) => <p key={paragraph} className={index === 0 ? undefined : 'mt-[50px]'}>{paragraph}</p>)}
      </div>
    </article>
  </main>
);

export default RecoveryContentPage;
