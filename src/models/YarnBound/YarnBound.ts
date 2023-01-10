export interface YarnBoundOptions {
  dialogue: string
  startAt?: string
  functions?: Record<string, (...args: Array<unknown>) => unknown>
  variableStorage?: unknown
  handleCommand?: (...args: Array<unknown>) => unknown
  combineTextAndOptionsResults?: boolean
  locale?: string
}
