import '@/styles/index.scss'

import { Excel } from '@/components/Excel'
import { Header } from '@/components/Header'
import { Toolbar } from '@/components/Toolbar'
import { Formula } from '@/components/Formula'
import { Table } from '@/components/Table'
import { createStore } from '@/core/createStore'
import { rootReducer } from '@/store/rootReducer'

const store = createStore(rootReducer, {
  colState: {},
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
