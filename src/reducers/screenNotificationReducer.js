import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null,
  title: null,
  msg: null,
  useNotifications: false,
};

export const setError = createAction(
  "screenNotification/setError",
  function prepare(newState) {
    return {
      payload: { ...newState },
    };
  }
);

export const ScreenNotificationReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(setError, (state, action) => {
      const { isOpen, type, title, msg, useNotifications } = action.payload;
      return {
        ...state,
        isOpen: isOpen,
        type: type,
        title: title,
        msg: msg,
        useNotifications: useNotifications,
      };
    });
  }
);
