import type { RouteLocation, RouteRecord } from 'vue-router'
import { useBootstrapStore } from '@/stores/Bootstrap'
import { useRouter } from 'vue-router'
import type { RouteRecordAsName } from '@/models/RouteRecord/RouteRecord'
import { computed } from 'vue'
import { RouteRecordParam } from '@/models/RouteRecord/RouteRecord'

export default function useRouteRecord() {
  const bootstrapStore = useBootstrapStore()
  const router = useRouter()

  const toRoute = (targetRoute: RouteRecordAsName): RouteRecord => {
    const routeRecords = router.getRoutes()

    return <RouteRecord>{
      ...routeRecords.find(({ name }) => name === targetRoute.name),
      params: targetRoute.params,
    }
  }

  const resolveRoute = (routeRecord: RouteRecord): RouteLocation => {
    return router.resolve(routeRecord)
  }

  const sceneParam = computed<string | undefined>(() => {
    return bootstrapStore.route.params[RouteRecordParam.Scene] as string | undefined
  })

  return {
    sceneParam,
    toRoute,
    resolveRoute,
  }
}
