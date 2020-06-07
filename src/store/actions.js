import { TYPES } from '@/store/types'

export const actions = {
  app: {
    changeText: (payload) => ({
      type: TYPES.APP.CHANGE_TEXT,
      payload,
    }),
  },

  table: {
    changeStyles(payload) {
      return {
        type: TYPES.TABLE.CHANGE_STYLES,
        payload,
      }
    },

    resize: (payload) => ({
      type: TYPES.TABLE.RESIZE,
      payload,
    }),
  },
}
