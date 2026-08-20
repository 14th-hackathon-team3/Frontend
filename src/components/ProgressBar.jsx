function ProgressBar({ current, total, className = '', progressClassName = 'bg-primary' }) {
  const progress = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div
      className={`
        h-[7px] w-full overflow-hidden rounded-full
        bg-gray-500
        ${className}
      `}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
    >
      <div
        className={`h-full rounded-full transition-[width] duration-300 ${progressClassName}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ProgressBar;
