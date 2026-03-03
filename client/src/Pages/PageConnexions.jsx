import '../styles.css'
import FormulaireInscription from '../components/FormulaireInscription'
import { useState } from 'react'
import FormulaireConnexion from '../Components/FormulaireConnexion'

const PageConnexions = () => {
    const [loginRegister, setloginRegister] = useState("login")

    const handleOnclick = () => {
        if (loginRegister === "login") {
            setloginRegister("register")
        } else {setloginRegister("login")
        }
    }
    return (
        <>
            <div>
                {loginRegister === "login" ? <FormulaireConnexion /> : <FormulaireInscription />}
            </div>
            <button type='button' className="w-full max-w-[512px] mt-4 bg-blue-600 text-white py-8 rounded-full hover:bg-blue-700 transition"
                onClick={handleOnclick}>
                <span className='text-2xl'>{loginRegister === "login" ? "Registering" : "Login"}</span>
            </button>
<<<<<<< HEAD
        </>
)
=======
        </div>
    )
>>>>>>> origin
}

export default PageConnexions