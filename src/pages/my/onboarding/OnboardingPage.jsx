import { useState } from 'react';
import { careApi } from '../../../api/care';

import Header from '../../../components/Header';
import ProgressBar from '../../../components/ProgressBar';

import BirthTypeStep from '../../../components/onboarding/BirthTypeStep';
import BirthDateStep from '../../../components/onboarding/BirthDateStep';
import FeedingStep from '../../../components/onboarding/FeedingStep';
import PainStep from '../../../components/onboarding/PainStep';
import ProcessingStep from '../../../components/onboarding/ProcessingStep';

function OnboardingPage({ onNavigate = () => {} }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const PAIN_AREA_MAP = {
    회음부: 'perineum',
    허리: 'lower_back',
    골반: 'pelvis',
    '가슴(유방)': 'breast',
    손목: 'wrist',
    치질: 'hemorrhoid',
    '특별한 통증 없음': 'none',
  };

  const [formData, setFormData] = useState({
    birthType: '',
    birthDate: '',
    feedingType: '',
    painArea: '',
  });

  const updateFormData = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = async () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
      return;
    }

    if (step === 4) {
      setError('');
      setIsSubmitting(true);
      setStep(5);
      try {
        await careApi.createOnboarding({
          delivery_type: formData.birthType,
          delivery_date: formData.birthDate,
          initial_feeding_type: formData.feedingType,
          pain_area: PAIN_AREA_MAP[formData.painArea] ?? 'custom',
        });
        onNavigate('home');
      } catch (requestError) {
        setError(requestError.message || '온보딩 정보를 저장하지 못했습니다.');
        setStep(4);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1 && step <= 4) {
      setStep((prev) => prev - 1);
      return;
    }

    window.history.back();
  };

  const handleSkip = () => {
    onNavigate('home');
  };

  // Processing 화면
  if (step === 5) {
    return (
      <div className="mx-auto min-h-screen w-full max-w-[402px] bg-primary-light">
        <ProcessingStep onBack={() => setStep(4)} />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[402px] bg-primary-light">
      {/* 상단 Header */}
      <div className="pt-[60px]">
        <Header
          variant="onboarding"
          onBack={handleBack}
          rightText="건너뛰기"
          onRightClick={handleSkip}
        />
      </div>

      <main className="px-[30px]">
        {error && <p className="mt-3 text-center text-sm text-error">{error}</p>}
        {/* 진행바 */}
        <ProgressBar current={step} total={4} className="mt-[21px]" />

        {/* 현재 단계 */}
        <p className="mt-[18px] font-sans text-[16px] font-medium text-text-black/60">{step}/4</p>

        {/* Step 1 */}
        {step === 1 && (
          <BirthTypeStep
            value={formData.birthType}
            onChange={(value) => updateFormData('birthType', value)}
            onNext={handleNext}
            disabled={isSubmitting}
          />
        )}

        {/* Step 2 */}
        {step === 2 && (
          <BirthDateStep
            value={formData.birthDate}
            onChange={(value) => updateFormData('birthDate', value)}
            onNext={handleNext}
          />
        )}

        {/* Step 3 */}
        {step === 3 && (
          <FeedingStep
            value={formData.feedingType}
            onChange={(value) => updateFormData('feedingType', value)}
            onNext={handleNext}
          />
        )}

        {/* Step 4 */}
        {step === 4 && (
          <PainStep
            value={formData.painArea}
            onChange={(value) => updateFormData('painArea', value)}
            onNext={handleNext}
          />
        )}
      </main>
    </div>
  );
}

export default OnboardingPage;
