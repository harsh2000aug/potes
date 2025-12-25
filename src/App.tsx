import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Dashboard from "./components/Dashboard";
import Directory from "./components/Directory";
import CreateContact from "./components/CreateContact";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import CreateNote from "./components/CreateNote.jsx";
import SearchResult from "./components/SearchResult";
import OpenProfile from "./components/OpenProfile";
import AllNotes from "./components/AllNotes";
import EditNote from "./components/EditNote";
import EditProfile from "./components/EditProfile";
import UserProfile from "./components/UserProfile";
import CreateSingleNote from "./components/CreateSingleNote";
import Forgot from "./screens/Forgot";
import EditContact from "./components/EditContact";
import Privacy from "./components/Privacy";
import DeleteAccount from "./components/DeleteAccount";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("accessToken")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const ProtectedLayout = () => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  };

  const AuthLayout = () => {
    if (isLoggedIn) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/create-contact" element={<CreateContact />} />

          <Route path="/privacy" element={<Privacy />} />

          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/profile" element={<OpenProfile />} />
          <Route path="/notes" element={<AllNotes />} />
          <Route path="/edit-note" element={<EditNote />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/create-a-note" element={<CreateSingleNote />} />
          <Route path="/edit-contact" element={<EditContact />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
