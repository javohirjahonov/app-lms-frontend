import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from "./notFound";
import Login from "./login";
import Cabinet from "./cabinet";
import ForgotPassword from "./forgot-password";
import SuccessLinkSent from "./successLinkSent";
import ResetPassword from "./reset-password";
import RoleList from "./roleList";
import AddRole from "./addRole";
import EditRole from "./editRole";


const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/cabinet" element={<Cabinet/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/success-link-sent" element={<SuccessLinkSent/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="/role" element={<RoleList/>}/>
                <Route path="/role/add" element={<AddRole/>}/>
                <Route path="/role/edit/:id" element={<EditRole />} />
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
