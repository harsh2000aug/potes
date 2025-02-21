import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Dashboard from "./components/Dashboard";
import Directory from "./components/Directory";
import CreateContact from "./components/CreateContact";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import CreateNote from "./components/CreateNote";
import SearchResult from "./components/SearchResult";
import OpenProfile from "./components/OpenProfile";
import AllNotes from "./components/AllNotes";
import EditNote from "./components/EditNote";
import EditProfile from "./components/EditProfile";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/create-contact" element={<CreateContact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/create-note" element={<CreateNote />} />
        <Route path="/search-result" element={<SearchResult />} />
        <Route path="/profile" element={<OpenProfile />} />
        <Route path="/all-notes" element={<AllNotes />} />
        <Route path="/edit-note" element={<EditNote />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/user-profile" element={<UserProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
