export class Emitter {
  constructor() {
    this.listeners = {}
  }

  emit(eventId, ...args) {
    if (!Array.isArray(this.listeners[eventId])) {
      return false
    }
    this.listeners[eventId].forEach((listener) => {
      listener(...args)
    })
    return true
  }

  subscribe(eventId, fn) {
    this.listeners[eventId] = this.listeners[eventId] || []
    this.listeners[eventId].push(fn)
    return () => {
      this.listeners[eventId] = this.listeners[eventId].filter(
        (listener) => listener !== fn
      )
    }
  }
}
