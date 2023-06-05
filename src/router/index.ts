import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/story/scene/:scene',
      name: 'scene',
      component: () => import('../views/SceneView.vue'),
    },
    {
      path: '/admin',
      redirect: '/admin/index.html',
    },
  ],
})

export default router

// NAVIGATION GUARDS
// https://vue-i18n.intlify.dev/guide/advanced/lazy.html
//
// router.beforeEach(async (to, from, next) => {
//   const paramsLocale = to.params.locale
//
//   // use locale if paramsLocale is not in SUPPORT_LOCALES
//   if (!SUPPORT_LOCALES.includes(paramsLocale)) {
//     return next(`/${locale}`)
//   }
//
//   // load locale messages
//   if (!i18n.global.availableLocales.includes(paramsLocale)) {
//     await loadLocaleMessages(i18n, paramsLocale)
//   }
//
//   // set i18n language
//   setI18nLanguage(i18n, paramsLocale)
//
//   return next()
// })
