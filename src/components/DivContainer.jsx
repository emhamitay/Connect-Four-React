export default function DivContainer({ title, children }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6">
      <div className="w-full max-w-lg rounded-3xl border border-blue-200/70 bg-white/75 p-6 shadow-[0_22px_60px_rgba(36,72,135,0.18)] backdrop-blur sm:p-8">
        <header className="inline-block w-full">
          {title && <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>}
          <span className="hr"></span>
        </header>
        {children}
      </div>
    </div>
  );
}
