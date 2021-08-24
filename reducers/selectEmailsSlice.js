import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
  name: 'selectEmailSlice',
  initialState: {
    value:false,
    selectedEmails:[],
  },
  reducers: {
    enableEmailSelection: (state) => {
      state.value = true
    },
    disableEmailSelection: (state) => {
      state.value =  false
    },
    selectEmail: (state, action) => {
      state.selectedEmails.push(action.payload)
    },
    deselectEmail: (state, action) => {
      state.selectedEmails = state.selectedEmails.filter(emailId => emailId !== action.payload)
    }
  }
})

export const {enableEmailSelection, disableEmailSelection, selectEmail, deselectEmail} = slice.actions

export default slice.reducer