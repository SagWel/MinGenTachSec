import { Routes, Route } from "react-router-dom"
import PageConnexions from "./Pages/PageConnexions"
import PageHome from "./Pages/PageHome"
import { useState } from "react"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/" element={<PageConnexions />} />
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
