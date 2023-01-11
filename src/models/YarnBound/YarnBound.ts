export interface YarnBoundOptions {
  dialogue: string
  startAt?: string
  // Functions that I can provide to use in Yarn files
  functions?: Record<string, (...args: Array<unknown>) => unknown>
  // A custom variable storage that has enhanced functionality (f.ex. localstorage)
  variableStorage?: unknown
  // A command that is executed in the Yarn file and handled in the frontend code
  handleCommand?: (...args: Array<unknown>) => unknown
  combineTextAndOptionsResults?: boolean
  locale?: string
}
