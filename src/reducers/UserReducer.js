import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  local: null,
  email: null,
  firstname: null,
  lastname: null,
  dob: null,
  friends: [],
  groups: [],
};

export const getStateUser = () => (dispatch) => dispatch(getStateUserAction());

const getStateUserAction = createAction(
  "user/getStateUser",
  function prepare() {
    return;
  }
);

export const updateStateUser = (user) => (dispatch) =>
  dispatch(updateStateUserAction(user));

const updateStateUserAction = createAction(
  "user/updateStateUser",
  function prepare(newState) {
    return {
      payload: { ...newState },
    };
  }
);

export const UserReducer = createReducer(initialState, (builder) => {
  builder.addCase(getStateUser, (state, action) => {
    const { payload } = action;
    return { ...state, ...payload };
  });

  builder.addCase(updateStateUserAction, (state, action) => {
    const { payload } = action;
    return { ...state, ...payload };
  });
});
