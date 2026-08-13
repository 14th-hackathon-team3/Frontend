function ToggleButton({ children, selected = false, onClick, className = '', ...props }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`
        flex h-[67px] w-[155px] items-center justify-center
        rounded-[10px] p-[10px]
        font-sans text-[20px] font-medium
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

export default ToggleButton;
