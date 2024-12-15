
export type QueryFieldType = {
    query: string;
    setQuery: (val: string) => void;
    onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const QueryField: React.FC<QueryFieldType> = ({ query, setQuery, onSubmitHandler }) => {
    return (<form className="flex" onSubmit={onSubmitHandler}>
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block p-2 w-full border outline-none"
            placeholder="Type url for request..."
        />

        <button className={`
            black
            py-2
            px-4
            bg-[#22177A]
            hover:bg-[#3e2ad4]
            duration-300
            text-white
            font-oswald
            font-medium
            uppercase
        `}>
            Send
        </button>
    </form>);
}