import { useState } from "react"
import { LogIn } from "lucide-react"

const FormulaireConnexion = ({ onClickLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const data = JSON.stringify({
            email: email,
            password: password
        })
        onClickLogin(data)
    }

    return (
        <div className="w-96 bg-gradient-to-br from-[#FFA29A] to-[#FFB8B1] rounded-3xl shadow-2xl p-8 flex mt-80 flex-col animate-slide-in">

            <div className="flex items-center justify-center gap-2 mb-6">
                <LogIn className="w-6 h-6 text-gray-800" />
                <h2 className="text-2xl font-bold text-gray-800 text-center">
                    Connexion
                </h2>
            </div>

            <form className="space-y-4">

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                        Email
                    </label>
                    <input
                        name="email" id="email"
                        placeholder="exemple@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white/80 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all placeholder:text-gray-400 text-gray-800"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                        Mot de passe
                    </label>
                    <input
                        name="password" id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-describedby="password-helper"
                        type="password"
                        className="mt-1 w-full px-4 py-3 rounded-xl border-2 border-transparent bg-white/80 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all placeholder:text-gray-400 text-gray-800"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    onClick={handleOnSubmit}
                >
                    Se connecter
                </button>

            </form>
        </div>
    )
}

export default FormulaireConnexion