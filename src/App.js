import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotFound from "./notFound";
import Login from "./login";
import Cabinet from "./cabinet";
import ForgotPassword from "./forgot-password";
import SuccessLinkSent from "./successLinkSent";
import ResetPassword from "./reset-password";


const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/cabinet" element={<Cabinet/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/success-link-sent" element={<SuccessLinkSent/>}/>
                <Route path="/reset-password" element={<ResetPassword/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
