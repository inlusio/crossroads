import type { RouteParams } from 'vue-router'

export enum RouteRecordId {
  Home = 'home',
  Scene = 'scene',
}

export interface RouteRecordAsName {
  name: RouteRecordId
  params?: RouteParams
  redirect?: RouteRecordAsName
}

export const enum RouteRecordParam {
  Scene = 'scene',
}
