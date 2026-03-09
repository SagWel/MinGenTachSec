import TaskCards from "../components/TaskCards"
import api from '../api/axios'
import { useEffect, useState } from "react"
import { Plus } from 'lucide-react'
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
    const {user} = useAuth()
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
    tasks.forEach(() => {
        const cardColors = []
        const randomCardIndex = Math.floor(Math.random() * colors.length)
        const randomCardColor = colors[randomCardIndex]
        cardColors.push(randomCardColor)
    });
}, [tasks])

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
    },[urlTaskManagement, user])

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
        try {
            await api.put(`${urlTaskManagement}${currentId}`, data)
            setCurrentId(0)
            setDescription('')
            setTitle('')            
        } catch (error) {
            console.error("Erreur lors de la tentative de modification de la tache :", error );
            
        }
    }

    const handleOnSubmitAdd = async () => {
        // confirm("Voulez vous créer la tache ?")
        const data = JSON.stringify({
            title: title,
            description: description
        })
        try {
            await api.post(`${urlTaskManagement}${user.id}`, data)
            setDescription('')
            setTitle('')        
            
        } catch (error) {
            console.error("Erreur lors de la tentative d'ajout de la tache :", error );
        }
    }

    return (
        <div className = "flex justify-around w-full">
            <div id="titres" className="text-white text-xl text-left">
                <ul id="listeTitres">
                    {loading ? 
                    <div className="text-cyan-200 w-full h-full text-center flex justify-center items-center text-xl">
                        <p>
                            <span>Chargement ...</span>
                        </p>
                    </div> : 
                    tasks.map((task, index) => {
                        
                        return (
                            <li key={index}>
                                {task.title}
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
            <div id="cardsContainer">
                {loading ? 
                <div className="text-cyan-200 w-full h-full text-center flex justify-center items-center text-xl">
                    <p>
                        <span>Chargement ...</span>
                    </p>
                </div> : 
                <div className="size-full grid grid-cols-3" id="cards">
                    {tasks.map((task, index) => (
                        <TaskCards key={index} Task={task} randomColor={colors[index]} submitDelete={() => handleOnSubmitDelete(task.id)} submitEdit={() => handleOnClickEdit(task.id)}/>
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
            <div className={`${isOpenAdd} w-full max-w-2xl px-14 py-8 h-fit z-50 absolute bg-gray-300 rounded-2xl`}>
                <h2 className="mb-4 text-2xl">Nouvelle tache</h2>
                <form className="w-full h-fit">

                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Titre
                    </label>
                    <input
                    name="title" id="title" placeholder="Tache à effectuer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    className="my-4 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-center"/>

                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea placeholder="Informations de la tâche" id="content" name="content" maxLength={150} value={description} onChange={(e) => setDescription(e.target.value)} className=" mb-4 resize-none h-24 mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-center"/>

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