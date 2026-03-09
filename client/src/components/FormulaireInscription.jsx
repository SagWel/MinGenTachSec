import { useState } from "react"

const FormulaireInscription = ({onClickRegister}) => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isError, setIsError] = useState(false)

    const handleOnClick = (e) => {
        e.preventDefault()
        const data = JSON.stringify({
            username: username,
            email: email,
            password: password
        })        

        if (password.length >= 8 && password == confirmPassword) {
            setIsError(false)
            onClickRegister(data)
        } else {
            setIsError(true)
        }
    }

    const inpuClass = (hasError) => `mt-1 w-full rounded-md placeholder:text-center
    ${hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`

    return (
        <div className="w-96 bg-[#FAF2D9] rounded-2xl mt-70 shadow-lg p-6 flex flex-col">

            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Création de compte
            </h2>

            <form className="space-y-3">

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        placeholder="Pseudo"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className={inpuClass(false)}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        name="email" id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ex : exemple@exemple.com"
                        type="email"
                        className={inpuClass(false)}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Mot de passe
                    </label>
                    <input
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        type="password"
                        className={inpuClass(isError)}
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirmation mot de passe
                    </label>
                    <input
                    name="confirmPassword" id="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="********"
                        type="password"
                        className={inpuClass(isError)}
                    />
                </div>

                {isError && (
                    <p className="text-red-500 text-xs font-extralight text-center mt-2">
                        Les mots de passe ne correspondent pas
                    </p>
                )}

                <button
                onClick={handleOnClick}
                    type="submit"
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    S'inscrire
                </button>

            </form>
        </div>
    )
}

export default FormulaireInscription

