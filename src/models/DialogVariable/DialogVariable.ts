export type DialogVariableStorage = Record<string, string>

export interface DialogVariableStorageHandler {
  get: (key: string) => string | boolean | number | undefined
  set: (key: string, value: string | boolean | number) => void
}
