import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '@/types/manager/types';

const initialState: InitialState = {
  id: "",
  name: "",
  email: "",
  address: ""
};

export const managerSlice = createSlice({
  name: 'manager', 
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<InitialState>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
    },
    loginError(state) {
      console.log("Login error occurred");
    }
  }
});

export const { loginSuccess, loginError } = managerSlice.actions;

export default managerSlice.reducer;
