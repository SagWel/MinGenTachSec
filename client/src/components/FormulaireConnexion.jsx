const FormulaireConnexion = () => {
    return (
        <div className="w-96 bg-[#FFA29A] rounded-2xl shadow-lg p-6 flex flex-col">

            <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">
                Connexion
            </h2>

            <form className="space-y-6 grow flex flex-col">

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        placeholder="Ex : exemple@exemple.com"
                        type="email"
                        className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-center"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Mot de passe
                    </label>
                    <input
                        placeholder="********"
                        aria-describedby="password-helper"
                        type="password"
                        className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-center"
                    />
                    <div id="password-helper" className="text-sm font-extralight flex flex-col">
                        <span>8 caractères minimum</span>
                        <span>1 majuscule</span>
                        <span>1 chiffre</span>
                        <span>1 caractère spécial</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Connexion
                </button>

            </form>
        </div>
    )
}

export default FormulaireConnexion