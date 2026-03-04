import PageConnexions from "./Pages/PageConnexions"
import PageHome from "./Pages/PageHome"
import { useState } from "react"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
      <div className="flex items-center justify-center relative flex-col 
        size-full text-center gap-20">
          <h1 className='text-gray-50 text-4xl absolute right-auto top-20'>Sticky Pocket</h1>
          {isLoggedIn ? <PageHome /> : <PageConnexions />}          
        </div>
    )
  } 

export default App
