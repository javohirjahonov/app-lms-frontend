import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const AddRole = () => {
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [allPermissions, setAllPermissions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8085/api/role/permissions", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("AccessToken")
            }
        }).then(res => {
            setAllPermissions(res.data.data);
        }).catch(() => toast.error("Не удалось загрузить список разрешений"));
    }, []);

    const handlePermissionChange = (e) => {
        const value = e.target.value;
        setPermissions(prev =>
            prev.includes(value) ? prev.filter(p => p !== value) : [...prev, value]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8085/api/role", {
            name,
            permissions
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("AccessToken")
            }
        }).then(() => {
            toast.success("Роль успешно добавлена!");
            navigate("/role");
        }).catch(err => {
            const error = err?.response?.data?.errors?.[0]?.msg || "Ошибка при добавлении роли";
            toast.error(error);
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Добавить роль</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Название роли</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">Права</label>
                    <div className="row">
                        {allPermissions.map(p => (
                            <div className="col-6 col-md-4" key={p}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={p}
                                        id={`perm-${p}`}
                                        onChange={handlePermissionChange}
                                    />
                                    <label className="form-check-label" htmlFor={`perm-${p}`}>
                                        {p}
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Сохранить</button>
            </form>
        </div>
    );
};

export default AddRole;
