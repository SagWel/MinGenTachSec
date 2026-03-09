import { X, Pencil } from "lucide-react"

const TaskCards = ({ Task, submitDelete, submitEdit, randomColor }) => {
    return (
        <div className={`${randomColor} w-84 h-84 p-7 relative font-bold rounded-br-2xl`} >
            <h2>
                {Task.title}
            </h2>
            <p>
                {Task.description}
            </p>
            <button type="submit" className='absolute top-0 right-0 m-1' onClick={submitDelete}>
                <X />
            </button>
            <button type="submit" className='absolute bottom-0 right-0 m-1' onClick={submitEdit}>
                <Pencil />
            </button>
        </div >
    )
}

export default TaskCards