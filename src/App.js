import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AddBookPage from './pages/AddBookPage';
import RequestsPage from './pages/RequestsPage';
import Navbar from './layout/Navbar';
import { Toaster } from 'react-hot-toast';
import { AboutPage } from './pages/AboutPage';
import { CreditsBanner } from './pages/CreditsBanner';
// importing api config
import './config/api';
import ForgotPasswordPage from './pages/ForgotPassword';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="mx-auto max-w-7xl">
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3000
            }}
          />
          <Navbar />
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/add-book/:id" element={<AddBookPage />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <CreditsBanner />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
