import { useState } from 'react';
import BottomNavigation from '../../../components/BottomNavigation';
import notificationIcon from '../../../assets/Home_notification.svg';
import waveBackground from '../../../assets/Vector 87.png';
import milkImage from '../../../assets/milk.png';
import medicationImage from '../../../assets/image.png';
import babyImage from '../../../assets/Home_baby.png';

const navigationItems = [
  { key: 'journey', label: '회복 여정' },
  { key: 'record', label: '기록' },
  { key: 'home', label: '홈' },
  { key: 'todo', label: '할 일' },
  { key: 'mypage', label: '마이페이지' },
];

const articles = [
  { category: 'Drug-Edu', title: '모유 수유 중 약을 먹어도 될까요?', image: milkImage },
  { category: 'Medication', title: '나에게 맞는 맞춤 복약 관리', image: medicationImage },
  { category: 'Recovery', title: '산후 회복을 위한 생활 가이드', image: milkImage },
];

const weekSteps = [
  { label: '2주', position: 'left-[9px]', color: 'bg-[#9ba89a]', completed: true },
  { label: '4주', position: 'left-[93px]', color: 'bg-[#9ba89a]', completed: true },
  { label: '5주', position: 'left-[177px]', color: 'bg-primary', current: true },
  { label: '6주', position: 'left-[254px]', color: 'bg-[#cfcfcf]' },
  { label: '8주', position: 'right-[4px]', color: 'bg-[#cfcfcf]' },
];

const dayMarkers = [
  { day: 32, left: 6, top: 97 },
  { day: 33, left: 45, top: 59 },
  { day: 34, left: 89, top: 31 },
  { day: 35, left: 138, top: 12 },
  { day: 36, left: 189, top: 4, current: true },
  { day: 37, left: 240, top: 12 },
  { day: 38, left: 289, top: 31 },
  { day: 39, left: 330, top: 61 },
  { day: 40, left: 365, top: 100 },
];

const RecoveryInfoModal = ({ onClose }) => (
  <div className="fixed inset-0 z-30 mx-auto flex w-full max-w-[402px] items-center justify-center bg-[#3b3b3b]/20 px-[35px]">
    <section role="dialog" aria-modal="true" aria-labelledby="recovery-info-title" className="relative h-[218px] w-[327px] rounded-lg bg-white px-4 pt-[38px] text-center shadow-lg">
      <button type="button" onClick={onClose} aria-label="닫기" className="absolute right-[13px] top-[8px] text-[28px] font-normal leading-[22px] tracking-[-0.43px] text-black">×</button>
      <h2 id="recovery-info-title" className="text-[17px] font-medium leading-[22px] tracking-[-0.4px] text-black">산후 3~6주차</h2>
      <ul className="mt-1 list-disc pl-[30px] text-left text-[13px] leading-[18px] tracking-[-0.4px] text-[#878787]">
        <li>가벼운 집안일, 아기와의 산책</li>
        <li>집에서 정상적인 목욕</li>
        <li>피로하지 않은 범위에서 횟수를 늘려가며 운동<br />(무거운 물건 들기나 힘든 활동은 6주 이후)</li>
        <li>출산 후 6주에 보건의료 전문가와 후속 방문하여<br />자궁 회복, 상처 치유, 우울증·요실금 등을 평가</li>
      </ul>
    </section>
  </div>
);

const Homepage = ({ onNavigate = () => {} }) => {
  const [isRecoveryInfoOpen, setIsRecoveryInfoOpen] = useState(false);

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[118px] pt-[55px]">
      <button type="button" aria-label="알림" className="absolute right-[27px] top-[55px] z-10 flex size-[43px] items-center justify-center rounded-full bg-primary"><img src={notificationIcon} alt="" className="size-[22px] brightness-0 invert" /></button>
      <header className="px-[35px] pt-[43px]"><span className="inline-flex rounded-full bg-primary px-[10px] py-[2px] text-[11px] font-semibold tracking-[0.33px] text-white">산후 5주차</span><h1 className="mt-1 text-[24px] font-medium tracking-[-0.48px] text-[#121212]">오늘의 회복 여정, 함께 살펴볼까요?</h1><p className="mt-[6px] text-[12px] tracking-[-0.36px] text-[#666]">출산 5주차 · 회복 여정 36일째</p></header>

      <section className="relative mt-0 h-[286px] overflow-hidden" aria-label="회복 여정 Day 36">
        <div aria-hidden="true" className="absolute -left-[21px] top-[32px] h-[309px] w-[443px] rounded-[50%] bg-[#dfc5f8]" />
        <img src={waveBackground} alt="" className="absolute -left-[15px] top-[50px] h-[143px] w-[434px] opacity-45" />
        <img src={babyImage} alt="아기" className="absolute left-[96px] top-[85px] h-[146px] w-[219px] object-cover opacity-80" />
        <p className="absolute left-1/2 top-[191px] -translate-x-1/2 text-[52px] font-bold tracking-[-1px] text-white">Day 36</p>
        <div className="absolute inset-0 text-[8px] text-primary">
          {dayMarkers.map(({ day, left, top, current }) => current ? (
            <button key={day} type="button" onClick={() => setIsRecoveryInfoOpen(true)} className="absolute flex size-[31px] items-center justify-center rounded-full bg-[#602dc7] text-[12px] font-semibold text-white" style={{ left, top }}>{day}</button>
          ) : (
            <span key={day} className="absolute flex size-[31px] items-center justify-center rounded-full bg-[#fbf1ff]" style={{ left, top }}>{day}</span>
          ))}
        </div>
      </section>

      <button type="button" onClick={() => setIsRecoveryInfoOpen(true)} className="mx-auto -mt-[22px] block h-[120px] w-[358px] rounded-[24px] bg-gray-50 px-5 text-left shadow-sm" aria-label="산후 회복 진행 정보 보기">
        <div className="relative h-full"><div className="absolute left-[17px] right-[17px] top-[56px] h-[2px] bg-[#e6d6f8]" /><div className="absolute left-[17px] top-[28px] h-[28px] w-[50%] rounded-t-full border-t-2 border-primary" />{weekSteps.map((step) => <span key={step.label} className={`absolute top-[48px] ${step.position} flex flex-col items-center text-[9px] ${step.current ? 'font-bold text-[#7b4f9f]' : 'text-[#9ba89a]'}`}><span className={`mb-1 flex size-[13px] items-center justify-center rounded-full ${step.color} ${step.current ? 'ring-4 ring-[#ead4ff]' : ''}`}>{step.completed && <span className="text-[9px] leading-[13px] text-white">✓</span>}</span>{step.label}</span>)}</div>
      </button>

      <section className="mt-5"><h2 className="ml-[30px] text-[20px] font-medium tracking-[-0.4px] text-primary">AAC가 회복을 책임져드릴게요</h2><div className="mt-4 flex gap-[13px] overflow-x-auto px-[32px] pb-2 [scrollbar-width:none]">{articles.map((article) => <button key={article.title} type="button" className="w-[160px] shrink-0 overflow-hidden rounded-[13px] bg-gray-50 text-left shadow-sm"><img src={article.image} alt="" className="h-[79px] w-full object-cover" /><div className="h-[81px] p-[13px]"><p className="text-[8px] text-[#666]">{article.category}</p><p className="mt-1 text-[11px] font-semibold leading-4 text-[#2b2b2b]">{article.title}</p></div></button>)}</div></section>
      <div className="fixed bottom-[22px] left-1/2 z-20 -translate-x-1/2"><BottomNavigation activeKey="home" items={navigationItems} onChange={onNavigate} /></div>
      {isRecoveryInfoOpen && <RecoveryInfoModal onClose={() => setIsRecoveryInfoOpen(false)} />}
    </main>
  );
};

export default Homepage;
