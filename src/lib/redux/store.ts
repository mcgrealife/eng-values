import { configureStore, PayloadAction, createSlice } from '@reduxjs/toolkit'

// Language Slice //
const initialStateLanguage = {
  langCode: 'en',
  name: 'English',
}
export const languageSlice = createSlice({
  name: 'language',
  initialState: initialStateLanguage,
  reducers: {
    setLanguage: (
      state,
      action: PayloadAction<Partial<typeof initialStateLanguage>>
    ) => {
      Object.assign(state, action.payload)
      // state = { ...state, ...action.payload }
    },
  },
})
export const { setLanguage } = languageSlice.actions

// Settings Slice //
const initialStateSettings = {
  acceptedCookies: false,
  seenIntroTextAnimation: false,
}
export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialStateSettings,
  reducers: {
    setSettings: (
      state,
      action: PayloadAction<Partial<typeof initialStateSettings>>
    ) => {
      console.log('setSettings', action.payload)
      Object.assign(state, action.payload)
      // state = { ...state, ...action.payload }
    },
  },
})
export const { setSettings } = settingsSlice.actions

// Core store //
export const store = configureStore({
  reducer: {
    language: languageSlice.reducer,
    settings: settingsSlice.reducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export const selectLanguage = (state: RootState) => state.language
export const selectSettings = (state: RootState) => state.settings
export default store
