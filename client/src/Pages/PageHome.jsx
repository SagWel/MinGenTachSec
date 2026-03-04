import TaskCards from "../components/TaskCards"
import api from '../api/axios'
import { useEffect, useState } from "react"
import { Plus } from 'lucide-react'

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
    const urlTaskManagement = import.meta.env.VITE_URL_TASKMANAGEMENT

    const [isOpenEdit, setIsOpenEdit] = useState("hidden")
    const [isOpenAdd, setIsOpenAdd] = useState("hidden")
    const [currentId, setCurrentId] = useState(0)
    const [tasks, setTasks] = useState(null)
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true)
            try {
                const res = await api.get(`${urlTaskManagement}`)
                const data = await res.json()

                setTasks(data)
                setLoading(false)
            } catch (err) {
                console.error('Erreur lors de la récupérations des tasks :', err)
            }
        }

    fetchTasks()
    },[urlTaskManagement])

    const handleOnSubmitDelete = async (id) => {
        setCurrentId(id)
        try {
            confirm("Voulez vous vraiment supprimer la tache ?")
            await api.delete(`${urlTaskManagement}${currentId}`)
            setCurrentId(0)
        } catch (error) {
            console.error(`Erreur lors de la suppression : ${error}`);
        }
    }

    const handleOnClickEdit = (id) => {
        setIsOpenEdit("block")
        setCurrentId(id)
        const currentTaskIndex = tasks.foundIndex(task => task.id === id)
        setDescription(tasks[currentTaskIndex].description)
        setTitle(tasks[currentTaskIndex].title)
    }

    const handleOnClickAdd = () => {
        setIsOpenAdd("block")
    }

    const handleOnSubmitEdit = async () => {
        confirm("Voulez vous faire la modification ?")
        const data = JSON.stringify({
            title: title,
            description: description
        })
        await api.put(`${urlTaskManagement}${currentId}`, data)
        setCurrentId(0)
        setDescription('')
        setTitle('')
    }

    const handleOnSubmitAdd = async () => {
        confirm("Voulez vous créer la tache ?")
        const data = JSON.stringify({
            title: title,
            description: description
        })
        await api.post(`${urlTaskManagement}`, data)
        setDescription('')
        setTitle('')        
    }

    return (
        <div className = "flex justify-around w-full">
            <div id="titres" className="text-white text-xl text-left">
                <ul id="listeTitres">
                    {loading || !tasks ? 
                    <div className="text-cyan-200 w-full h-full text-center flex justify-center items-center text-xl">
                        <p>
                            <span>Chargement ...</span>
                        </p>
                    </div> : 
                    tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                {task.titre}
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
            <div id="cardsContainer">
                {loading || !tasks ? 
                <div className="text-cyan-200 w-full h-full text-center flex justify-center items-center text-xl">
                    <p>
                        <span>Chargement ...</span>
                    </p>
                </div> : 
                <div className="size-full grid grid-cols-3">
                    {tasks.map((task) => (
                        <TaskCards key={task.id} Task={task} submitDelete={() => handleOnSubmitDelete(task.id)} submitEdit={() => handleOnClickEdit(task.id)}/>
                    ))}
                    <button className={`${randomColor} flex justify-center items-center w-84 h-84 p-7 font-bold`}
                    onClick={handleOnClickAdd}>
                        <Plus />
                    </button>
                </div>
                }
            </div>
            <div className={`${isOpenEdit} w-full max-w-lg h-fit z-50 absolute top-1/2 right-1/2`}>
                <h2>Editer la tache</h2>
                <form className="w-full h-fit">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Tache à effectuer
                    </label>
                    <input 
                    name="title" id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-center"/>

                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Infos de la taches :
                    </label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="content" name="content" maxLength={150} className="resize-none h-24 mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>

                    <button type="submit"
                    className="w-full mt-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    onClick={handleOnSubmitEdit}>
                        Modifier
                    </button>
                </form>
            </div>
            <div className={`${isOpenAdd} w-full max-w-lg h-fit z-50 absolute top-1/2 right-1/2`}>
                <h2>Nouvelle tache</h2>
                <form className="w-full h-fit">

                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Tache à effectuer
                    </label>
                    <input 
                    name="title" id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-center"/>

                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Infos de la taches :
                    </label>
                    <textarea id="content" name="content" maxLength={150} value={description} onChange={(e) => setDescription(e.target.value)} className="resize-none h-24 mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>

                    <button type="submit"
                    className="w-full mt-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    onClick={handleOnSubmitAdd}>
                        Ajouter
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PageHome;