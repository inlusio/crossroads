import { basename } from 'node:path'

export default function useViteGlobUtils() {
  type ReturnModule<TReturnContent> = TReturnContent
  type ReturnPromiseFn<TReturnContent> = () => Promise<TReturnContent>

  type ReturnData<TReturnContent, TEager extends boolean> = TEager extends true
    ? ReturnModule<TReturnContent>
    : ReturnPromiseFn<TReturnContent>
  type ReturnType<TReturnContent, TEager extends boolean> = Record<string, ReturnData<TReturnContent, TEager>>

  const mapToIds = <TContent, TEager extends boolean = false>(
    modules: ReturnType<TContent, TEager>,
    ext: string,
  ): ReturnType<TContent, TEager> => {
    const converted = Object.entries(modules).map(([key, value]): [string, ReturnData<TContent, TEager>] => {
      return [basename(key, ext), value]
    })

    return Object.fromEntries(converted)
  }

  // path.basename('/foo/bar/baz/asdf/quux.html', '.html');

  return { mapToIds }
}
