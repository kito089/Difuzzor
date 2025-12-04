import React, {createContext, useState, useContext} from "react"; // Session de react

const SessionContext = createContext();

export const SessionProvider = ({children}) => {
    const [tokens, setTokens] = useState(null); // Estado de tokens
    const [loading, setLoading] = useState(false); // Estado de carga inicial
    const [userauth, setUserAuth] = useState(false); // Estado para almacenar la autenticacion del usuario
    const [checkingAuth, setCheckingAuth] = useState(true); // Estado para verificar autenticacion

    return (
        <SessionContext.Provider value={{
            tokens, setTokens,
            loading, setLoading,
            userauth, setUserAuth,
            checkingAuth, setCheckingAuth
        }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);  