import './App.css';
import EmployeeComponent from './components/EmployeeComponent';
import Footer from './components/Footer';
import Header from './components/Header';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import bgImage from './assets/bg.jpg';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen text-gray-800">
        <Header />

        <main
          className="flex-grow px-4 py-6 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<EmployeeComponent />} />
            <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}


export default App;
