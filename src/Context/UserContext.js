import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    
    const getUserFromLS = () => {
        const found = localStorage.getItem('myGuest_user');
        if (found){
            return JSON.parse(found)
        }
        return {}
    }

    const [user, setUser] = useState(getUserFromLS);

    const navigate = useNavigate()
    const logMeOut = () => {
        setUser({})
        localStorage.removeItem('myGuest_user')
        navigate('/')
      };

    const myValues = {
        user, 
        setUser,
        logMeOut
    };
    
    return (
        <UserContext.Provider value={myValues}>
            { children }

        </UserContext.Provider>
    )
};
export default UserContextProvider