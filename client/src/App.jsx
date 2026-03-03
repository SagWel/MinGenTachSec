import PageConnexions from "./Pages/PageConnexions"
import PageHome from "./Pages/PageHome"
import { useState } from "react"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  if (!isLoggedIn) {
    return (
      <PageConnexions />
    )
  } else {
    return (
      <PageHome />
    )
  }
}

export default App
