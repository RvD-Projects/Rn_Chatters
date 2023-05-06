import { createAction } from '@reduxjs/toolkit'

export const incrementByAmount = createAction('counter/increment', function prepare(value = 1) {
  return {
    payload: {
      value
    },
  }
});