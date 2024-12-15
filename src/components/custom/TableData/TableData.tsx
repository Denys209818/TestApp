import { ParamsType } from "../../RequestDialog/types/types";


export type TableDataType = {
    title: string;
    params: ParamsType[];
    addItem: () => void;
    changeCheckedItem: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    changeValue: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    changeKey: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    removeItem: (id: string) => void;
};

export const TableData: React.FC<TableDataType> = ({ title, params, addItem, changeCheckedItem, changeKey, changeValue, removeItem }) => {
    return (<>
        <h3>{title}</h3>

        <table className="block w-full border-collapse border border-slate-400 ">
            <thead className="block w-full">
                <tr className="grid grid-cols-12 w-full">
                    <th className="block col-span-1 px-1 border border-slate-300 text-left"></th>
                    <th className="block col-span-5 px-1 border border-slate-300 text-left">Key</th>
                    <th className="block col-span-6 px-1 border border-slate-300 text-left">Value</th>
                </tr>
            </thead>
            <tbody className="block w-full">
                {params.map(param => (
                    <tr key={param.id} className="group grid grid-cols-12 w-full">
                        <td className="flex justify-center items-center col-span-1 px-1 border border-slate-300 text-left">
                            <input
                                type="checkbox"
                                checked={param.checked}
                                onChange={(e) => changeCheckedItem(e, param.id)}
                            />
                        </td>

                        <td className={`
                    group
                    focus-within:bg-slate-200
                    block
                    col-span-5
                    px-1
                    border
                    border-slate-300
                    text-left
                `}>
                            <input
                                type='text'
                                className={`
                            block
                            w-full
                            hover:cursor-pointer
                            outline-none
                            bg-transparent
                        `}
                                value={param.key}
                                onChange={(e) => changeKey(e, param.id)}
                            />
                        </td>

                        <td className={`
                    relative
                    group
                    focus-within:bg-slate-200
                    block
                    col-span-6
                    px-1
                    border
                    border-slate-300
                    text-left
                `}>
                            <input
                                type='text'
                                className={`
                            block
                            w-full
                            hover:cursor-pointer
                            outline-none
                            bg-transparent
                        `}
                                value={param.value}
                                onChange={(e) => changeValue(e, param.id)}
                            />

                            <span
                                className={`
                            absolute
                            top-[50%]
                            -translate-y-1/2
                            left-[100%]
                            translate-x-del-space
                            font-medium
                            text-xs  
                            uppercase
                            opacity-0
                            pointer-events-none
                            select-none
                            group-hover:opacity-100
                            group-hover:pointer-events-auto
                            duration-300
                            hover:cursor-pointer
                        `}
                                onClick={() => removeItem(param.id)}
                            >
                                Del
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>

            <tfoot className="block w-full">
                <tr className="flex justify-end items-center w-full p-2">
                    <td
                        className={`
                    hover:cursor-pointer
                    text-xs
                    duration-150
                    text-[#1F509A]
                    hover:text-[#22177A]
                `}
                        onClick={addItem}
                    >
                        Додати елемент
                    </td>
                </tr>
            </tfoot>
        </table>
    </>)
}