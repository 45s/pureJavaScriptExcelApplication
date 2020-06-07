import { EE } from '@/components/Table/constants/eventEmitters'
import { $ } from '@/core/dom'
import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      $subscribe: ['currentText'],
      ...options,
    })
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')

    this.$on(EE.table.select, ($cell) => {
      this.$formula.text($cell.data.value)
    })
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText)
  }

  toHTML() {
    return /* html */ `<div class="info">fx</div>
    <div id="formula" class="input" contenteditable spellcheck="false"></div>`
  }

  onInput(e) {
    this.$emit(EE.formula.input, $(e.target).text())
  }

  onKeydown(e) {
    if (['Enter', 'Tab'].includes(e.key)) {
      e.preventDefault()
      this.$emit(EE.formula.done)
    }
  }
}
