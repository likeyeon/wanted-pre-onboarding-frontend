import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
