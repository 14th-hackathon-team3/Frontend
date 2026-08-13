const BottomNavigation = ({ activeKey, onChange, items = [], className = '' }) => {
  return (
    <nav
      className={`
        inline-flex items-center gap-[16.5px]
        rounded-[55px] bg-black
        px-[22px] py-[11px]
        ${className}
      `}
      aria-label="하단 네비게이션"
    >
      {items.map((item) => {
        const isActive = activeKey === item.key;

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`
              flex h-[55px] w-[55px]
              shrink-0 items-center justify-center
              rounded-full transition-colors
              ${isActive ? 'bg-primary' : 'bg-dark-gray'}
            `}
          >
            <span
              aria-hidden="true"
              className={`
                h-[31px] w-[31px]
                ${isActive ? 'bg-nav-active-icon' : 'bg-gray-500'}
              `}
              style={{
                WebkitMaskImage: `url(${item.icon})`,
                maskImage: `url(${item.icon})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
