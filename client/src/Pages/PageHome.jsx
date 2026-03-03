import TaskCards from "../components/TaskCards"

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

const PageHome = () => {
    return (
        <div>
            <div id="titres">
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
            <div id="cardsContainer">
                {MockTasks.map((task) => {
                    <TaskCards key={task.id} Task={task} />
                })}
            </div>
        </div>
    )
}

export default PageHome;