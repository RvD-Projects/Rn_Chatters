import { createReducer, createAction } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null,
  title: null,
  msg: null,
  useAppNotification: false,
};

export const showAlert = (error) => (dispatch) =>
  dispatch(setAlertAction(error));

const setAlertAction = createAction(
  "screenNotification/showAlert",
  function prepare(newState) {
    return {
      payload: { ...newState },
    };
  }
);

export const ScreenNotificationReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(setAlertAction, (state, action) => {
      const { isOpen, type, title, msg, useAppNotification } = action.payload;
      return {
        ...state,
        isOpen: isOpen,
        type: type,
        title: title,
        msg: msg,
        useAppNotification: useAppNotification,
      };
    });
  }
);
