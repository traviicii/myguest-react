import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {

    const [clients, setClients] = useState([])

    const myvalues = {
        clients,
        setClients
    }

  return (
    <GlobalContext.Provider value={myvalues}>
        {children}
    </GlobalContext.Provider>
  )
}
export default GlobalContextProvider