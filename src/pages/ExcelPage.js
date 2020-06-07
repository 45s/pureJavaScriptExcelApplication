import { Excel } from '@/components/Excel'
import { Formula } from '@/components/Formula'
import { Header } from '@/components/Header'
import { Table } from '@/components/Table'
import { Toolbar } from '@/components/Toolbar'
import { Page } from '@/core/page/Page'
import { StateProcessor } from '@/core/page/StateProcessor'
import { createStore } from '@/core/store/createStore'
import { LocalStorageClient } from '@/shared/LocalStorageClient'
import { normalizeInitialState } from '@/store/initialState'
import { rootReducer } from '@/store/rootReducer'

export class ExcelPage extends Page {
  constructor(params) {
    super(params)
    this.storeSub = null
    this.processor = new StateProcessor(new LocalStorageClient(this.params))
  }
  async getRoot() {
    const state = await this.processor.get()
    const store = createStore(rootReducer, normalizeInitialState(state))

    this.storeSub = store.subscribe(this.processor.listen)

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
    this.storeSub?.unsubscribe()
  }
}
