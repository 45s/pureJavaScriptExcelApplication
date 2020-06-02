import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    })
  }

  toHTML() {
    return /* html */ `<div class="info">fx</div>
    <div class="input" contenteditable spellcheck="false"></div>`
  }

  onInput(e) {
    console.log('On input FORMULA', e.target.textContent.trim())
  }

  onClick(e) {
    console.log('on click formula')
  }
}
