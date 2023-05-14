import { createReducer, createAction } from "@reduxjs/toolkit";
import { AlertHelper } from "../helpers/Notifications/AlertHelpers";

const initialState = {
  isOpen: false,
  type: null,
  title: null,
  message: null,
  showOnScreen: false,
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

    payload.showOnScreen &&
      AlertHelper.show(
        payload.type,
        payload.title ?? payload.type,
        payload.message
      );

    return { ...state, ...payload };
  });
});
