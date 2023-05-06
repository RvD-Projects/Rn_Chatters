import { createReducer } from '@reduxjs/toolkit'
import { counterAction } from '../actions'


const initialState = { value: 0 }

export const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(counterAction.incrementByAmount, (state, action) => {
      state.value += action.payload
    })
})