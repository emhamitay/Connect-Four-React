export default function Input({
  type,
  id,
  text,
  value,
  onChange,
  isMust = false,
  isError = false,
  isTouched = false,
  errorMessage = ''
}) {
  const borderColor = isTouched
    ? (isError ? 'border-red-500' : 'border-green-500')
    : 'border-gray-400';

  return (
    <label htmlFor={id} className="block">
      <span className="font-medium text-gray-700 dark:text-gray-200">
        {text}
        {isMust && <span className="text-red-500 text-sm ml-1">(required)</span>}
      </span>

      <div className="flex items-center gap-2 mt-1">
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          aria-invalid={isError}
          aria-describedby={`${id}-error`}
          className={`p-2 w-full rounded border ${borderColor} border-1 shadow-sm sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white`}
        />
      </div>

      {isTouched && isError && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-red-600 dark:text-red-400"
        >
          {errorMessage || 'This field is required'}
        </p>
      )}
    </label>
  );
}
