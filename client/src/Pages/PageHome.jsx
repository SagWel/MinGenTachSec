import TaskCards from "../components/TaskCards"
import api from '../api/axios'
import { useEffect, useState } from "react"
import { Plus, X, Loader2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from "react-router-dom"

const MockTasks = [
    {
        id: 1,
        titre: "First task",
        description: "trucs à faire"
    },
]

const colors = ["bg-[#FFA29A] text-black", "bg-[#FAF2D9] text-black", "bg-[#b4f2e5] text-black", "bg-[#ABD8DF] text-black", "bg-[#8495bd] text-white", "bg-[#EEFD43] text-black"]
const randomIndex = Math.floor(Math.random() * colors.length)
const randomColor = colors[randomIndex]


const PageHome = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const urlTaskManagement = import.meta.env.VITE_URL_TASKMANAGEMENT

    const [isOpenEdit, setIsOpenEdit] = useState("hidden")
    const [isOpenAdd, setIsOpenAdd] = useState("hidden")
    const [currentId, setCurrentId] = useState(0)
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true)

            try {
                const res = await api.get(`${urlTaskManagement}${user.id}`)

                if (res.data) {

                    setTasks(res.data)

                }
                setLoading(false)
            } catch (err) {
                console.error('Erreur lors de la récupérations des tasks :', err)
            }
        }

        fetchTasks()
    }, [urlTaskManagement, user])

    const handleOnSubmitDelete = async (id) => {
        try {
            confirm("Voulez vous vraiment supprimer la tache ?")
            await api.delete(`${urlTaskManagement}${id}`)
            navigate(0)
        } catch (error) {
            console.error(`Erreur lors de la suppression : ${error}`);
        }
    }

    const handleOnClickEdit = (id) => {
        setIsOpenEdit("block")
        setCurrentId(id)
        const currentTaskIndex = tasks.findIndex(task => task.id === id)
        setDescription(tasks[currentTaskIndex].description)
        setTitle(tasks[currentTaskIndex].title)
    }

    const handleOnClickAdd = () => {
        setIsOpenAdd("block")
    }

    const handleOnCloseEdit = () => {
        setIsOpenEdit("hidden")
        setCurrentId(0)
        setDescription('')
        setTitle('')
    }

    const handleOnCloseAdd = () => {
        setIsOpenAdd("hidden")
        setDescription('')
        setTitle('')
    }

    const handleOnSubmitEdit = async (e) => {
        e.preventDefault()
        if (!title.trim()) return

        const data = JSON.stringify({
            title: title,
            description: description
        })
        try {
            await api.put(`${urlTaskManagement}${currentId}`, data)
            setCurrentId(0)
            setDescription('')
            setTitle('')
            setIsOpenEdit("hidden")
            navigate(0)
        } catch (error) {
            console.error("Erreur lors de la tentative de modification de la tache :", error);

        }
    }

    const handleOnSubmitAdd = async (e) => {
        e.preventDefault()
        if (!title.trim()) return

        const data = JSON.stringify({
            title: title,
            description: description
        })
        try {
            await api.post(`${urlTaskManagement}${user.id}`, data)
            setDescription('')
            setTitle('')
            setIsOpenAdd("hidden")
            navigate(0)
        } catch (error) {
            console.error("Erreur lors de la tentative d'ajout de la tache :", error);
        }
    }

    return (
        <div className="flex justify-around w-full px-8 animate-fade-in">
            <div id="cardsContainer" className="w-full max-w-7xl">
                {loading ?
                    <div className="w-full h-96 flex flex-col justify-center items-center text-xl gap-4">
                        <Loader2 className="w-12 h-12 text-cyan-300 animate-spin" />
                        <p className="text-cyan-200 font-semibold">Chargement de vos tâches...</p>
                    </div> :
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                        {tasks.map((task, index) => (
                            <TaskCards
                                key={task.id}
                                Task={task}
                                randomColor={colors[index % colors.length]}
                                submitDelete={() => handleOnSubmitDelete(task.id)}
                                submitEdit={() => handleOnClickEdit(task.id)}
                            />
                        ))}
                        <button
                            className="bg-gradient-to-br from-purple-400 to-indigo-500 text-white flex flex-col justify-center items-center w-full h-84 min-h-[300px] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                            onClick={handleOnClickAdd}
                        >
                            <Plus className="w-16 h-16 mb-3 group-hover:rotate-90 transition-transform duration-300" />
                            <span className="text-lg font-semibold">Nouvelle tâche</span>
                        </button>
                    </div>
                }
            </div>

            {/* Modal Edit */}
            {isOpenEdit === "block" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay animate-fade-in" onClick={handleOnCloseEdit}>
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-4 animate-slide-in" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">✏️ Éditer la tâche</h2>
                            <button
                                onClick={handleOnCloseEdit}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                        <form className="space-y-4" onSubmit={handleOnSubmitEdit}>
                            <div>
                                <label htmlFor="edit-title" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Titre de la tâche
                                </label>
                                <input
                                    name="title"
                                    id="edit-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                    placeholder="Ma tâche..."
                                />
                            </div>

                            <div>
                                <label htmlFor="edit-content" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    id="edit-content"
                                    name="content"
                                    maxLength={150}
                                    rows={4}
                                    className="resize-none w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                                    placeholder="Détails de la tâche..."
                                />
                                <p className="text-xs text-gray-500 mt-1 text-right">{description.length}/150 caractères</p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleOnCloseEdit}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                >
                                    Modifier
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Add */}
            {isOpenAdd === "block" && (
                <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay animate-fade-in" onClick={handleOnCloseAdd}>
                    <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg mx-4 animate-slide-in" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">➕ Nouvelle tâche</h2>
                            <button
                                onClick={handleOnCloseAdd}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                        <form className="space-y-4" onSubmit={handleOnSubmitAdd}>
                            <div>
                                <label htmlFor="add-title" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Titre de la tâche
                                </label>
                                <input
                                    name="title"
                                    id="add-title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                                    placeholder="Ma tâche..."
                                />
                            </div>

                            <div>
                                <label htmlFor="add-content" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="add-content"
                                    name="content"
                                    maxLength={150}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    className="resize-none w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                                    placeholder="Détails de la tâche..."
                                />
                                <p className="text-xs text-gray-500 mt-1 text-right">{description.length}/150 caractères</p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleOnCloseAdd}
                                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-semibold"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                >
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PageHome;