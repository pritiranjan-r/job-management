import { SignUpForm } from "./components/auth/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { SignInForm } from "./components/auth/SignIn";
import Header from "./components/Header";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./routes/Home";
import useUser from "./hooks/useUser";

function App() {
  const user = useUser();
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
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
