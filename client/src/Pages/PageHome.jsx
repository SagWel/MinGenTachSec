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
    {
        id: 2,
        titre: "First task",
        description: "trucs à faire"
    },
]

const colors = ["#FFA29A", "#FAF2D9", "#B4F2E5", "#ABD8DF", "#5D6371", "#EEFD43"]
const randomIndex = Math.floor(Math.random() * colors.length)
const randomColor = colors[randomIndex]

const PageHome = () => {
    const urlTaskManagement = import.meta.env.VITE_URL_TASKMANAGEMENT

    const [isOpen, setIsOpen] = useState("hidden")
    const [currentId, setCurrentId] = useState(0)
    const [tasks, setTasks] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const [description, setDescription] = useState('')

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
        setIsOpen("block")
        setCurrentId(id)
        const taskIndex = tasks.foundIndex(task => task.id === id)
        setDescription(tasks[taskIndex].description)
    }

    const handleOnSubmitEdit = async (data) => {
        confirm("Voulez vous faire la modification ?")
        await api.put(`${urlTaskManagement}${currentId}`, data)
        setCurrentId(0)
    }

    return (
        <div>
            <div id="titres">
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
                <div>
                    {tasks.map((task) => (
                        <TaskCards key={task.id} Task={task} submitDelete={() => handleOnSubmitDelete(task.id)} submitEdit={() => handleOnClickEdit(task.id)}/>
                    ))}
                    <button className={`bg-color-${randomColor} flex justify-center items-center`}>
                        <Plus />
                    </button>
                </div>
                }
            </div>
            <div className={`${isOpen} w-full max-w-lg h-fit`}>
                <h2>Editer la tache</h2>
                <form className="w-full h-fit">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Infos de la taches :
                    </label>
                    <textarea value={description} id="content" name="content" maxLength={150} className="resize-none h-24 mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"/>

                    <button type="submit"
                    className="w-full mt-auto bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    onClick={handleOnSubmitEdit}>
                        Modifier
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PageHome;