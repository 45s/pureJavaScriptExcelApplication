import { Page } from '../Page'
import { Router } from './Router'

class Dashboard extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}

class Excel extends Page {}

describe(' Router', () => {
  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: Dashboard,
      excel: Excel,
    })
  })
  test('Should be defined', () => {
    expect(router).toBeDefined()
  })

  test('Should render Dashboard page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe(`<div>dashboard</div>`)
  })
})
