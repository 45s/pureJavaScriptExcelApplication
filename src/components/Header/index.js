import { $ } from '@/core/dom'
import { debounce } from '@/core/utils'
import { actions } from '@/store/actions'
import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || 'Default new title '
    return /* html */ `<input type="text" class="input" value=${title} />
      <div>
        <button type="button" class="button">
          <i class="material-icons">delete</i>
        </button>
        <button type="button" class="button">
          <i class="material-icons">exit_to_app</i>
        </button>
      </div>`
  }

  onInput(e) {
    this.$dispatch(actions.header.title($(e.target).text()))
  }
}
