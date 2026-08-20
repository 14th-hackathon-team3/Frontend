import backButton from '../assets/back_button.svg';

const Header = ({ variant = 'default', title, onBack, rightText = '건너뛰기', onRightClick }) => {
  if (variant === 'onboarding') {
    return (
      <header
        className="
          flex w-full items-center justify-between
          px-[30px] py-[10px]
        "
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="뒤로 가기"
          className="flex items-center justify-center"
        >
          <img src={backButton} alt="" className="h-[18px] w-[10px] opacity-90" />
        </button>

        <button
          type="button"
          onClick={onRightClick}
          className="
            font-sans text-[16px] font-normal
            leading-normal text-text-black
          "
        >
          {rightText}
        </button>
      </header>
    );
  }

  return (
    <header
      className="
        relative flex h-[112px] w-full
        items-center justify-center
        bg-primary-light
      "
    >
      <button
        type="button"
        onClick={onBack}
        aria-label="뒤로 가기"
        className="
          absolute left-[30px]
          flex items-center justify-center
        "
      >
        <img src={backButton} alt="" className="h-[21px] w-[13px]" />
      </button>

      <h1
        className="
          font-sans text-[20px] font-medium
          leading-normal text-text-black
        "
      >
        {title}
      </h1>
    </header>
  );
};

export default Header;
