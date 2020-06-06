const CODES = { A: 65, Z: 90 }
const colsCount = CODES.Z - CODES.A + 1

const toChar = (_, i) => String.fromCharCode(CODES.A + i)
const toCell = (_, colIndex) => {
  return /* html */ `
    <div class="cell" data-col="${colIndex}" contenteditable></div>
  `
}

// column with titles (A, B ,C ...)
const toColumn = (col, i) => {
  return /* html */ `
  <div class='column' data-type="resizable" data-col="${i}">
      ${col}
      <div data-resize="col" class='col-resize'></div>
  </div>
  `
}

const createRow = (rowNumber, cells) => {
  return /* html */ `
	<div class='row' data-type="resizable">
    <div class="row-info">${rowNumber ? rowNumber : ''}
      ${rowNumber ? '<div data-resize="row" class="row-resize"></div>' : ''}
    </div>
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
