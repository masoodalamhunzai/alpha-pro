import { createSlice } from "@reduxjs/toolkit";

const orgSlice = createSlice({
  name: "org",
  initialState: {
    org: null,
    orgs: null,
    orgsNameList: null,
    orgUsers: null,
  },
  reducers: {
    setOrg: (state, action) => {
      state.org = action.payload;
    },
    setOrgs: (state, action) => {
      state.orgs = action.payload;
    },
    setOrgsNameList: (state, action) => {
      state.orgsNameList = action.payload;
    },
    setOrgUsers: (state, action) => {
      state.orgUsers = action.payload;
    },
  },
});

export const { setOrg, setOrgs, setOrgsNameList, setOrgUsers } =
  orgSlice.actions;

export default orgSlice.reducer;
