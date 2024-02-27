import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormPage from './pages/FormPage';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import XYZ from './pages/xyz';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Sign" element={<Signin />} />
          <Route path="/Form" element={<FormPage />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/xyz" element={<XYZ/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

