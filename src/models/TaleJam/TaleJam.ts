export interface TaleJamCollection {
  id: number
  status: string
  sort: null | unknown
  user_created: string
  date_created: string
  user_updated: string
  date_updated: string
}

export type TaleJamCollections = {
  tj_stories: TaleJamStory
  tj_scenes: TaleJamScene
}

export interface TaleJamStory extends TaleJamCollection {
  story_image: null | unknown
  story_name: string
  story_tagline: string
  story_slug: string
  story_title: string
  tj_scenes: Array<number>
  tj_audio: Array<number>
}

export interface TaleJamScene extends TaleJamCollection {
  scene_image: string
  scene_name: string
  scene_slug: string
  script: string
  tj_story_id: number
  tj_audio: Array<number>
  '360active': boolean
}

export interface TaleJamAudio extends TaleJamCollection {
  audio_file: string
  audio_slug: string
  tj_story_id: number
}

export type TaleJamSceneOverview = Pick<TaleJamScene, 'id' | 'scene_slug'>
export type TaleJamAudioOverview = Pick<TaleJamAudio, 'id' | 'audio_file' | 'audio_slug'>
