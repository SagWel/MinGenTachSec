import { X, Pencil } from "lucide-react"

const colors = ["bg-[#FFA29A] text-black", "bg-[#FAF2D9] text-black", "bg-[#b4f2e5] text-black", "bg-[#ABD8DF] text-black", "bg-[#8495bd] text-white", "bg-[#EEFD43] text-black"]
// const colors = ["red-600", "emerald-600", "slate-600", "indigo-600"]
const randomIndex = Math.floor(Math.random() * colors.length)
console.log(randomIndex);

const randomColor = colors[randomIndex]
console.log(randomColor);


const TaskCards = ({ Task }) => {
    return (
        <div className={`${randomColor} w-84 h-84 p-7 font-bold`} >
            <h2>
                {Task.titre}
            </h2>
            <p>
                {Task.description}
            </p>
            <button>
                <X />
            </button>
            <button>
                <Pencil />
            </button>
        </div >
    )
}

export default TaskCards