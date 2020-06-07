import { TYPES } from '@/store/types'

function value(state, field, payload) {
  const val = state[field] || {}
  val[payload.id] = payload.value
  return val
}

export function rootReducer(state, { type, payload }) {
  let field
  switch (type) {
    case TYPES.TABLE.RESIZE:
      field = payload.type === 'col' ? 'colState' : 'rowState'
      return {
        ...state,
        [field]: value(state, field, payload),
      }
    case TYPES.APP.CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: payload.text,
        [field]: value(state, field, payload),
      }
    case TYPES.TABLE.CHANGE_STYLES:
      field = 'currentStyles'
      return {
        ...state,
        [field]: payload,
      }
    default:
      return state
  }
}
