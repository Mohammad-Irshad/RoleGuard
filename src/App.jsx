import React from 'react';
import UserManagement from './features/users/UserManagement';
import RoleManagement from './features/roles/RoleManagement';
import PermissionManagement from './features/permissions/PermissionManagement';

function App() {
  return (
    <div className="container mt-4">
      <h1>RoleGuard Management Dashboard</h1>
      <hr />
      <UserManagement />
      <hr />
      <RoleManagement />
      <hr />
      <PermissionManagement />
    </div>
  );
}

export default App;
