function OptionButton({ children, selected = false, onClick, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`
        inline-flex h-[67px] min-w-[105px] w-fit
        items-center justify-center
        whitespace-nowrap rounded-[10px] px-[29px]
        font-sans text-[20px] font-medium
        leading-[150%] tracking-[-0.4px]
        transition-colors
        ${selected ? 'bg-primary text-gray-50' : 'bg-gray-50 text-text-black'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default OptionButton;
