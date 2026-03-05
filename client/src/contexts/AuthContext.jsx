import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import api from '../api/axios'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)

    const urlContext = import.meta.env.VITE_URL_CONTEXT
    const urlLogout = import.meta.env.VITE_URL_LOGOUT
    

    const logout = useCallback(() => {
        const fetchLogout = async () => {
        try {
            const res = await api.post(`${urlLogout}`)
            
            setUser(res.data.user)
            setIsAuth(res.data.isAuth)
        } catch (error) {
            setIsAuth(false)
            setUser(false)
            setLoading(false)
            console.error("Erreur lors de la déconnexion : ", error)
        } 
    }
         fetchLogout() 
        }, [urlLogout])

    useEffect(() => {
        const fetchAuthContext = async () => {
        try {
            const res = await api.post(`${urlContext}`)

            if (!res.ok) {
                throw new Error(`Erreur HTTP: ${res.status}`)
            }

            setUser(res.data.user)
            setIsAuth(res.data.isAuth)
        } catch (err) {
            logout()
            console.error("Erreur lors de la récupèration des données du context : ", err);
            
        }
    }
        fetchAuthContext()
    }, [urlContext, logout])

    const contextValue = useMemo (() => ({
        user,
        setUser,
        isAuth,
        setIsAuth,
        loading,
        logout
    }), [user, logout, loading, isAuth])

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}