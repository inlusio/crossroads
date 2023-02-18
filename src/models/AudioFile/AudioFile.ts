export interface AudioFileContent {
  id: string
  file: string
}

export type AudioFileContentList = Array<AudioFileContent>
export type AudioFileContentDict = Record<string, AudioFileContent>
