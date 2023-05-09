export type TaleJamCollections = {
  tj_stories: TaleJamStory
  tj_scenes: TaleJamScene
}

export type TaleJamStory = {
  date_created: string
  date_updated: string
  id: number
  sort: null | unknown
  status: string
  story_image: null | unknown
  story_name: string
  story_tagline: string
  story_title: string
  story_url: string
  tj_scenes: Array<number>
  user_created: string
  user_updated: string
}

export type TaleJamScene = {
  id: number
  status: string
  sort: null | unknown
  user_created: string
  date_created: string
  user_updated: string
  date_updated: string
  script: string
  scene_name: string
  scene_id: string
  scene_image: string
  scene_storyparent: number
  '360active': boolean
  tj_audio: Array<number>
}

export type TaleJamSceneOverview = Pick<TaleJamScene, 'id' | 'scene_id'>
