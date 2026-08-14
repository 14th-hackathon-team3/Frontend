import { useState } from 'react';
import BottomNavigation from '../../../components/BottomNavigation';
import menuBookIcon from '../../../assets/recoveryjourney_menu_book.svg';
import analysisIcon from '../../../assets/Todo_star.svg';
import folderFlap from '../../../assets/Record_folder_flap.svg';
import activityFolderFlap from '../../../assets/Record_folder_activity_flap.svg';
import hiddenInfoIcon from '../../../assets/hidden_info.png';

const PRIVATE_CARDS_STORAGE_KEY = 'recoveryJourneyPrivateCards';

const navigationItems = [
  { key: 'journey', label: '회복 여정' },
  { key: 'home', label: '홈' },
  { key: 'todo', label: '투두' },
  { key: 'mypage', label: '마이페이지' },
];

const recordCards = [
  { title: '활동량/메모', top: 'top-0', titleTop: 'top-6', background: 'bg-primary/10', flap: activityFolderFlap, tabOpacity: 'opacity-100' },
  { title: '피부/모발', top: 'top-[50px]', titleTop: 'top-[74px]', background: 'bg-primary/40', tabOpacity: 'opacity-40' },
  { title: '통증/수유', top: 'top-[100px]', titleTop: 'top-[124px]', background: 'bg-primary/60', tabOpacity: 'opacity-60' },
  { title: '감정/수면', top: 'top-[153px]', titleTop: 'top-[177px]', background: 'bg-primary', tabOpacity: 'opacity-100' },
];

const readPrivateCards = () => {
  try {
    const savedCards = window.localStorage.getItem(PRIVATE_CARDS_STORAGE_KEY);
    const parsedCards = savedCards ? JSON.parse(savedCards) : [];

    return Array.isArray(parsedCards) ? parsedCards : [];
  } catch {
    return [];
  }
};

const TrendChart = ({ color, points, area = false }) => (
  <div className="mt-3">
    <div className="relative h-[64px]">
      {points.slice(0, -1).map((point, index) => {
        const nextPoint = points[index + 1];
        const horizontal = 38;
        const vertical = nextPoint - point;
        const length = Math.sqrt((horizontal ** 2) + (vertical ** 2));
        const angle = Math.atan2(vertical, horizontal) * (180 / Math.PI);

        return <span key={`${point}-${index}`} className="absolute h-[2px] origin-left" style={{ left: `${index * 38}px`, top: `${point}px`, width: `${length}px`, backgroundColor: color, transform: `rotate(${angle}deg)` }} />;
      })}
      {area && <span className="absolute inset-x-0 bottom-0 h-[36px] bg-gradient-to-t from-[#e6f7ee] to-transparent" />}
      {points.map((point, index) => <span key={`${point}-point`} className="absolute z-10 size-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-gray-50" style={{ left: `${index * 38}px`, top: `${point}px`, borderColor: color }} />)}
    </div>
    <div className="flex w-[228px] justify-between text-[11px] text-gray-500"><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span><span>일</span></div>
  </div>
);

const PrivacyCard = ({ title }) => (
  <article className="relative flex h-[138px] items-center justify-center overflow-hidden rounded-[16px] bg-gray-50 px-4 shadow-[0_2px_6px_rgba(217,123,106,0.06)]">
    <div className="absolute inset-0 bg-gray-100/70 backdrop-blur-[8px]" />
    <div className="relative flex flex-col items-center gap-2 text-center">
      <img src={hiddenInfoIcon} alt="비공개" className="size-[30px]" />
      <p className="text-[14px] font-medium tracking-[-0.28px] text-text-black">보호자에게 비공개된 {title} 데이터입니다</p>
    </div>
  </article>
);

const TrackingCard = ({ title, badge, value, color, points, area }) => (
  <article className="rounded-[16px] bg-gray-50 px-4 py-4 shadow-[0_2px_6px_rgba(217,123,106,0.06)]">
    <div className="flex items-center justify-between"><h2 className="text-[16px] font-medium text-text-black">{title}</h2><div className="flex items-center gap-2"><span className={`rounded-full px-2 py-[2px] text-[12px] ${title === '수면' ? 'bg-[#fdf0ec] text-[#eb2b2b]' : 'bg-[#edfaf4] text-[#3a9e72]'}`}>{badge}</span><span className="text-[16px] font-medium" style={{ color }}>{value}</span></div></div>
    <TrendChart color={color} points={points} area={area} />
  </article>
);

const FamilyWeeklyJourneyPage = ({ onDay, onNavigate, privateCards }) => (
  <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-primary-light pb-[122px] pt-[37px]">
    <header className="flex items-end justify-between px-[21px]"><h1 className="text-[24px] font-medium tracking-[-0.48px] text-black">Recovery Journey</h1><button type="button" aria-label="회복 여정 안내"><img src={menuBookIcon} alt="" className="size-[30px]" /></button></header>
    <div className="mx-auto mt-[29px] flex h-[30px] w-[360px] rounded-[20px] bg-primary-background"><button type="button" onClick={onDay} className="w-1/2 rounded-[20px] text-[16px] font-medium tracking-[-0.8px] text-primary">Day</button><button type="button" className="w-1/2 rounded-[20px] bg-primary text-[16px] font-medium tracking-[-0.8px] text-white">Week</button></div>
    <section className="mx-auto mt-[27px] flex h-20 w-[360px] items-center gap-2 rounded-[20px] bg-primary-background px-[15px]"><img src={analysisIcon} alt="" className="size-[35px]" /><p className="px-[15px] text-[12px] font-medium tracking-[-0.6px] text-primary">최근 7일 종합 분석</p></section>
    <section className="mx-auto mt-[29px] w-[360px] space-y-[13px]">
      {privateCards.includes('수면') ? <PrivacyCard title="수면" /> : <TrackingCard title="수면" badge="최근 3일 감소" value="5.3h" color="#e66161" points={[28, 13, 36, 28, 46, 61, 52]} />}
      {privateCards.includes('통증') ? <PrivacyCard title="통증" /> : <TrackingCard title="통증" badge="전반적으로 감소" value="4" color="#6bbf99" points={[14, 14, 36, 36, 58, 58, 36]} area />}
      {privateCards.includes('감정') ? <PrivacyCard title="감정" /> : <article className="rounded-[16px] bg-gray-50 px-4 py-4 shadow-[0_2px_6px_rgba(217,123,106,0.06)]"><div className="flex items-center justify-between"><h2 className="text-[16px] font-medium text-text-black">감정</h2><span className="rounded-full bg-[#edfaf4] px-2 py-[2px] text-[12px] text-[#3a9e72]">최근 긍정적인 감정 증가</span></div><div className="mt-4 flex justify-between px-[10px] text-[22px]"><span>😊</span><span>🙂</span><span>🙂</span><span>😌</span><span>🙂</span><span>😊</span><span>😊</span></div><div className="mt-1 flex justify-between px-[9px] text-[11px] text-gray-500"><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span><span>일</span></div></article>}
    </section>
    <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2"><BottomNavigation activeKey="journey" items={navigationItems} onChange={onNavigate} /></div>
  </main>
);

const JourneyPage = ({ onNavigate = () => {} }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayWeekday = (today.getDay() + 6) % 7;
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDayIndex, setSelectedDayIndex] = useState(todayWeekday);
  const [isWeekView, setIsWeekView] = useState(false);
  const [privateCards] = useState(readPrivateCards);
  const weekdays = ['월', '화', '수', '목', '금', '토', '일'];
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - todayWeekday + (weekOffset * 7));
  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return date;
  });
  const selectedDate = weekDates[selectedDayIndex];
  const dateLabel = selectedDate.getTime() === today.getTime() ? '오늘' : `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;

  if (isWeekView) return <FamilyWeeklyJourneyPage onDay={() => setIsWeekView(false)} onNavigate={onNavigate} privateCards={privateCards} />;

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[120px]">
      <header className="flex items-end justify-between px-[21px] pt-[37px]"><h1 className="text-[24px] font-medium tracking-[-0.48px] text-black">Recovery Journey</h1><button type="button" aria-label="회복 여정 안내"><img src={menuBookIcon} alt="" className="size-[30px]" /></button></header>
      <div className="mx-auto mt-[29px] flex h-[30px] w-[360px] rounded-[20px] bg-primary-background"><button type="button" className="w-1/2 rounded-[20px] bg-primary text-[16px] font-medium tracking-[-0.8px] text-white">Day</button><button type="button" onClick={() => setIsWeekView(true)} className="w-1/2 text-[16px] font-medium tracking-[-0.8px] text-primary">Week</button></div>
      <section className="relative mx-auto mt-[22px] h-[120px] w-[360px] rounded-[20px] bg-gray-50 px-[28px] pt-[17px]">
        <p className="text-[12px] font-medium tracking-[-0.6px]">{weekDates[0].getMonth() + 1}월</p>
        <button type="button" aria-label="이전 주" onClick={() => setWeekOffset((offset) => offset - 1)} className="absolute left-2 top-[54px] text-[22px] text-gray-900">‹</button>
        <button type="button" aria-label="다음 주" onClick={() => setWeekOffset((offset) => offset + 1)} className="absolute right-2 top-[54px] text-[22px] text-gray-900">›</button>
        <div className="mt-[10px] flex justify-between">{weekDates.map((date, index) => { const selected = index === selectedDayIndex; const isToday = date.getTime() === today.getTime(); return <button key={date.toISOString()} type="button" onClick={() => setSelectedDayIndex(index)} className="flex w-[35px] flex-col items-center gap-3"><span className={`flex size-[35px] items-center justify-center rounded-full text-[20px] font-medium tracking-[-1px] ${selected ? 'bg-primary text-white' : 'text-gray-900'}`}>{date.getDate()}</span><span className={`text-[12px] font-medium tracking-[-0.6px] ${selected ? 'text-primary' : 'text-gray-900'}`}>{isToday ? '오늘' : weekdays[index]}</span></button>; })}</div>
      </section>
      <div className="mx-[21px] mt-[19px]"><h2 className="text-[20px] font-medium tracking-[-0.4px]">기록 다시 보기</h2></div>
      <section className="mx-auto mt-[22px] flex h-20 w-[360px] items-center gap-2 rounded-[20px] bg-primary-background px-[15px]"><img src={analysisIcon} alt="" className="size-[35px]" /><p className="px-[15px] text-[12px] font-medium tracking-[-0.6px] text-primary">{dateLabel}의 분석</p></section>
      <section className="relative mx-[40px] mt-[39px] h-[481px]" aria-label="산모 기록 다시 보기">
        {recordCards.map((card) => <div key={card.title} className={`pointer-events-none absolute left-0 h-[328px] w-full rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${card.top} ${card.background}`}><img src={card.flap ?? folderFlap} alt="" className={`absolute -top-[18px] right-[22px] h-[18px] w-[70px] ${card.tabOpacity}`} /></div>)}
        {recordCards.map((card) => <span key={`${card.title}-label`} className={`pointer-events-none absolute left-[29px] z-10 ${card.titleTop} text-[20px] font-medium leading-[30px] tracking-[-0.4px] text-white`}>{card.title}</span>)}
      </section>
      <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2"><BottomNavigation activeKey="journey" items={navigationItems} onChange={onNavigate} /></div>
    </main>
  );
};

export default JourneyPage;
