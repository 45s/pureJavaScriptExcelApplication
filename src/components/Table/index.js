import { EE } from '@/components/Table/constants/eventEmitters'
import { keydownKeys } from '@/components/Table/constants/keydownKeys'
import { TableSelection } from '@/components/Table/TableSelection'
import { defaultStyles } from '@/constants/defaultStyles'
import { $ } from '@/core/dom'
import { actions } from '@/store/actions'
import { ExcelComponent } from '@core/ExcelComponent'
import { isCell, matrix, nextSelector, shouldResize } from './table.functions'
import { resizeHandler } from './table.resize'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
  }

  toHTML() {
    return createTable(22, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on(EE.formula.input, (text) => {
      this.selection?.current.text(text)
      this.updateTextInStore(text)
    })

    this.$on(EE.formula.done, () => {
      this.selection?.current.focus()
    })

    this.$on(EE.toolbar.applyStyle, (style) => {
      this.selection?.applyStyle(style)
    })
  }

  selectCell($cell) {
    this.selection?.select($cell)
    this.$emit(EE.table.select, $cell)

    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.table.changeStyles(styles))
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(e, this.$root)
      this.$dispatch(actions.table.resize(data))
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
    if (keydownKeys.includes(e.key) && !e.shiftKey) {
      e.preventDefault()

      const current = this.selection?.current.id(true)
      this.selectCell(this.$root.find(nextSelector(e.key, current)))
    }
  }

  updateTextInStore(text) {
    this.$dispatch(
      actions.app.changeText({
        id: this.selection?.current.id(),
        text,
      })
    )
  }

  onInput(e) {
    this.updateTextInStore($(e.target).text())
  }
}
