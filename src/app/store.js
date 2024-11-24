import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/UserSlice';
import roleReducer from '../features/roles/RoleSlice';
import permissionReducer from '../features/permissions/PermissionSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    roles: roleReducer,
    permissions: permissionReducer,
  },
});
