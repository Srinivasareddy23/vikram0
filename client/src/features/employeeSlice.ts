import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EmployeeState {
  id: string;
  firstname: string;
  email: string;
  role: string;
}

const initialState: EmployeeState = {
  id: "",
  firstname: "",
  email: "",
  role: "",
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    loginOk(state, action: PayloadAction<EmployeeState>) {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    loginErr() {
      console.log("Login error occurred.");
    },
    logoutOk(state) {
      state.id = "";
      state.firstname = "";
      state.email = "";
      state.role = "";
    },
  },
});

export const { loginOk, loginErr, logoutOk } = employeeSlice.actions;

export default employeeSlice.reducer;
