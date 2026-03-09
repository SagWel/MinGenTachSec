import PageConnexions from "./Pages/PageConnexions"
import PageHome from "./Pages/PageHome"
import { useAuth } from './hooks/useAuth'
import api from "./api/axios"
import { useNavigate } from "react-router-dom"

function App() {

  const { isAuth, setIsAuth } = useAuth()
  const navigate = useNavigate()

  const logout = async () => {
    const urlLogout = import.meta.env.VITE_URL_LOGOUT
    try {
      await api.post(`${urlLogout}`)
      setIsAuth(false)
      navigate(0)
    } catch (error) {
      console.error('Erreur lors de la deconnexion : ', error)
    }
  }

    return (
      <div className="flex items-center justify-between relative flex-col 
        h-full text-center pt-12">
          <h1 className='text-gray-50 text-4xl'>Sticky Pocket</h1>
          <div className="flex items-center justify-center size-full">
          {isAuth ? <PageHome /> : <PageConnexions />}
          </div>
          {isAuth && <button onClick={logout} className="absolute top-0 right-0">Deconnexion</button>}          
        </div>
    )
  } 

export default App
