import '../styles.css'
import FormulaireInscription from '../components/FormulaireInscription'
import { useState } from 'react'
import FormulaireConnexion from '../Components/FormulaireConnexion'
import api from '../api/axios'

const PageConnexions = () => {
    const [loginRegister, setloginRegister] = useState("login")
    const urlLogin = import.meta.env.VITE_URL_LOGIN
    const urlRegister = import.meta.env.VITE_URL_REGISTER

    const handleOnclickSwitch = () => {
        if (loginRegister === "login") {
            setloginRegister("register")
        } else {setloginRegister("login")
        }
    }

    const handleOnSubmitLogin = async (data) => {

        try {
            await api.get(`${urlLogin}`, data)
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
        }
    }

    const handleOnSubmitRegister = async (data) => {
        try {
            await api.post(`${urlRegister}`, data)
        } catch (error) {
            console.error("Erreur lors de l'enregistrement : ", error);
            
        }
    }

    return (
        <div className='h-full flex flex-col items-center justify-between'>
            {loginRegister === "login" ? <FormulaireConnexion onClickLogin={handleOnSubmitLogin}/> : <FormulaireInscription onClickRegister={handleOnSubmitRegister}/>}
            
            <button type='button' className="w-full max-w-lg mt-4 bg-blue-600 text-white py-8 rounded-full hover:bg-blue-700 transition"
                onClick={handleOnclickSwitch}>
                <span className='text-2xl'>{loginRegister === "login" ? "Registering" : "Login"}</span>
            </button>
        </div>
)
}

export default PageConnexions