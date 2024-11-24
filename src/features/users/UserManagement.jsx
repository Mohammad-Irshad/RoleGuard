import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, editUser, deleteUser } from './UserSlice';

export default function UserManagement() {
  const users = useSelector(state => state.users.users); 
  const dispatch = useDispatch();

  console.log(users)

  const [formData, setFormData] = useState({ name: '', email: '', role: 'User', status: 'Active' });
  const [filter, setFilter] = useState({ search: '', role: '', status: '' });

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }
    if (formData.id) {
      dispatch(editUser({ id: formData.id, updatedUser: formData }));
    } else {
      dispatch(addUser({ id: Date.now(), ...formData }));
    }
    setFormData({ name: '', email: '', role: 'User', status: 'Active' });
  };

  const handleEdit = user => setFormData(user);

  const handleDelete = id => dispatch(deleteUser(id));

  const filteredUsers = (users || []).filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(filter.search.toLowerCase()) || 
                          user.email.toLowerCase().includes(filter.search.toLowerCase());
    const matchesRole = filter.role ? user.role === filter.role : true;
    const matchesStatus = filter.status ? user.status === filter.status : true;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="container mt-4">
      <h2>User Management</h2>
      <div className="mb-4">
        <p>Search User/Admin:</p>
        <input
          type="text"
          placeholder="Search by name or email"
          value={filter.search}
          onChange={e => setFilter({ ...filter, search: e.target.value })}
          className="form-control mb-2"
        />
        <div className="row">
          <div className="col-md-6">
            <label>Filter by Role:</label>
            <select
              value={filter.role}
              onChange={e => setFilter({ ...filter, role: e.target.value })}
              className="form-control mb-2"
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <div className="col-md-6">
            <label>Filter by Status:</label>
            <select
              value={filter.status}
              onChange={e => setFilter({ ...filter, status: e.target.value })}
              className="form-control mb-2"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <p>Add New User/Admin:</p>
        <div className="row">
          <div className="col-md-3 mb-2">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="col-md-3 mb-2">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="col-md-3 mb-2">
            <select
              value={formData.role}
              onChange={e => setFormData({ ...formData, role: e.target.value })}
              className="form-control"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="col-md-3 mb-2">
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              className="form-control"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          {formData.id ? 'Update User' : 'Add User'}
        </button>
      </form>

      {/* User List Section */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="btn btn-sm btn-warning me-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-danger">
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
