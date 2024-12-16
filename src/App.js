import { Route, Routes } from "react-router-dom";
import Editor from "./components/Editor";
import MakeRoom from "./components/MakeRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MakeRoom />} />
      <Route path="/editor/:roomID/:username" element={<Editor />} />
    </Routes>
  );
}

export default App;
