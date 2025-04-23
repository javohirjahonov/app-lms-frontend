import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Cabinet = () => {
    const navigate = useNavigate();
    const [user = {}, setUser] = useState();

    useEffect(() => {
            if (!localStorage.getItem("AccessToken"))
                navigate('/login')
            else {
                axios.get("http://localhost:8085/api/user/me",
                    {
                        headers: {
                            Authorization: 'Bearer '+localStorage.getItem("AccessToken")
                        }
                    }).then(res => {
                    setUser(res.data.data)
                })
                    .catch(err => {
                        localStorage.removeItem("AccessToken")
                        localStorage.removeItem("RefreshToken")
                        navigate('/login')
                    })
            }
        },
        [])
    return (
        <div>
            Welcome to cabinet page: {user.name}
        </div>
    )
}
export default Cabinet;