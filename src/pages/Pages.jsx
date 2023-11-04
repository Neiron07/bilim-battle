import {Routes, Route} from "react-router-dom";

// Pages
import Main from "./Main";
import Tournament from "./Tournament";
import Tournaments from "./Tournaments";
import Store from "./Store"
import Login from "./Login";
import User from "./User";
import Faq from "./FAQ";
// import ProfilePage from "./NewDesignUser";

export default function Pages() {
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/faq" element={<Faq/>}/>
            <Route path="/tournaments" element={<Tournaments/>}/>
            <Route path="/store" element={<Store/>}/>
            <Route path="/tournaments/:id" element={<Tournament/>}/>
            <Route path="/user/:id" element={<User/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    )
}