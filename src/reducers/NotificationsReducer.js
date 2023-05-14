import { createReducer, createAction } from "@reduxjs/toolkit";
import { AlertHelper } from "../helpers/notifications/AlertHelper";
import { capitalizeAll } from "../helpers";

const initialState = [];
const initialnotificationState = {
  isOpen: false,
  type: null,
  title: null,
  message: null,
  showOnScreen: false,
  time: null,
};

export const sendNotification = (notification) => (dispatch) =>
  dispatch(sendNotificationAction(notification));

const sendNotificationAction = createAction(
  "notifications/sendNotification",
  function prepare(newState) {
    return {
      payload: { ...newState },
    };
  }
);

export const NotificationsReducer = createReducer(initialState, (builder) => {
  builder.addCase(sendNotificationAction, (state, action) => {
    const { payload } = action;
    payload.time = payload.time ?? Date.now();

    payload.showOnScreen &&
      AlertHelper.show(
        payload.type,
        payload.title ?? capitalizeAll(payload.type),
        payload.message
      );

    const newState = [ ...state, payload ];
    return newState;
  });
});
