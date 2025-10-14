import React, {createContext, useState, useContext} from "react"; // Session de react

const SessionContext = createContext();

export const SessionProvider = ({children}) => {
    const [tokens, setTokens] = useState(null); // Estado de tokens
    const [loading, setLoading] = useState(true); // Estado de carga inicial
    const [userinfo, setUserInfo] = useState(null); // Estado para almacenar la informacion del usuario
    const [checkingAuth, setCheckingAuth] = useState(true); // Estado para verificar autenticacion

    return (
        <SessionContext.Provider value={{
            tokens, setTokens,
            loading, setLoading,
            userinfo, setUserInfo,
            checkingAuth, setCheckingAuth
        }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);  