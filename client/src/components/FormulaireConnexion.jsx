const FormulaireConnexion = () => {
    return (
        <div className="w-96 bg-[#FFA29A] rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Connexion
            </h2>

            <form className="space-y-3">

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    S’inscrire
                </button>

            </form>
        </div>
    )
}

export default FormulaireConnexion