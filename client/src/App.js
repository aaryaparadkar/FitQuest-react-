import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormPage from './pages/FormPage';
import Signin from './pages/Signin'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Sign" element={<Signin />} />
          <Route path="/Form" element={<FormPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

