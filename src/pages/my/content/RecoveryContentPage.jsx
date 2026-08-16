import backButton from '../../../assets/back_button.svg';
import smoothieImage from '../../../assets/smoothie.png';

const RecoveryContentPage = ({ onNavigate = () => {} }) => (
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
        <p>회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.</p>
        <p className="mt-[50px]">회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.회복 콘텐츠 본문 입니다.</p>
      </div>
    </article>
  </main>
);

export default RecoveryContentPage;
