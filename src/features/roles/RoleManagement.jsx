import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRole, editRole, deleteRole } from './RoleSlice';

export default function RoleManagement() {
  const roles = useSelector(state => state.roles.roles);
  const permissions = useSelector(state => state.permissions.permissions);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', permissions: [] });

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.id) {
      dispatch(editRole({ id: formData.id, updatedRole: formData }));
    } else {
      dispatch(addRole({ id: Date.now(), ...formData }));
    }
    setFormData({ name: '', permissions: [] });
  };

  const handleEdit = role => setFormData(role);

  const handleDelete = id => dispatch(deleteRole(id));

  const togglePermission = permission => {
    const updatedPermissions = formData.permissions.includes(permission)
      ? formData.permissions.filter(p => p !== permission)
      : [...formData.permissions, permission];
    setFormData({ ...formData, permissions: updatedPermissions });
  };

  return (
    <div className="container mt-4">
      <h2>Role Management</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            placeholder="Role Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <label>Permissions:</label>
          <div>
            {permissions.map(permission => (
              <label key={permission} className="me-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                />{' '}
                {permission}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {formData.id ? 'Update Role' : 'Add Role'}
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(role)} className="btn btn-sm btn-warning me-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(role.id)} className="btn btn-sm btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
