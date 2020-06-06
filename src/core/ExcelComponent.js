import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unSubscribers = []

    this.prepare()
  }

  toHTML() {
    return ''
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
