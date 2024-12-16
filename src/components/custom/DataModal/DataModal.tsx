import { responseActions } from "../../../redux/reducers/responseReducer";
import { useAppDispatch, useAppSelector } from "../../../services/customHooks";

export const DataModal = () => {
    const { status, json } = useAppSelector(state => state.response);
    const dispatch = useAppDispatch();

    return (
    <dialog
        className="absolute top-0 left-0 size-full bg-[#00000047]"
        open={(status !== '' || json !== '')}
    >
        <div className={`
            absolute
            border
            border-black
            max-w-[700px]
            w-full
            block
            left-[50%]
            top-[50%]
            translate-x-middle
            translate-y-middle
            bg-white
        `}>
            <div className="block border-b-2 border-black px-2 py-1 bg-[#A0D683]">
                <h1 className="font-display text-title">Результат</h1>
            </div>

            <div className="block p-4">
                <h4>Статус код: {status}</h4>

                <textarea
                    readOnly
                    style={{ resize: 'none' }}
                    value={json}
                    className="block mt-4 p-4 border border-black w-full h-[400px]"
                    placeholder="Відповідь із сервера (JSON)"
                >
                    
                </textarea>

                <button
                    className="block mt-3 p-2 bg-[#001A6E] text-white"
                    onClick={() => dispatch(responseActions.clearData())}
                >
                    Закрити вікно
                </button>
            </div>
        </div>
    </dialog>
    );
}