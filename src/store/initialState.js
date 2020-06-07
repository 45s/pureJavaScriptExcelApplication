import { defaultStyles } from '@/constants/defaultStyles'
import { LS } from '@/constants/localStorageKeys'
import { storage } from '@/core/utils'

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
}

export const initialState = storage(LS.state) ? storage(LS.state) : defaultState
