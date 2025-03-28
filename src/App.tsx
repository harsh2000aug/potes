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
import { useState } from "react";
import TopArea from "./reusable/TopArea";
import Sidebar from "./reusable/Sidebar";

function App() {
  const isLoggedIn = !!localStorage.getItem("accessToken");

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
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/profile" element={<OpenProfile />} />
          <Route path="/notes" element={<AllNotes />} />
          <Route path="/edit-note" element={<EditNote />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/create-a-note" element={<CreateSingleNote />} />
          <Route path="/edit-contact" element={<EditContact />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
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
