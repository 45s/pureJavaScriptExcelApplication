import { TYPES } from '@/store/types'

export const actions = {
  app: {
    changeText: (data) => ({
      type: TYPES.APP.CHANGE_TEXT,
      data,
    }),
  },

  header: {
    title: (data) => ({
      type: TYPES.HEADER.CHANGE_TITLE,
      data,
    }),
  },

  table: {
    changeStyles: (data) => ({
      type: TYPES.TABLE.CHANGE_STYLES,
      data,
    }),

    applyStyle: (data) => ({
      type: TYPES.TABLE.APPLY_STYLE,
      data,
    }),

    resize: (data) => ({
      type: TYPES.TABLE.RESIZE,
      data,
    }),
  },
}
