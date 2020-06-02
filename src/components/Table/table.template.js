const CODES = { A: 65, Z: 90 }
const colsCount = CODES.Z - CODES.A + 1

const toChar = (_, i) => String.fromCharCode(CODES.A + i)
const toCell = () => `<div class="cell" contenteditable></div>`
const toColumn = (col) => `<div class='column'>${col}</div>`
const createRow = (rowNumber, cells) => {
  return /* html */ `
	<div class='row'>
		<div class="row-info">${rowNumber ? rowNumber : ''}</div>
		<div class="row-data">${cells}</div>
	</div>
	`
}

export const createTable = (rowsCount) => {
  const cols = new Array(colsCount).fill('').map(toChar).map(toColumn).join('')
  const rows = [createRow(null, cols)]

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(toCell).join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
