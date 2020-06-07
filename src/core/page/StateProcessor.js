import { debounce } from '@/core/utils'

export class StateProcessor {
  constructor(saver, delay = 300) {
    this.listen = debounce(this.listen.bind(this), delay)
    this.client = saver
  }

  listen(state) {
    this.client.save(state)
  }

  get() {
    return this.client.get()
  }
}
