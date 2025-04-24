import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [usersUsingRole, setUsersUsingRole] = useState([]);
    const [roleToDelete, setRoleToDelete] = useState(null);
    const [replacementRoleId, setReplacementRoleId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = () => {
        axios.get("http://localhost:8085/api/role", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("AccessToken")
            }
        }).then(res => {
            setRoles(res.data.data);
        }).catch(() => {
            toast.error("Ошибка при загрузке ролей");
        });
    };

    const handleDelete = (id) => {
        axios.get(`http://localhost:8085/api/role/check-used/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("AccessToken")
            }
        }).then(res => {
            const users = res.data.data;
            if (users.length === 0) {
                deleteRole(id); // просто удалить
            } else {
                setUsersUsingRole(users);
                setRoleToDelete(id);
                setShowModal(true);
            }
        }).catch(() => {
            toast.error("Ошибка при проверке использования роли");
        });
    };

    const deleteRole = (id) => {
        axios.delete(`http://localhost:8085/api/role/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("AccessToken")
            }
        }).then(() => {
            toast.success("Удалено успешно");
            fetchRoles();
        }).catch(() => {
            toast.error("Не удалось удалить роль");
        });
    };

    const handleConfirmReplaceAndDelete = () => {
        if (!replacementRoleId) {
            toast.error("Выберите новую роль");
            return;
        }

        axios.delete(`http://localhost:8085/api/role/update-users-role/${roleToDelete}/${replacementRoleId}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("AccessToken")
            }
        }).then(() => {
            deleteRole(roleToDelete);
            setShowModal(false);
        }).catch(() => {
            toast.error("Ошибка при обновлении ролей у пользователей");
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Список ролей</h2>
            <div className="text-end mb-3">
                <button className="btn btn-success" onClick={() => navigate("/role/add")}>Добавить роль</button>
            </div>
            <ul className="list-group">
                {roles.map(role => (
                    <li key={role.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{role.name}</span>
                        <div>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/role/edit/${role.id}`)}>
                                Изменить
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(role.id)}>
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Модальное окно */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Роль используется пользователями</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Выберите новую роль для следующих пользователей:</p>
                    <ul>
                        {usersUsingRole.map(user => (
                            <li key={user.id}>{user.fullName || user.email}</li>
                        ))}
                    </ul>

                    <div className="form-group mt-3">
                        <label>Выберите новую роль</label>
                        <select className="form-select" value={replacementRoleId || ''} onChange={(e) => setReplacementRoleId(e.target.value)}>
                            <option value="">-- выберите --</option>
                            {roles
                                .filter(r => r.id !== roleToDelete)
                                .map(role => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleConfirmReplaceAndDelete}>
                        Подтвердить и удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RoleList;
