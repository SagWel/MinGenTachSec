import { createContext, useState, useEffect, useMemo } from "react";
import api from '../api/axios'

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)

    const fetchAuthContext = async () => {
        const urlContext = import.meta.env.VITE_URL_CONTEXT
        try {
            const res = await api.post(`${urlContext}`)

            setUser(res.data.user)
            setIsAuth(res.data.isAuth)
        } catch (err) {
            logout()
            console.error("Erreur lors de la récupèration des données du context : ", err);
            
        }
    }

    const fetchLogout = async () => {
        const urlLogout = import.meta.env.VITE_URL_LOGOUT
        try {
            const res = await api.post(`${urlLogout}`)

            setUser(res.data.user)
            setIsAuth(res.data.isAuth)
            console.log(res.data.message)
        } catch (error) {
            setIsAuth(false)
            setUser(false)
            setLoading(false)
            console.error("Erreur lors de la déconnexion : ", error)
        } 
    }

    const logout = () => { fetchLogout() }

    useEffect(() => {
        fetchAuthContext()
    }, [])

    const contextValue = useMemo (() => ({
        user,
        setUser,
        isAuth,
        setIsAuth,
        loading,
        setLoading,
        logout
    }), [user, logout, loading])

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}