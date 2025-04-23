import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
            if (localStorage.getItem("AccessToken")) {
                axios.get("http://localhost:8085/api/user/me",
                    {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem("AccessToken")
                        }
                    }).then(res => {
                    navigate('/cabinet')
                }).catch(err => {
                    console.log(err);
                    localStorage.removeItem("AccessToken")
                    localStorage.removeItem("RefreshToken")
                })
            }
        },
        [])
    const handleSubmit = (e) => {
        e.preventDefault();
        //go backend
        axios.post('http://localhost:8085/api/auth/login',
            {
                email,
                password
            }).then(res => {
            let token = res.data.data;
            localStorage.setItem("AccessToken", token.accessToken)
            localStorage.setItem("RefreshToken", token.refreshToken)
            navigate('/cabinet')
        }).catch(err => {
            toast.error(err.response.data.errors[0].msg)
        })
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card p-4 shadow" style={{width: '100%', maxWidth: '400px'}}>
                <h2 className="text-center mb-4">Login</h2>
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

                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Link to={"/forgot-password"}>Forgot password</Link>

                    <button type="submit" className="btn btn-primary w-100">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
