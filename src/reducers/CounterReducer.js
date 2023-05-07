import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = { value: 0 };

export const setError = (value) => (dispatch) =>
  dispatch(incrementByAmountAction(value));

export const incrementByAmountAction = createAction(
  "counter/increment",
  function prepare(value = 1) {
    return {
      payload: {
        value,
      },
    };
  }
);

export const CounterReducer = createReducer(initialState, (builder) => {
  builder.addCase(incrementByAmountAction, (state, action) => {
    state.value += action.payload;
  });
});
