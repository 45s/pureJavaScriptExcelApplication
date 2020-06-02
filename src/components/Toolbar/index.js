import { ExcelComponent } from '@core/ExcelComponent'

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'
  constructor($root) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
    })
  }

  onClick(e) {
    console.log(e.target)
  }

  toHTML() {
    return /* html */ `<button type="button" class="button">
            <i class="material-icons">format_align_left</i>
          </button>
          <button type="button" class="button">
            <i class="material-icons">format_align_center</i>
          </button>
          <button type="button" class="button">
            <i class="material-icons">format_align_right</i>
          </button>
          <button type="button" class="button">
            <i class="material-icons">format_bold</i>
          </button>
          <button type="button" class="button">
            <i class="material-icons">format_italic</i>
          </button>
          <button type="button" class="button">
            <i class="material-icons">format_underline</i>
          </button>`
  }
}
