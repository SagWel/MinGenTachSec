import { X, Pencil } from "lucide-react"

const colors = ["#FFA29A", "#FAF2D9", "#B4F2E5", "#ABD8DF", "#5D6371", "#EEFD43"]
const randomIndex = Math.floor(Math.random() * colors.length)
const randomColor = colors[randomIndex]

const TaskCards = ({ Task, submitDelete, submitEdit }) => {
    return (
        <div className={`bg-color-${randomColor}`}>
            <h2>
                {Task.titre}
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