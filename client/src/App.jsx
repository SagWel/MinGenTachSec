import { Routes, Route } from "react-router-dom"
import PageConnexions from "./Pages/PageConnexions"
import PageLogin from "./Pages/PageLogin"
import PageRegister from "./Pages/PageRegister"

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageConnexions />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/register" element={<PageRegister />} />
    </Routes>
  )
}

export default App
