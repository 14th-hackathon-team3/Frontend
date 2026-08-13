import { useState } from 'react';

import Header from '../../../components/Header';
import ProgressBar from '../../../components/ProgressBar';

import BirthTypeStep from '../../../components/onboarding/BirthTypeStep';
import BirthDateStep from '../../../components/onboarding/BirthDateStep';
import FeedingStep from '../../../components/onboarding/FeedingStep';
import PainStep from '../../../components/onboarding/PainStep';
import ProcessingStep from '../../../components/onboarding/ProcessingStep';

function OnboardingPage() {
  const [step, setStep] = useState(1);

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

  const handleNext = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
      return;
    }

    if (step === 4) {
      console.log('온보딩 최종 데이터:', formData);

      // 추후 API 연동
      // 예:
      // await postOnboarding(formData);

      setStep(5);
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
    console.log('온보딩 건너뛰기');

    // 추후 홈 화면 이동
    // navigate('/home');
  };

  // Processing 화면
  if (step === 5) {
    return (
      <div className="mx-auto min-h-screen w-full max-w-[402px] bg-primary-light">
        <ProcessingStep
          onBack={() => setStep(4)}
        />
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
        {/* 진행바 */}
        <ProgressBar
          current={step}
          total={4}
          className="mt-[21px]"
        />

        {/* 현재 단계 */}
        <p className="mt-[18px] font-sans text-[16px] font-medium text-text-black/60">
          {step}/4
        </p>

        {/* Step 1 */}
        {step === 1 && (
          <BirthTypeStep
            value={formData.birthType}
            onChange={(value) =>
              updateFormData('birthType', value)
            }
            onNext={handleNext}
          />
        )}

        {/* Step 2 */}
        {step === 2 && (
          <BirthDateStep
            value={formData.birthDate}
            onChange={(value) =>
              updateFormData('birthDate', value)
            }
            onNext={handleNext}
          />
        )}

        {/* Step 3 */}
        {step === 3 && (
          <FeedingStep
            value={formData.feedingType}
            onChange={(value) =>
              updateFormData('feedingType', value)
            }
            onNext={handleNext}
          />
        )}

        {/* Step 4 */}
        {step === 4 && (
          <PainStep
            value={formData.painArea}
            onChange={(value) =>
              updateFormData('painArea', value)
            }
            onNext={handleNext}
          />
        )}
      </main>
    </div>
  );
}

export default OnboardingPage;