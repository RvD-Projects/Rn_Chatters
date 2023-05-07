import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = { value: 0 };

export const incrementByAmount = createAction(
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
  builder.addCase(incrementByAmount, (state, action) => {
    state.value += action.payload;
  });
});
