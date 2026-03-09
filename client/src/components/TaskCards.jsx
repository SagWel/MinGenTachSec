import { X, Pencil } from "lucide-react"

const TaskCards = ({ Task, submitDelete, submitEdit, randomColor }) => {
    return (
        <div className={`${randomColor} w-84 h-84 p-7 font-bold`} >
            <h2>
                {Task.title}
            </h2>
            <p>
                {Task.description}
            </p>
            <button type="submit" onClick={submitDelete}>
                <X />
            </button>
            <button type="submit" onClick={submitEdit}>
                <Pencil />
            </button>
        </div >
    )
}

export default TaskCards