import { createAction } from '@reduxjs/toolkit'

export const setError = createAction('screenNotification/setError', function prepare(newState) {
  return {
    payload: {...newState},
  }
});