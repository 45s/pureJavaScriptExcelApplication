import { Excel } from '@/components/Excel'
import { Formula } from '@/components/Formula'
import { Header } from '@/components/Header'
import { Table } from '@/components/Table'
import { Toolbar } from '@/components/Toolbar'
import { LS } from '@/constants/localStorageKeys'
import { createStore } from '@/core/createStore'
import { storage } from '@/core/utils'
import { initialState } from '@/store/initialState'
import { rootReducer } from '@/store/rootReducer'
import '@/styles/index.scss'

const store = createStore(rootReducer, initialState)
store.subscribe((state) => storage(LS.state, state))

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
