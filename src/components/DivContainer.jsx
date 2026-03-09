export default function DivContainer({ title, children }) {
  return (
    <div className="flex flex-col items-center w-screen">
      <div className="bg-gray-100 m-10 p-5 rounded-lg shadow-md border-gray-300 border-2 w-96">
        <header className="inline-block w-full">
          <h1 className="text-3xl font-bold">{title}</h1>
          <span className="hr"></span>
        </header>
        {children}
      </div>
    </div>
  );
}
