import { testActions } from "../../redux/reducers/testReducer";
import { useAppDispatch, useAppSelector } from "../../services/customHooks";

export const TestSection: React.FC = () => {
    const { status, expectedJson } = useAppSelector(state => state.test);
    const dispatch = useAppDispatch();

    return (<>
        <h3>Tests</h3>

        <input
            type="text"
            placeholder="Expected status code"
            className="block p-1 border border-black w-full"
            value={status}
            onChange={(e) => dispatch(testActions.setStatus(e.target.value))}
        />

        <textarea
            placeholder="Expected json data"
            className="block p-4 mt-3 border border-black w-full h-[200px]"
            value={expectedJson}
            onChange={(e) => dispatch(testActions.setExpectedJson(e.target.value))}
        >

        </textarea>
    </>);
}