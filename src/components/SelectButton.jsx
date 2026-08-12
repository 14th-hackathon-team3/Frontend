function SelectButton({ children, selected = false, onClick, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`
        flex h-[100px] w-full items-center justify-center
        rounded-[20px] p-[10px]
        font-sans text-[16px] font-medium
        transition-colors
        ${selected ? 'bg-primary text-white' : 'bg-gray-50 text-gray-900'}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default SelectButton;
