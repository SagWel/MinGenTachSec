const MockTasks = [
    {
        titre: "First task",
        description: "trucs à faire"
    },
    {
        titre: "First task",
        description: "trucs à faire"
    },
    {
        titre: "First task",
        description: "trucs à faire"
    },
    {
        titre: "First task",
        description: "trucs à faire"
    },
    {
        titre: "First task",
        description: "trucs à faire"
    },
    {
        titre: "First task",
        description: "trucs à faire"
    },
    {
        titre: "First task",
        description: "trucs à faire"
    },
    {
        titre: "First task",
        description: "trucs à faire"
    },
    {
        titre: "First task",
        description: "trucs à faire"
    },
    {
        titre: "First task",
        description: "trucs à faire"
    },
    {
        titre: "First task",
        description: "trucs à faire"
    },
    {
        titre: "First task",
        description: "trucs à faire"
    },
]

const PageHome = () => {
    return (
        <div>
            <div id="titres">
                <ul id="listeTitres">
                    {MockTasks.map((task)=>{
                        return (
                        <li>
                            {task.titre}
                        </li>
                        )
                    })
                    }
                </ul>
            </div>
            <div id= "cardsContainer">

            </div>
        </div>
    )
}

export default PageHome;