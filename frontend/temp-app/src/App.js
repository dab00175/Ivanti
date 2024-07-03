import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Temperatures from './Temperatures';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Temperatures />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
