import PageConnexions from "./Pages/PageConnexions"
import PageHome from "./Pages/PageHome"
import { useAuth } from './hooks/useAuth'

function App() {

  const { isAuth } = useAuth()

    return (
      <div className="flex items-center justify-center relative flex-col 
        size-full text-center gap-20">
          <h1 className='text-gray-50 text-4xl absolute right-auto top-20'>Sticky Pocket</h1>
          {isAuth ? <PageHome /> : <PageConnexions />}          
        </div>
    )
  } 

export default App
