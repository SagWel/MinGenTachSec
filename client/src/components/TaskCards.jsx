import { X, Pencil } from "lucide-react"

const TaskCards = ({ Task, submitDelete, submitEdit, randomColor }) => {
    return (
        <div className={`${randomColor} w-84 h-84 p-6 rounded-2xl shadow-lg task-card relative overflow-hidden group`}>
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    type="button"
                    onClick={submitEdit}
                    className="p-2 bg-white/80 hover:bg-white rounded-lg transition-all duration-200 hover:scale-110 shadow-md"
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={submitDelete}
                    className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-all duration-200 hover:scale-110 shadow-md"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            <h2 className="text-xl font-bold mb-3 pr-20 break-words">
                {Task.title}
            </h2>
            <p className="text-sm font-normal opacity-80 line-clamp-4 break-words">
                {Task.description}
            </p>
        </div>
    )
}

export default TaskCards