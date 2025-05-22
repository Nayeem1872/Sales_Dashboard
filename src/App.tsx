import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login";
import { Toaster } from "react-hot-toast";
import DashboardPage from "./pages/Dashboard";
import FAQSettingsPage from "./pages/Faq";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/faq" element={<FAQSettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
