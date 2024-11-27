import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ManagerState {
  id: string;
  firstname: string;
  email: string;
  role: string;
}

const initialState: ManagerState = {
  id: "",
  firstname: "",
  email: "",
  role: "",
};

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<ManagerState>) {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    loginError() {
      console.log("Login error occurred.");
    },
    logout(state) {
      state.id = "";
      state.firstname = "";
      state.email = "";
      state.role = "";
    },
  },
});

export const { loginSuccess, loginError, logout } = managerSlice.actions;

export default managerSlice.reducer;
