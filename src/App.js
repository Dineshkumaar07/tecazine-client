import Form from "./pages/Form";
import Viewer from "./pages/Viewer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/submissions" element={<Viewer />} />
      </Routes>
    </Router>
  );
}

export default App;
