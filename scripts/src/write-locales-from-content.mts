// @ts-ignore
import { createWriteStream, mkdirSync, readdirSync, readFileSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'

const enum PageLocale {
  DE = 'de',
  EN = 'en',
}

const enum CmsTranslationLocaleKey {
  DE = 'value_de',
  EN = 'value_en',
}

interface CmsTranslationEntry {
  key: string
  [CmsTranslationLocaleKey.DE]: string
  [CmsTranslationLocaleKey.EN]: string
}

interface CmsTranslationFile {
  slug: string
  items: Array<CmsTranslationEntry> | undefined
  itemsMarkdown: Array<CmsTranslationEntry> | undefined
  itemsPlural: Array<CmsTranslationEntry> | undefined
}

interface TranslationRegistry {
  [key: string]: string
}

const EXT_NAME = '.json'
const basePath = resolve(process.cwd(), '../')
const sourcePath = join(basePath, 'content/cms')
const outputPath = join(basePath, 'src/generated/locales')

const getFilePathList = (collection: string): Array<string> => {
  const dirPath = join(sourcePath, collection)
  const entryList = readdirSync(dirPath, { withFileTypes: true })

  return entryList
    .filter((entry) => entry.isFile() && extname(entry.name) === EXT_NAME)
    .map((entry) => join(dirPath, entry.name))
}

const getFileContent = (filePath: string): CmsTranslationFile => {
  return JSON.parse(readFileSync(filePath).toString())
}

const writeLocale = (translationRegistry: TranslationRegistry, locale: string) => {
  const stream = createWriteStream(join(outputPath, `${locale}.json`))

  mkdirSync(outputPath, { recursive: true })
  stream.once('open', () => {
    stream.write(JSON.stringify(translationRegistry))
    stream.end()
  })
}

const transformCmsTranslationFile = (
  acc: TranslationRegistry,
  locale: PageLocale,
  { slug, items, itemsMarkdown, itemsPlural }: CmsTranslationFile,
): TranslationRegistry => {
  items?.forEach((item) => (acc[`${slug}.${item.key}`] = item[`value_${locale}`]))
  itemsMarkdown?.forEach((item) => (acc[`MD.${slug}.${item.key}`] = item[`value_${locale}`]))
  itemsPlural?.forEach((item) => (acc[`PL.${slug}.${item.key}`] = item[`value_${locale}`]))
  return acc
}

const writeLocaleFromContent = (locale: PageLocale, collection: string) => {
  const filePathList = getFilePathList(collection)
  const fileContents = filePathList.map((filePath) => getFileContent(filePath))
  const translationRegistry = fileContents.reduce((acc: TranslationRegistry, fileContent) => {
    return transformCmsTranslationFile(acc, locale, fileContent)
  }, {})
  writeLocale(translationRegistry, locale)
}

writeLocaleFromContent(PageLocale.DE, 'translation')
writeLocaleFromContent(PageLocale.EN, 'translation')
