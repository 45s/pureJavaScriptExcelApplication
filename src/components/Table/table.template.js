import { defaultStyles } from '@/constants/defaultStyles'
import { camelToDashCase } from '@/core/utils'

const CODES = { A: 65, Z: 90 }
const colsCount = CODES.Z - CODES.A + 1
const CELL = { WIDTH: 120, HEIGHT: 24 }

const toChar = (_, i) => String.fromCharCode(CODES.A + i)

function getWidth(state, index) {
  return (state[index] || CELL.WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || CELL.HEIGHT) + 'px'
}

function toCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const content = state.dataState[id] || ''
    const styles = Object.keys(defaultStyles)
      .map((key) => `${camelToDashCase(key)}: ${defaultStyles[key]}`)
      .join(';')

    return /* html */ `
      <div 
        class="cell" 
        contenteditable
        data-col="${col}"
        data-type='cell'
        data-id="${id}"
        style="${styles}; width: ${width}"
      >
        ${content}
      </div>
    `
  }
}

const toColumn = ({ col, index, width }) => {
  return /* html */ `
  <div 
    class='column' 
    data-type="resizable" 
    data-col="${index}"
    style="width: ${width}"
  >
    ${col}
    <div 
      class='col-resize'
      data-resize="col"
    >
    </div>
  </div>
  `
}

const createRow = (index, content, state = {}) => {
  const height = getHeight(state, index)
  return /* html */ `
  <div 
    class='row' 
    data-type="resizable" 
    data-row="${index}"
    style="height:${height}"
  >
    <div 
      class="row-info"
    >
      ${index ? index : ''}
      ${index ? '<div data-resize="row" class="row-resize"></div>' : ''}
    </div>
		<div class="row-data">${content}</div>
	</div>
	`
}

function withWidthFrom(state) {
  return function (col, index) {
    return { col, index, width: getWidth(state.colState, index) }
  }
}

export const createTable = (rowsCount, state = {}) => {
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(withWidthFrom(state))
    .map(toColumn)
    .join('')

  const rows = [createRow(null, cols)]

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill('').map(toCell(state, row)).join('')
    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
