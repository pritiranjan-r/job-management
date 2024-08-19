import { SignUpForm } from "./components/auth/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { SignInForm } from "./components/auth/SignIn";
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./routes/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/sign_in" element={<SignInForm />} />
        <Route path="/sign_up" element={<SignUpForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
