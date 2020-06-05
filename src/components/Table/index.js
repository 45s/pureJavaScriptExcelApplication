import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/Table/table.template'
import { $ } from '@/core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['click', 'mousedown', 'mousemove', 'mouseup'],
    })
  }

  onClick() {}

  onMousedown(e) {
    if (e.target.dataset.resize) {
      const $resizer = $(e.target)

      // bad solution (mix layout/logic)
      // const $parent = $resizer.$el.parentNode

      // better, but still bad (mix layout/logic)
      // const $parent = $resizer.$el.closest('.column')

      const $parent = $resizer.closest('[data-type="resizable"]')

      const coords = $parent.getCoords()

      document.onmousemove = (event) => {
        const delta = event.pageX - coords.right
        const size = coords.width + delta
        $parent.$el.style.width = `${size}px`
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }

  onMousemove() {}

  onMouseup() {}

  toHTML() {
    return createTable(22)
  }
}
