import '../styles.css'
import FormulaireInscription from '../Components/FormulaireInscription'
import { useState } from 'react'
// import FormulaireConnexion from '../Components/FormulaireConnexion'

const PageConnexions = () => {
    const [loginRegister, setloginRegister] = useState("login")

    const handleOnclick = () => {
        if (loginRegister === "login") {
            setloginRegister("register")
        } else {
            setloginRegister("login")
        }
    }
    return (
        <div className="flex items-center justify-center flex-col 
        size-full text-center mt-12 gap-30">
            <h1 className='text-gray-50 text-4xl'>Sticky Pocket</h1>
            <div>
                {loginRegister === "login" ? <div></div> : <FormulaireInscription />}
            </div>
            <button type='button'className="w-full max-w-[512px] mt-4 bg-blue-600 text-white py-8 rounded-full hover:bg-blue-700 transition"
            onClick={handleOnclick}>
                <span className='text-2xl'>{loginRegister === "login" ? "Registering" : "Login"}</span>
            </button>
         </div>
)
}

export default PageConnexions