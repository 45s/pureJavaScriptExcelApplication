import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unSubscribers = []
    this.store = options.store
    this.storeSub = null

    this.prepare()
  }

  toHTML() {
    return ''
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  $emit(eventId, ...args) {
    this.emitter.emit(eventId, ...args)
  }

  $on(eventId, fn) {
    const sub = this.emitter.subscribe(eventId, fn)
    this.unSubscribers.push(sub)
  }

  prepare() {}

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unSubscribers.forEach((subscriber) => subscriber())
    this.storeSub.unsubscribe()
  }
}
