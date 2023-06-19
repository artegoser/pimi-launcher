import { HashRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact Component={Main} />
      </Routes>
    </HashRouter>
  )
}

export default App
