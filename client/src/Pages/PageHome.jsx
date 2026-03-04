import TaskCards from "../components/TaskCards"

const MockTasks = [
    {
        id: 1,
        titre: "First task",
        description: "trucs à faire"
    },
    // {
    //     id: 2,
    //     titre: "Second task",
    //     description: "trucs à faire"
    // },
    // {
    //     id: 3,
    //     titre: "Third task",
    //     description: "trucs à faire"
    // },
]

const PageHome = () => {
    return (
        <div className = "flex justify-around w-full">
            <div id="titres" className="text-white text-xl text-left">
                <ul id="listeTitres">
                    {MockTasks.map((task) => {
                        return (
                            <li key={task.id + 1}>
                                {task.titre}
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
            <div id="cardsContainer grid">
                {MockTasks.map((task) => (

                    <TaskCards key={task.id} Task={task} />
                )
                )}
            </div>
        </div>
    )
}

export default PageHome;