import type { LocationQuery, RouteParams } from 'vue-router'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { StoreId } from '@/models/Store'
import { defineStore } from 'pinia'

const route = reactive({ params: {} as RouteParams, query: {} as LocationQuery })

export const useBootstrapStore = defineStore(StoreId.Bootstrap, () => {
  const { afterEach, currentRoute } = useRouter()

  afterEach(({ params, query }) => {
    route.params = params
    route.query = query
  })

  route.params = currentRoute.value.params
  route.query = currentRoute.value.query

  return {
    route,
  }
})
