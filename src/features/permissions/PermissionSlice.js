import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  permissions: ['Read', 'Write', 'Delete', 'Execute'],
};

const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    addPermission: (state, action) => {
      if (!state.permissions.includes(action.payload)) {
        state.permissions.push(action.payload);
      }
    },
    deletePermission: (state, action) => {
      state.permissions = state.permissions.filter(permission => permission !== action.payload);
    },
  },
});

export const { addPermission, deletePermission } = permissionSlice.actions;
export default permissionSlice.reducer;
