import { useEffect, useState } from 'react';
import BottomNavigation from '../../../components/BottomNavigation';
import { careApi } from '../../../api/care';
import backButton from '../../../assets/back_button.svg';
import menuBookIcon from '../../../assets/recoveryjourney_menu_book.svg';
import analysisIcon from '../../../assets/Todo_star.svg';
import folderFlap from '../../../assets/Record_folder_flap.svg';
import activityFolderFlap from '../../../assets/Record_folder_activity_flap.svg';
import hiddenInfoIcon from '../../../assets/hidden_info.png';
import VoiceMemoPlayer from './VoiceMemoPlayer';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://bailey44.pythonanywhere.com').replace(/\/$/, '');

const resolveAudioUrl = (value) => {
  if (typeof value !== 'string' || !value.trim()) return null;
  if (/^(https?:|blob:|data:)/.test(value)) return value;
  return `${API_BASE_URL}/${value.replace(/^\//, '')}`;
};

const getVoiceMemoUrl = (response) => {
  const dailyLog = response?.data ?? response;
  const voiceMemos = Array.isArray(dailyLog?.voice_memos) ? dailyLog.voice_memos : [];
  const latestVoiceMemo = voiceMemos.at(-1);
  const voiceMemo = dailyLog?.voice_memo ?? latestVoiceMemo;
  const candidates = [
    typeof voiceMemo === 'string' ? voiceMemo : null,
    voiceMemo?.audio_file,
    voiceMemo?.audio_url,
    voiceMemo?.file,
    dailyLog?.voice_memo_url,
    dailyLog?.audio_file,
  ];

  return resolveAudioUrl(candidates.find((value) => typeof value === 'string' && value.trim()));
};

const navigationItems = [
  { key: 'journey', label: '회복 여정' },
  { key: 'record', label: '기록' },
  { key: 'home', label: '홈' },
  { key: 'todo', label: '할 일' },
  { key: 'mypage', label: '마이페이지' },
];

const recordCards = [
  { id: 'activity', title: '활동량/메모', top: 'top-0', titleTop: 'top-6', background: 'bg-primary/10', flap: activityFolderFlap, tabOpacity: 'opacity-100' },
  { id: 'skin', title: '피부/모발', top: 'top-[50px]', titleTop: 'top-[74px]', background: 'bg-primary/40', tabOpacity: 'opacity-40' },
  { id: 'pain', title: '통증/수유', top: 'top-[100px]', titleTop: 'top-[124px]', background: 'bg-primary/60', tabOpacity: 'opacity-60' },
  { id: 'mood-sleep', title: '감정/수면', top: 'top-[153px]', titleTop: 'top-[177px]', background: 'bg-primary', tabOpacity: 'opacity-100' },
];

const mockRecords = {
  'mood-sleep': { title: '감정/수면', date: '2026년 6월 1일', sections: [{ label: '감정 상태', values: ['행복한', '활동적인'] }, { label: '수면 시간', text: '7시간 30분' }] },
  pain: { title: '통증/수유', date: '2026년 6월 1일', sections: [{ label: '골반저 증상', values: ['복부 처짐'] }, { label: '증상 심화 정도', text: '2/5' }, { label: '수유 방식', values: ['분유'] }] },
  skin: { title: '피부/모발', date: '2026년 6월 1일', sections: [{ label: '피부 상태', text: '좋음' }, { label: '피부 증상', values: ['건조'] }, { label: '모발 상태', text: '평소와 같음' }] },
  activity: { title: '활동량/메모', date: '2026년 6월 1일', sections: [{ label: '활동량', text: '30분' }, { label: '활동 종류', text: '산책' }, { label: '자유 메모', text: '컨디션이 좋아 가볍게 산책했어요.' }] },
};

const RecordHistoryPage = ({ record, onBack }) => (
  <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-primary-light px-[31px] pt-[74px]">
    <header className="absolute inset-x-0 top-0 flex h-[74px] items-center justify-center border-b border-gray-200 bg-gray-50">
      <button type="button" onClick={onBack} aria-label="뒤로 가기" className="absolute left-5 flex h-8 w-8 items-center justify-center"><img src={backButton} alt="" className="h-[21px] w-[13px]" /></button>
      <h1 className="text-[20px] font-medium text-text-black">{record.title} 기록</h1>
    </header>
    <p className="pt-6 text-[16px] font-medium text-black/70">{record.date}</p>
    <section className="mt-6 rounded-[20px] bg-gray-50 p-6">
      {record.sections.map((section, index) => <div key={section.label}>{index > 0 && <div className="my-7 border-t border-gray-200" />}<h2 className="text-[20px] font-medium">{section.label}</h2>{section.values ? <div className="mt-5 flex flex-wrap gap-[10px]">{section.values.map((value) => <span key={value} className="rounded-[10px] bg-primary px-5 py-[10px] text-[16px] font-medium text-white">{value}</span>)}</div> : <p className="mt-4 text-[18px] font-medium leading-7 text-primary">{section.text}</p>}</div>)}
    </section>
  </main>
);

const ActivityMemoHistoryPage = ({ onBack }) => {
  const [voiceMemoUrl, setVoiceMemoUrl] = useState(null);

  useEffect(() => {
    let isActive = true;

    careApi.getTodayDailyLog()
      .then((dailyLog) => {
        if (isActive) setVoiceMemoUrl(getVoiceMemoUrl(dailyLog));
      })
      .catch(() => {
        if (isActive) setVoiceMemoUrl(null);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
  <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-primary-light px-[27px] pb-10 pt-[102px]">
    <header className="absolute inset-x-0 top-0 flex h-[74px] items-center justify-center border-b border-[#dcdcdc] bg-gray-50">
      <button type="button" onClick={onBack} aria-label="뒤로 가기" className="absolute left-5 flex h-8 w-8 items-center justify-center">
        <img src={backButton} alt="" className="h-[21px] w-[13px]" />
      </button>
      <h1 className="text-[20px] font-medium text-text-black">활동량/메모</h1>
    </header>

    <section className="space-y-[30px]">
      <div className="space-y-[15px]">
        <h2 className="text-[20px] font-medium tracking-[-0.4px] text-text-black">활동량</h2>
        <div className="flex h-[51px] items-center rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] text-[#121212]">1시간</div>
      </div>
      <div className="border-t border-gray-200" />
      <div className="space-y-[15px]">
        <h2 className="text-[20px] font-medium tracking-[-0.4px] text-text-black">활동 종류</h2>
        <div className="flex h-[51px] items-center rounded-[10px] border border-[#cbcbcb] bg-[#f6f6f6] px-4 text-[16px] text-[#121212]">산책</div>
      </div>
      <div className="border-t border-gray-200" />
      <div className="space-y-[15px]">
        <h2 className="text-[20px] font-medium tracking-[-0.4px] text-text-black">자유 메모</h2>
        <div className="min-h-[150px] rounded-[18px] border border-gray-300 px-[21px] py-[25px] text-[16px] leading-6 text-text-black">
          손목 부분이 뻐근했고, 잠을 잘 못 자서 하루 종일 기분이 다운되어 있었음.
        </div>
      </div>
      <div className="border-t border-gray-200" />
      <div className="space-y-[15px]">
        <h2 className="text-[20px] font-medium tracking-[-0.4px] text-text-black">음성 메모</h2>
        <div className="px-[11px]">
          <VoiceMemoPlayer src={voiceMemoUrl} />
        </div>
      </div>
    </section>
  </main>
  );
};

const PrivacySelectionSheet = ({ onClose }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const privateRecordItems = ['감정상태', '수면시간', '통증부위', '통증정도', '수유방식', '모유량', '모유시 통증', '피부상태', '피부증상', '모발상태', '활동량', '활동종류', '자유메모', '음성메모'];

  const toggleItem = (item) => {
    setSelectedItems((items) => items.includes(item) ? items.filter((selected) => selected !== item) : [...items, item]);
  };

  return (
    <div className="fixed inset-0 z-30 mx-auto w-full max-w-[402px] bg-black/15">
      <button type="button" aria-label="비공개 항목 선택 닫기" onClick={onClose} className="absolute inset-0" />
      <section className="absolute inset-x-0 bottom-0 rounded-t-[22px] bg-gray-50 px-[35px] pb-[44px] pt-[46px]" aria-label="가족에게 비공개할 항목 선택">
        <div className="mx-auto mb-[38px] h-[3px] w-[50px] rounded-full bg-gray-200" />
        <h2 className="text-center text-[20px] font-medium tracking-[-0.4px] text-text-black">가족에게 비공개할 항목 선택</h2>
        <div className="mt-[38px] grid grid-cols-3 gap-x-[9px] gap-y-[9px]">
          {privateRecordItems.map((item) => {
            const selected = selectedItems.includes(item);
            return <button key={item} type="button" onClick={() => toggleItem(item)} className={`h-[36px] rounded-[10px] text-[15px] font-medium tracking-[-0.3px] ${selected ? 'bg-primary text-white' : 'bg-gray-200 text-text-black'}`}>{item}</button>;
          })}
        </div>
      </section>
    </div>
  );
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

const TrackingPrivacySheet = ({ title, isPrivate, onClose, onConfirm }) => (
  <div className="fixed inset-0 z-30 mx-auto w-full max-w-[402px] bg-black/15">
    <button type="button" aria-label="트래킹 메뉴 닫기" onClick={onClose} className="absolute inset-0" />
    <section className="absolute inset-x-0 bottom-0 min-h-[237px] rounded-t-[22px] bg-gray-50 px-5 pt-[7px]" aria-label={`${title} 메뉴`}>
      <div className="mx-auto h-[3px] w-[40px] rounded-full bg-gray-200" />
      <h2 className="mt-[31px] text-center text-[20px] font-medium tracking-[-0.4px] text-text-black">{title} 트래킹</h2>
      <button type="button" onClick={() => onConfirm(title)} className="mt-[56px] flex items-center gap-3 text-[16px] font-medium text-text-black"><img src={hiddenInfoIcon} alt="" className="size-[24px]" />보호자에게 비공개 {isPrivate ? '해제하기' : '하기'}</button>
    </section>
  </div>
);

const WeeklyJourneyPage = ({ onDay, onNavigate, privateCard, privateCards, onPrivateCard, onClosePrivate, onConfirmPrivate }) => (
  <main className="relative mx-auto min-h-screen w-full max-w-[402px] bg-primary-light pb-[122px] pt-[37px]">
    <header className="flex items-end justify-between px-[21px]"><h1 className="text-[24px] font-medium tracking-[-0.48px] text-black">Recovery Journey</h1><button type="button" aria-label="회복 여정 안내"><img src={menuBookIcon} alt="" className="h-[30px] w-[30px]" /></button></header>
    <div className="mx-auto mt-[29px] flex h-[30px] w-[360px] rounded-[20px] bg-primary-background"><button type="button" onClick={onDay} className="w-1/2 rounded-[20px] text-[16px] font-medium tracking-[-0.8px] text-primary">Day</button><button type="button" className="w-1/2 rounded-[20px] bg-primary text-[16px] font-medium tracking-[-0.8px] text-white">Week</button></div>
    <section className="mx-auto mt-[27px] flex h-20 w-[360px] items-center gap-2 rounded-[20px] bg-primary-background px-[15px]"><img src={analysisIcon} alt="" className="h-[35px] w-[35px]" /><p className="px-[15px] text-[12px] font-medium text-primary">최근 7일 종합 분석 AI 코멘트...</p></section>
    <section className="mx-auto mt-[29px] w-[360px] space-y-[13px]">
      <article onClick={() => onPrivateCard('수면')} className="cursor-pointer rounded-[20px] bg-gray-50 px-4 py-[16px]"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-[18px] font-medium">{privateCards.includes('수면') && <img src={hiddenInfoIcon} alt="비공개" className="size-[20px]" />}수면</h2><div className="flex items-center gap-2"><span className="rounded-[13px] bg-[#fff1f1] px-2 py-1 text-[12px] text-[#ff5f5f]">최근 3일 감소</span><span className="text-[16px] text-[#ff5f5f]">5.3h</span></div></div><TrendChart color="#ff5f5f" points={[28, 13, 36, 28, 46, 61, 52]} /></article>
      <article onClick={() => onPrivateCard('통증')} className="cursor-pointer rounded-[20px] bg-gray-50 px-4 py-[16px]"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-[18px] font-medium">{privateCards.includes('통증') && <img src={hiddenInfoIcon} alt="비공개" className="size-[20px]" />}통증</h2><div className="flex items-center gap-2"><span className="rounded-[13px] bg-[#effbf4] px-2 py-1 text-[12px] text-[#53c690]">전반적으로 감소</span><span className="text-[16px] text-[#53c690]">4</span></div></div><TrendChart color="#53c690" area points={[14, 14, 36, 36, 58, 58, 36]} /></article>
      <article onClick={() => onPrivateCard('감정')} className="cursor-pointer rounded-[20px] bg-gray-50 px-4 py-[16px]"><div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-[18px] font-medium">{privateCards.includes('감정') && <img src={hiddenInfoIcon} alt="비공개" className="size-[20px]" />}감정</h2><span className="rounded-[13px] bg-[#effbf4] px-2 py-1 text-[12px] text-[#53c690]">최근 긍정적인 감정 증가</span></div><div className="mt-[16px] flex justify-between px-[10px] text-[22px]"><span>🙂</span><span>😐</span><span>😐</span><span>😢</span><span>😐</span><span>🙂</span><span>🙂</span></div><div className="mt-1 flex justify-between px-[9px] text-[11px] text-gray-500"><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span><span>일</span></div></article>
      <article className="rounded-[20px] bg-[#fff5ff] px-4 py-[16px]"><p className="text-[16px] font-medium text-[#ff5f5f]">⚠ 최근 수면시간이 감소하고 있어요</p><p className="mt-3 text-[12px] text-gray-700">최근 3일간 수면 시간이 지속적으로 낮아지고 있어요.</p></article>
    </section>
    <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2"><BottomNavigation activeKey="journey" items={navigationItems} onChange={onNavigate} /></div>
    {privateCard && <TrackingPrivacySheet title={privateCard} isPrivate={privateCards.includes(privateCard)} onClose={onClosePrivate} onConfirm={onConfirmPrivate} />}
  </main>
);

const JourneyPage = ({ onNavigate = () => {} }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayWeekday = (today.getDay() + 6) % 7;
  const [selectedDayIndex, setSelectedDayIndex] = useState(todayWeekday);
  const [weekOffset, setWeekOffset] = useState(0);
  const [view, setView] = useState('journey');
  const [isWeekView, setIsWeekView] = useState(false);
  const [privateCard, setPrivateCard] = useState(null);
  const [privateCards, setPrivateCards] = useState([]);
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - todayWeekday + (weekOffset * 7));
  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return date;
  });
  const selectedDate = weekDates[selectedDayIndex];
  const isSelectedToday = selectedDate.getTime() === today.getTime();
  const selectedDateLabel = isSelectedToday ? '오늘' : `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
  const selectedDay = selectedDayIndex + 1;
  const setSelectedDay = (day) => setSelectedDayIndex(day - 1);

  if (view === 'activity') return <ActivityMemoHistoryPage onBack={() => setView('journey')} />;
  if (view !== 'journey' && view !== 'privacy') return <RecordHistoryPage record={mockRecords[view]} onBack={() => setView('journey')} />;
  if (isWeekView) return <WeeklyJourneyPage onDay={() => setIsWeekView(false)} onNavigate={onNavigate} privateCard={privateCard} privateCards={privateCards} onPrivateCard={setPrivateCard} onClosePrivate={() => setPrivateCard(null)} onConfirmPrivate={(card) => { setPrivateCards((cards) => cards.includes(card) ? cards.filter((privateItem) => privateItem !== card) : [...cards, card]); setPrivateCard(null); }} />;

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[120px]">
      <header className="flex items-end justify-between px-[21px] pt-[37px]"><h1 className="text-[24px] font-medium tracking-[-0.48px] text-black">Recovery Journey</h1><button type="button" aria-label="회복 여정 안내"><img src={menuBookIcon} alt="" className="h-[30px] w-[30px]" /></button></header>
      <div className="mx-auto mt-[29px] flex h-[30px] w-[360px] rounded-[20px] bg-primary-background p-0">
        <button type="button" className="w-1/2 rounded-[20px] bg-primary text-[16px] font-medium tracking-[-0.8px] text-white">Day</button>
        <button type="button" onClick={() => setIsWeekView(true)} className="w-1/2 text-[16px] font-medium tracking-[-0.8px] text-primary">Week</button>
      </div>
      <section className="invisible relative mx-auto mt-[22px] h-[120px] w-[360px] rounded-[20px] bg-gray-50 px-[28px] pt-[17px]">
        <p className="text-[12px] font-medium tracking-[-0.6px]">6월</p>
        <button type="button" aria-label="이전 주" className="absolute left-2 top-[54px] text-[22px] text-[#121212]">‹</button><button type="button" aria-label="다음 주" className="absolute right-2 top-[54px] text-[22px] text-[#121212]">›</button>
        <div className="mt-[10px] flex justify-between">{days.map((day, index) => { const number = index + 1; const selected = number === selectedDay; return <button key={day} type="button" onClick={() => setSelectedDay(number)} className="flex w-[35px] flex-col items-center gap-3"><span className={`flex size-[35px] items-center justify-center rounded-full text-[20px] font-medium tracking-[-1px] ${selected ? 'bg-primary text-white' : 'text-[#121212]'}`}>{number}</span><span className={`text-[12px] font-medium tracking-[-0.6px] ${selected ? 'text-primary' : 'text-[#121212]'}`}>{day}</span></button>; })}</div>
      </section>
      <section className="relative z-10 mx-auto -mt-[120px] h-[120px] w-[360px] rounded-[20px] bg-gray-50 px-[28px] pt-[17px]">
        <p className="text-[12px] font-medium tracking-[-0.6px]">{weekDates[0].getMonth() + 1}월</p>
        <button type="button" aria-label="이전 주" onClick={() => setWeekOffset((offset) => offset - 1)} className="absolute left-2 top-[54px] text-[22px] text-[#121212]">‹</button>
        <button type="button" aria-label="다음 주" onClick={() => setWeekOffset((offset) => offset + 1)} className="absolute right-2 top-[54px] text-[22px] text-[#121212]">›</button>
        <div className="mt-[10px] flex justify-between">{weekDates.map((date, index) => { const selected = index === selectedDayIndex; const isToday = date.getTime() === today.getTime(); return <button key={date.toISOString()} type="button" onClick={() => setSelectedDayIndex(index)} className="flex w-[35px] flex-col items-center gap-3"><span className={`flex size-[35px] items-center justify-center rounded-full text-[20px] font-medium tracking-[-1px] ${selected ? 'bg-primary text-white' : 'text-[#121212]'}`}>{date.getDate()}</span><span className={`text-[12px] font-medium tracking-[-0.6px] ${selected ? 'text-primary' : 'text-[#121212]'}`}>{isToday ? '오늘' : days[index]}</span></button>; })}</div>
      </section>
      <section className="mx-auto mt-[69px] flex h-20 w-[360px] items-center gap-2 rounded-[20px] bg-primary-background px-[15px]"><img src={analysisIcon} alt="" className="h-[35px] w-[35px]" /><p className="px-[15px] text-[12px] font-medium leading-4 tracking-[-0.6px] text-primary">{selectedDateLabel}의 분석 리포트...</p></section>
      <div className="mx-[21px] mt-[19px] flex items-center justify-between"><h2 className="text-[20px] font-medium tracking-[-0.4px]">기록 다시 보기</h2><button type="button" aria-label="비공개 항목 선택" onClick={() => setView('privacy')} className="flex size-[30px] items-center justify-center"><img src={hiddenInfoIcon} alt="" className="size-[30px]" /></button></div>
      <section className="relative mx-[40px] mt-[47px] h-[481px]" aria-label="기록 다시 보기">
        {recordCards.map((card) => <div key={card.id} className={`pointer-events-none absolute left-0 h-[328px] w-full rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${card.top} ${card.background}`}><img src={card.flap ?? folderFlap} alt="" className={`absolute -top-[18px] right-[22px] h-[18px] w-[70px] ${card.tabOpacity}`} /></div>)}
        {recordCards.map((card) => <button key={`${card.id}-action`} type="button" onClick={() => setView(card.id)} aria-label={`${card.title} 기록 보기`} className={`absolute left-0 z-20 w-full ${card.id === 'pain' ? 'h-[60px]' : card.id === 'mood-sleep' ? 'top-[160px] h-[321px]' : 'h-[53px]'} ${card.id === 'mood-sleep' ? '' : card.top}`} />)}
        {recordCards.map((card) => <span key={card.id} className={`pointer-events-none absolute left-[29px] z-10 ${card.titleTop} text-[20px] font-medium leading-[30px] tracking-[-0.4px] text-white`}>{card.title}</span>)}
      </section>
      <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2"><BottomNavigation activeKey="journey" items={navigationItems} onChange={onNavigate} /></div>
      {view === 'privacy' && <PrivacySelectionSheet onClose={() => setView('journey')} />}
    </main>
  );
};

export default JourneyPage;
