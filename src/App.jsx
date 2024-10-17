import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import './App.css'
import NotAuthenticated from './NotAuthenticated';


function App() {

  const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Your logic to check authentication
  };

  return (
    <>
      <Router>
        <div>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route
              path="/"
              element={isAuthenticated() ? <Navigate to="/tasks" /> : <Navigate to="/login" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/tasks"
              element={
                <NotAuthenticated>
                  <Home />
                </NotAuthenticated>
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
