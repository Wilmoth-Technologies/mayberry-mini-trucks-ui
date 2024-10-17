export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg className="h-5 w-5 fill-gray-600" viewBox="0 0 20 20"><path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                /></svg>
            </span>
            <input
                value={filter || ""}
                onChange={e => setFilter(e.target.value)}
                placeholder="Search Make, Model, or Keyword"
                className="placeholder:italic placeholder:text-gray-text block bg-white w-auto largerMobile:w-72 border border-border-gray rounded-full py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            />
        </label>
    );
};
