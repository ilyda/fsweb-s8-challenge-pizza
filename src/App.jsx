import { Routes, Route } from 'react-router-dom'
import Order from "./components/Order";
import Success from "./components/Success";
import Home from "./components/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={<Order />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  )
}

export default App
