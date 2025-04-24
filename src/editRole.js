import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);

  // Получение всех permission'ов
  const fetchPermissions = useCallback(() => {
    axios.get("http://localhost:8085/api/permissions", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken")
      }
    })
    .then(res => {
      setPermissions(res.data.data); // массив строк
    })
    .catch(err => {
      toast.error("Не удалось загрузить список разрешений");
    });
  }, []);

  // Получение данных текущей роли
  const fetchRole = useCallback(() => {
    axios.get(`http://localhost:8085/api/role/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken")
      }
    })
    .then(res => {
      const { name, permissions } = res.data.data;
      setRoleName(name);
      setSelectedPermissions(permissions || []);
    })
    .catch(err => {
      toast.error("Не удалось загрузить роль");
    });
  }, [id]);

  useEffect(() => {
    fetchPermissions();
    fetchRole();
  }, [fetchPermissions, fetchRole]);

  const handlePermissionChange = (permission) => {
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roleData = {
      name: roleName,
      permissions: selectedPermissions
    };

    axios.put(`http://localhost:8085/api/role/${id}`, roleData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("AccessToken")
      }
    })
    .then(res => {
      toast.success("Роль успешно обновлена");
      navigate("/role");
    })
    .catch(err => {
      toast.error("Не удалось обновить роль");
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Редактировать роль</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Название роли</label>
          <input
            type="text"
            className="form-control"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Права</label>
          <div className="d-flex flex-wrap">
            {permissions.map((permission, index) => (
              <div key={index} className="form-check me-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`perm-${index}`}
                  checked={selectedPermissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                />
                <label className="form-check-label" htmlFor={`perm-${index}`}>
                  {permission}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  );
};

export default EditRole;
