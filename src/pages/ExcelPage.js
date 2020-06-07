import { Excel } from '@/components/Excel'
import { Formula } from '@/components/Formula'
import { Header } from '@/components/Header'
import { Table } from '@/components/Table'
import { Toolbar } from '@/components/Toolbar'
import { createStore } from '@/core/createStore'
import { Page } from '@/core/Page'
import { debounce, storage } from '@/core/utils'
import { normalizeInitialState } from '@/store/initialState'
import { rootReducer } from '@/store/rootReducer'

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))
    const stateListener = debounce(
      (state) => storage(storageName(params), state),
      300
    )
    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel?.init()
  }

  destroy() {
    this.excel?.destroy()
  }
}
