import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unSubscribers = []

    this.prepare()
  }

  toHTML() {
    return ''
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
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
  }
}
