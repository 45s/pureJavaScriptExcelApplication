import { $ } from '@/core/dom'
import { ActiveRoute } from '@/core/routes/ActiveRoute'
import { debounce } from '@/core/utils'
import { actions } from '@/store/actions'
import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
        <button type="button" class="button" data-btn="remove">
          <i class="material-icons" data-btn="remove">delete</i>
        </button>
        <button type="button" class="button" data-btn="exit">
          <i class="material-icons" data-btn="exit">exit_to_app</i>
        </button>
      </div>`
  }

  onInput(e) {
    this.$dispatch(actions.header.title($(e.target).text()))
  }

  onClick(e) {
    const $target = $(e.target)
    if ($target.data.btn === 'remove') {
      const decision = confirm('Are you really want delete this table')
      if (decision) {
        localStorage.removeItem('excel' + ActiveRoute.params)
      }
      ActiveRoute.navigate('')
    } else if ($target.data.btn === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
