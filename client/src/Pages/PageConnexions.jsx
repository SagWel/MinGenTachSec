import '../styles.css'
import FormulaireInscription from '../components/FormulaireInscription'
import { useState } from 'react'
import FormulaireConnexion from '../components/FormulaireConnexion'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftRight } from 'lucide-react'

const PageConnexions = () => {

    const navigate = useNavigate()

    const [loginRegister, setloginRegister] = useState("login")

    const urlLogin = import.meta.env.VITE_URL_LOGIN
    const urlRegister = import.meta.env.VITE_URL_REGISTER

    const handleOnclickSwitch = () => {
        if (loginRegister === "login") {
            setloginRegister("register")
        } else {
            setloginRegister("login")
        }
    }

    const handleOnSubmitLogin = async (data) => {

        try {
            await api.post(`${urlLogin}`, data)
            navigate(0)
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    }

    const handleOnSubmitRegister = async (data) => {

        try {
            await api.post(`${urlRegister}`, data)
            navigate(0)
        } catch (error) {
            console.error("Erreur lors de l'enregistrement : ", error);

        }
    }

    return (
        <div className='h-full flex flex-col items-center justify-between animate-fade-in'>
            {loginRegister === "login" ? <FormulaireConnexion onClickLogin={handleOnSubmitLogin} /> : <FormulaireInscription onClickRegister={handleOnSubmitRegister} />}

            <button
                type='button'
                className="w-full max-w-lg mt-4 mb-8 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-6 px-8 rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 group"
                onClick={handleOnclickSwitch}
            >
                <div className="flex items-center justify-center gap-3">
                    <ArrowLeftRight className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                    <span className='text-2xl font-bold'>{loginRegister === "login" ? "Créer un compte" : "Se connecter"}</span>
                </div>
            </button>
        </div>
    )
}

export default PageConnexions