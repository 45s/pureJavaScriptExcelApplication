export function rootReducer(state, { type, payload }) {
  let prevState
  switch (type) {
    case 'TABLE_RESIZE':
      prevState = state.colState || {}
      prevState[payload.id] = payload.value
      return { ...state, colState: prevState }
    default:
      return state
  }
}
