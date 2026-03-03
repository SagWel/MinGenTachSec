import { Routes, Route } from "react-router-dom"
import PageConnexions from "./Pages/PageConnexions"

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageConnexions />} />
    </Routes>
  )
}

export default App
