import { useState } from 'react';
import { groupsApi } from '../../../api/groups';

import Header from '../../../components/Header';
import ProgressBar from '../../../components/ProgressBar';

import RelationshipStep from './RelationshipStep';
import LivingTogetherStep from './LivingTogetherStep';
import CareTimeStep from './CareTimeStep';
import FamilyProcessingStep from './FamilyProcessingStep';

function FamilyOnboardingPage({ onNavigate = () => {} }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    relationship: '',
    livingTogether: '',
    careTimes: [],
  });

  const updateFormData = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    if (step === 3) {
      setStep(4);
      try {
        await groupsApi.completeMembershipOnboarding({
          relation: formData.relationship,
          is_cohabiting: formData.livingTogether === 'together',
          available_time: formData.careTimes,
        });
        onNavigate('home');
      } catch (requestError) {
        console.error(requestError);
        setStep(3);
      }
    }
  };

  const handleBack = () => {
    if (step > 1 && step <= 3) {
      setStep((prev) => prev - 1);
      return;
    }

    window.history.back();
  };

  const handleSkip = () => {
    console.log('가족 온보딩 건너뛰기');

    // 추후 홈 페이지 이동
  };

  if (step === 4) {
    return (
      <div className="mx-auto min-h-screen w-full max-w-[402px] bg-primary-light">
        <FamilyProcessingStep
          onBack={() => setStep(3)}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[402px] bg-primary-light">
      {/* Header */}
      <div className="pt-[60px]">
        <Header
          variant="onboarding"
          onBack={handleBack}
          rightText="건너뛰기"
          onRightClick={handleSkip}
        />
      </div>

      <main className="px-[30px]">
        {/* Progress */}
        <ProgressBar
          current={step}
          total={3}
          className="mt-[21px]"
        />

        {/* 현재 Step */}
        <p className="mt-[18px] font-sans text-[16px] font-medium text-text-black/60">
          {step}/3
        </p>

        {step === 1 && (
          <RelationshipStep
            value={formData.relationship}
            onChange={(value) =>
              updateFormData('relationship', value)
            }
            onNext={handleNext}
          />
        )}

        {step === 2 && (
          <LivingTogetherStep
            value={formData.livingTogether}
            onChange={(value) =>
              updateFormData('livingTogether', value)
            }
            onNext={handleNext}
          />
        )}

        {step === 3 && (
          <CareTimeStep
            value={formData.careTimes}
            onChange={(value) =>
              updateFormData('careTimes', value)
            }
            onNext={handleNext}
          />
        )}
      </main>
    </div>
  );
}

export default FamilyOnboardingPage;
