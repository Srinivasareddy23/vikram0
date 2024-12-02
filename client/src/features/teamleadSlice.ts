import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeamLeadState {
  id: string;
  firstname: string;
  email: string;
  role: string;
}

const initialState: TeamLeadState = {
  id: "",
  firstname: "",
  email: "",
  role: "",
};

const teamleadSlice = createSlice({
  name: "teamlead",
  initialState,
  reducers: {
    loginDone(state, action: PayloadAction<TeamLeadState>) {
      state.id = action.payload.id;
      state.firstname = action.payload.firstname;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    loginMistake() {
      console.log("Login error occurred.");
    },
    logoutDone(state) {
      state.id = "";
      state.firstname = "";
      state.email = "";
      state.role = "";
    },
  },
});

export const { loginDone, loginMistake, logoutDone } = teamleadSlice.actions;

export default teamleadSlice.reducer;
