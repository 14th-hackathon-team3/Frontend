const variantStyles = {
  default: 'px-[30px] py-[10px] text-[16px] leading-normal',
  emotion: 'px-[24.8px] py-[8.26px] text-[18.354px] leading-[150%] tracking-[-0.367px]',
};

function Chip({
  children,
  selected = false,
  variant = 'default',
  onClick,
  className = '',
  selectedClassName = 'bg-primary text-gray-50',
  ...props
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`
        inline-flex w-fit items-center justify-center
        whitespace-nowrap rounded-[10px]
        font-sans font-medium
        transition-colors
        ${variantStyles[variant]}
        ${selected ? selectedClassName : 'bg-gray-50 text-text-black'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Chip;
