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
}
