import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        //go backend
        axios.get('http://localhost:8085/api/auth/send-link-forgot-password?email=' + email
        ).then(res => {
            navigate('/success-link-sent')
        }).catch(err => {
            toast.error(err.response.data.errors[0].msg);
        })
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card p-4 shadow" style={{width: '100%', maxWidth: '400px'}}>
                <h2 className="text-center mb-4">Forgot password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    <Link to={"/login"}>Login page</Link>

                    <button type="submit" className="btn btn-primary w-100">Forgot</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
