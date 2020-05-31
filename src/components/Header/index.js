import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  toHTML() {
    return /* html */ `<input type="text" class="input" value="New table" />
      <div>
        <button type="button" class="button">
          <i class="material-icons">delete</i>
        </button>
        <button type="button" class="button">
          <i class="material-icons">exit_to_app</i>
        </button>
      </div>`
  }
}
