import { Routes, Route } from "react-router-dom"
import PageConnexions from "./Pages/PageConnexions"
import PageLogin from "./Pages/PageLogin"
import PageRegister from "./Pages/PageRegister"
import PageHome from "./Pages/PageHome"

function App() {
  if (!isloggedIn) {
    return (
      <Routes>
        <Route path="/" element={<PageConnexions />} />
        <Route path="/login" element={<PageLogin />} />
        <Route path="/register" element={<PageRegister />} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/" element={<PageHome />} />
      </Routes>
    )
  }
}

export default App
