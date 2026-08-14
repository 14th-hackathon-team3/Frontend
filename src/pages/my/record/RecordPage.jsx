import { useState } from 'react';
import BottomNavigation from '../../../components/BottomNavigation';
import infoIcon from '../../../assets/Record_info.png';
import micIcon from '../../../assets/Record_mic.svg';
import folderFlap from '../../../assets/Record_folder_flap.svg';
import activityFolderFlap from '../../../assets/Record_folder_activity_flap.svg';
import RecordingPage from './RecordingPage';
import MoodSleepRecordPage from './MoodSleepRecordPage';
import PelvicFeedingRecordPage from './PelvicFeedingRecordPage';
import SkinHairRecordPage from './SkinHairRecordPage';
import ActivityMemoRecordPage from './ActivityMemoRecordPage';

const navigationItems = [{ key: 'journey', label: '회복 여정' }, { key: 'record', label: '기록' }, { key: 'home', label: '홈' }, { key: 'todo', label: '할 일' }, { key: 'mypage', label: '마이페이지' }];
const recordCards = [{ id: 'activity-memo', title: '활동량/메모', top: 'top-0', titleTop: 'top-6', background: 'bg-primary/10', flap: activityFolderFlap, tabOpacity: 'opacity-100' }, { id: 'skin-hair', title: '피부/모발', top: 'top-[50px]', titleTop: 'top-[74px]', background: 'bg-primary/40', tabOpacity: 'opacity-40' }, { id: 'pain-feeding', title: '통증/수유', top: 'top-[100px]', titleTop: 'top-[124px]', background: 'bg-primary/60', tabOpacity: 'opacity-60' }, { id: 'mood-sleep', title: '감정/수면', top: 'top-[153px]', titleTop: 'top-[177px]', background: 'bg-primary', tabOpacity: 'opacity-100' }];

const RecordPage = ({ onNavigate = () => {} }) => {
  const [screen, setScreen] = useState('main');
  const openCard = (cardId) => {
    if (cardId === 'mood-sleep') setScreen('mood-sleep');
    if (cardId === 'pain-feeding') setScreen('pelvic-feeding');
    if (cardId === 'skin-hair') setScreen('skin-hair');
    if (cardId === 'activity-memo') setScreen('activity-memo');
  };
  if (screen === 'recording') return <RecordingPage onBack={() => setScreen('main')} onComplete={() => setScreen('main')} />;
  if (screen === 'mood-sleep') return <MoodSleepRecordPage onBack={() => setScreen('main')} onNext={() => setScreen('pelvic-feeding')} />;
  if (screen === 'pelvic-feeding') return <PelvicFeedingRecordPage onBack={() => setScreen('main')} onNext={() => setScreen('skin-hair')} />;
  if (screen === 'skin-hair') return <SkinHairRecordPage onBack={() => setScreen('main')} onNext={() => setScreen('activity-memo')} />;
  if (screen === 'activity-memo') return <ActivityMemoRecordPage onBack={() => setScreen('main')} onSave={() => setScreen('main')} />;

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[402px] overflow-hidden bg-primary-light pb-[120px]">
      <header className="flex h-[74px] items-center justify-center border-b border-gray-200 bg-gray-50"><h1 className="text-[20px] font-medium text-text-black">오늘의 기록</h1></header>
      <section className="px-[38px] pt-[17px]"><p className="text-[16px] font-medium leading-6 tracking-[-0.32px] text-black/70">4월 21일 | 2/8 완료</p><button type="button" onClick={() => setScreen('recording')} className="mx-auto mt-[18px] block h-[70px] w-[70px]" aria-label="음성 기록 시작"><img src={micIcon} alt="" className="h-full w-full" /></button><div className="mt-[18px] flex h-20 items-center gap-4 rounded-[20px] bg-primary-background px-[31px]"><img src={infoIcon} alt="안내" className="h-8 w-8 shrink-0" /><p className="text-[12px] font-medium leading-4 tracking-[-0.48px] text-primary">통증, 감정, 증상 등을 음성 메모로 기록할 수 있어요.<br />위 녹음 버튼을 눌러 기록해보세요.</p></div></section>
      <section className="relative mx-[40px] mt-[47px] h-[481px]" aria-label="기록 항목">
        {recordCards.map((card) => <div key={card.id} className={`pointer-events-none absolute left-0 h-[328px] w-full rounded-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${card.top} ${card.background}`}><img src={card.flap ?? folderFlap} alt="" aria-hidden="true" className={`absolute -top-[18px] right-[22px] h-[18px] w-[70px] ${card.tabOpacity}`} /></div>)}
        {recordCards.map((card) => <button key={`${card.id}-action`} type="button" onClick={() => openCard(card.id)} className={`absolute left-0 w-full ${card.id === 'pain-feeding' ? 'z-30 h-[60px]' : card.id === 'mood-sleep' ? 'top-[160px] z-20 h-[321px]' : 'z-20 h-[53px]'} ${card.id === 'mood-sleep' ? '' : card.top}`} aria-label={`${card.title} 기록하기`} />)}
        {recordCards.map((card) => <span key={`${card.id}-title`} className={`pointer-events-none absolute left-[29px] z-10 ${card.titleTop} text-[20px] font-medium leading-[30px] tracking-[-0.4px] text-white`}>{card.title}</span>)}
      </section>
      <div className="fixed bottom-[22px] left-1/2 z-10 -translate-x-1/2"><BottomNavigation activeKey="record" items={navigationItems} onChange={onNavigate} /></div>
    </main>
  );
};

export default RecordPage;
