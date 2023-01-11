export type DialogVariableStorage = Record<string, string>

export interface DialogVariableStorageHandler {
  get(key: string): string
  set(key: string, value: string): void
}
