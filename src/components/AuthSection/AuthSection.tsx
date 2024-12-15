import { useState } from "react";
import { authActions } from "../../redux/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../../services/customHooks";
import { jwtDecode } from "jwt-decode";

export type AuthSectionType = {

};

export const AuthSection: React.FC<AuthSectionType> = () => {
    const { prefix, token } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const [objectJSON, setObjectJSON] = useState('{}');
    const [isShow, setIsShow] = useState(false);
    
    const convertJWTToObject = () => {
        const isShown = !isShow;
        setIsShow(prev => !prev);
        
        convert(token, isShown);
    }

    const convert = (convToken: string, convIsShow: boolean) => {
        try 
        {
            if (convIsShow) {
                const obj = jwtDecode(convToken);
                
                setObjectJSON(JSON.stringify(obj, null, 2));
            } else {
                setObjectJSON('{}');
            }
        }
        catch {
            setObjectJSON('{ ERROR: JWT field isn\'t correct }')
        }
    }

    return (<>
        <h3>Authorization token</h3>

        <input
            type="text"
            placeholder="Write a token prefix"
            className="block p-1 border border-black w-full"
            value={prefix}
            onChange={(e) => dispatch(authActions.changePrefix(e.target.value))}
        />

        <br />

        <input
            type="text"
            placeholder="Write a token"
            className="block p-1 border border-black w-full"
            value={token}
            onChange={(e) => {dispatch(authActions.changeToken(e.target.value)); convert(e.target.value, isShow)}}
        />

        <label htmlFor="isShow" className="flex gap-2 items-center">
            <p>Show token's content (Only JWT)</p> 

            <input
                id="isShow"
                type="checkbox"
                className="block h-full"
                checked={isShow}
                onChange={convertJWTToObject}
            />
        </label>

        <textarea
            readOnly
            className="block pl-2 h-[200px] resize-none border border-black w-full"
            value={objectJSON}
        >
        </textarea>
    </>);
}