import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventsPage from './Components/Event/EventsPage';
import Register from './Components/Register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
       
        <Route path="/admin-page" element={<div><EventsPage/></div>} />
      </Routes>
    </Router>
  );
}

export default App;
