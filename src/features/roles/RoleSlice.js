import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'User', permissions: ['Read', 'Write'] },
  ],
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state, action) => {
      state.roles.push(action.payload);
    },
    editRole: (state, action) => {
      const { id, updatedRole } = action.payload;
      const index = state.roles.findIndex(role => role.id === id);
      if (index !== -1) state.roles[index] = { ...state.roles[index], ...updatedRole };
    },
    deleteRole: (state, action) => {
      state.roles = state.roles.filter(role => role.id !== action.payload);
    },
  },
});

export const { addRole, editRole, deleteRole } = roleSlice.actions;
export default roleSlice.reducer;
