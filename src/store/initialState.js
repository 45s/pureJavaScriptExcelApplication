import { defaultStyles } from '@/constants/defaultStyles'
import { defaultTitle } from '@/constants/defaultTitle'
import { LS } from '@/constants/localStorageKeys'
import { storage } from '@/core/utils'

const defaultState = {
  title: defaultTitle,
  currentStyles: defaultStyles,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export const initialState = storage(LS.state)
  ? normalize(storage(LS.state))
  : defaultState
