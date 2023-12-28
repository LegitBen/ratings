import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/components/pages/Home.vue'
import EditCinema from '@/components/pages/EditCinema.vue'
import CinemaDetails from '@/components/pages/CinemaDetails.vue'
import CreateCinema from '@/components/pages/CreateCinema.vue'
import RatingFilms from '@/components/pages/RatingFilms.vue'
import SettingsPage from '@/components/pages/SettingsPage.vue'
import GroupCinema from '@/components/pages/GroupCinema.vue'
import { RouteNames } from '@/router/routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: RouteNames.HOME,
    component: HomePage
  },
  {
    path: '/cinema/create',
    name: RouteNames.CREATE_CINEMA,
    component: CreateCinema
  },
  {
    path: '/cinema/rating',
    name: RouteNames.RATING_FILMS,
    component: RatingFilms
  },
  {
    path: '/cinema/group_cinema',
    name: RouteNames.GROUP_CINEMA,
    component: GroupCinema
  },
  {
    path: '/settings',
    name: RouteNames.SETTINGS,
    component: SettingsPage
  },
  {
    path: '/cinema/:id',
    name: RouteNames.CINEMA_DETAILS,
    component: CinemaDetails
  },
  {
    path: '/cinema/:id/edit',
    name: RouteNames.EDIT_CINEMA,
    component: EditCinema
  },
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})

export default router
