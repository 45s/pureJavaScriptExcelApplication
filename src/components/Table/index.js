import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@/core/dom'

import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize, isCell, matrix, nextSelector } from './table.functions'
import { TableSelection } from '@/components/Table/TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'mousemove', 'mouseup', 'input'],
      ...options,
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.$subscribe((state) => {
      console.log('TABLE STATE', state)
    })

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', (text) => {
      this.selection?.current.text(text)
    })

    this.$on('formula:don', () => {
      this.selection?.current.focus()
    })
  }

  selectCell($cell) {
    this.selection?.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(e, this.$root)
      console.log(data)
      this.$dispatch({ type: 'TABLE_RESIZE', payload: data })
    } catch (err) {
      console.log('RESIZE ERROR', err.message)
    }
  }

  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if (e.shiftKey) {
        const $cells = matrix($target, this.selection?.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        )
        this.selection?.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(e) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'ArrowLeft',
    ]
    if (keys.includes(e.key) && !e.shiftKey) {
      e.preventDefault()
      const current = this.selection?.current.id(true)

      this.selectCell(this.$root.find(nextSelector(e.key, current)))
    }
  }

  onInput(e) {
    this.$emit('table:input', $(e.target))
  }

  onMousemove() {}
  onMouseup() {}

  toHTML() {
    return createTable(22)
  }
}
