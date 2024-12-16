import { queryActions } from "../../redux/reducers/queryReducer";
import { useAppDispatch, useAppSelector } from "../../services/customHooks";

export type QueryFieldType = {
    query: string;
    setQuery: (val: string) => void;
    onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const QueryField: React.FC<QueryFieldType> = ({ query, setQuery, onSubmitHandler }) => {
    const dispatch = useAppDispatch();
    const { method, error } = useAppSelector(state => state.query);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        dispatch(queryActions.changeMethod(value));
    }

    return (<form onSubmit={onSubmitHandler}>
        <div className="flex">
            <select
                className="border border-black"
                onChange={handleChange}
                value={method}
            >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
            </select>
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
        </div>

        {error && <p className="text-[#D91656]">
            {error}
        </p>}
    </form>);
}