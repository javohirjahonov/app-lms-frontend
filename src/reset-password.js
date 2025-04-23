import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const ResetPasword = () => {
    const [password, setPassword] = useState('');
    const [prePassword, setPrePassword] = useState('');
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        //go backend
        axios.post('http://localhost:8085/api/auth/reset-password',
            {
                password,
                prePassword,
                email: searchParams.get('email'),
                code: searchParams.get('code')
            }
        ).then(res => {
            navigate('/login')
        }).catch(err => {
            toast.error(err.response.data.errors[0].msg);
        })
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card p-4 shadow" style={{width: '100%', maxWidth: '400px'}}>
                <h2 className="text-center mb-4">Reset password</h2>
                <form onSubmit={handleSubmit}>
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
                    <div className="mb-4">
                        <label htmlFor="prePassword" className="form-label">Pre Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="prePassword"
                            required
                            value={prePassword}
                            onChange={(e) => setPrePassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Reset Password</button>
                </form>
            </div>
        </div>
    );
}

export default ResetPasword;
