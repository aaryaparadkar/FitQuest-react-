import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormPage from './pages/FormPage';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import ProfilePage from './pages/Profile';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Sign" element={<Signin />} />
          <Route path="/Form" element={<FormPage />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/Profile" element={<ProfilePage />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
