import PageConnexions from "./Pages/PageConnexions"
import PageHome from "./Pages/PageHome"
import { useAuth } from './hooks/useAuth'
import { StickyNote } from 'lucide-react'

function App() {

  const { isAuth } = useAuth()

  return (
    <div className="flex items-center justify-center relative flex-col 
        size-full text-center gap-20">
      <header className='absolute right-auto top-6 animate-fade-in'>
        <div className='flex items-center gap-3 text-gray-50'>
          <StickyNote className='w-10 h-10' />
          <h1 className='text-5xl font-bold bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 bg-clip-text text-transparent'>
            Sticky Pocket
          </h1>
        </div>
      </header>
      {isAuth ? <PageHome /> : <PageConnexions />}
    </div>
  )
}

export default App
