import { basename } from 'node:path'

export default function useViteGlobUtils() {
  type ReturnType<TReturnContent> = Record<string, () => Promise<TReturnContent & { default: TReturnContent }>>

  const mapToIds = <TContent>(modules: Record<string, () => Promise<TContent>>, ext: string): ReturnType<TContent> => {
    const converted = Object.entries(modules).map(([key, value]) => {
      return [basename(key, ext), value]
    })

    return Object.fromEntries(converted)
  }

  // path.basename('/foo/bar/baz/asdf/quux.html', '.html');

  return { mapToIds }
}
