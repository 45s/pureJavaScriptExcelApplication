import { TYPES } from '@/store/types'

function value(state, field, data) {
  const val = state[field] || {}
  val[data.id] = data.value
  return val
}

export function rootReducer(state, { type, data }) {
  let field
  let val
  switch (type) {
    case TYPES.TABLE.RESIZE:
      field = data.type === 'col' ? 'colState' : 'rowState'
      return {
        ...state,
        [field]: value(state, field, data),
      }
    case TYPES.APP.CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: data.value,
        [field]: value(state, field, data),
      }
    case TYPES.TABLE.CHANGE_STYLES:
      return {
        ...state,
        currentStyles: data,
      }
    case TYPES.TABLE.APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      data.ids.foeEach((id) => {
        val[id] = { ...val[id], ...data.value }
      })
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...data.value },
      }
    case TYPES.HEADER.CHANGE_TITLE:
      return {
        ...state,
        title: data,
      }
    default:
      return state
  }
}
