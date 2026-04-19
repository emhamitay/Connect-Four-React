// בס"ד
export default function Alert({ title, children, noClose = false }) {
  return (
    <div
      role="alert"
      className="rounded-md border border-gray-300 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-800"
    >
      <div className="flex items-start gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-green-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>

        <div className="flex-1">
          <strong className="font-medium text-gray-900 dark:text-white">
            {title}
          </strong>
          <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-200">
            {children}
          </p>
        </div>

        {!noClose && (
          <button
            className="-m-3 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            type="button"
            aria-label="Dismiss alert"
          >
            <span className="sr-only">Dismiss popup</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
