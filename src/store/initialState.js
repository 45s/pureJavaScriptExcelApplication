import { defaultStyles } from '@/constants/defaultStyles'
import { defaultTitle } from '@/constants/defaultTitle'
import { clone } from '@/core/utils'

const defaultState = {
  title: defaultTitle,
  currentStyles: defaultStyles,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  openedDate: new Date().toJSON(),
}

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
