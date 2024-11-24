import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addPermission, deletePermission } from './PermissionSlice';

export default function PermissionManagement() {
  const permissions = useSelector(state => state.permissions.permissions);
  const dispatch = useDispatch();
  const [permission, setPermission] = useState('');

  const handleAdd = () => {
    if (permission) {
      dispatch(addPermission(permission));
      setPermission('');
    }
  };

  const handleDelete = permission => dispatch(deletePermission(permission));

  return (
    <div className="container my-4">
      <h2>Permission Management</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Permission Name"
          value={permission}
          onChange={e => setPermission(e.target.value)}
          className="form-control mb-2"
        />
        <button onClick={handleAdd} className="btn btn-primary">
          Add Permission
        </button>
      </div>
      <ul className="list-group">
        {permissions.map(p => (
          <li key={p} className="list-group-item d-flex justify-content-between">
            {p}
            <button onClick={() => handleDelete(p)} className="btn btn-sm btn-danger">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
