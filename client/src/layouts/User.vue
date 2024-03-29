<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Fermer la barre de navigation</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                <div class="flex h-16 shrink-0 items-center">
                  <img class="h-14 w-auto" src="/images/relaxing-hippoquests.png" alt="relaxing hippoquests logo" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="navigation in navigations" :key="navigation.name">
                          <router-link :to="navigation.href"
                            v-if="!navigation.admin || (navigation.admin && isLoggedUserAdmin)"
                            :class="[navigation.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                            <component :is="navigation.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                            {{ navigation.name }}
                          </router-link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-14 w-auto" src="/images/relaxing-hippoquests.png" alt="relaxing hippoquests logo" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="navigation in navigations" :key="navigation.name">
                  <router-link :to="navigation.href" v-if="!navigation.admin || (navigation.admin && isLoggedUserAdmin)"
                    :class="[navigation.current ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800', 'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold']">
                    <component :is="navigation.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ navigation.name }}
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="-mx-6 mt-auto">
              <a href="#"
                class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800">
                <span v-if="!userInformations.avatar"
                  class="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                  <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <img v-else class="h-8 w-8 rounded-full bg-gray-800" :src="userInformations.avatar"
                  :alt="userInformations.pseudo" />
                <span class="sr-only">Votre profil</span>
                <span aria-hidden="true">{{ userInformations.pseudo }}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
      <button type="button" class="-m-2.5 p-2.5 text-gray-400 lg:hidden" @click="sidebarOpen = true">
        <span class="sr-only">Ouvrir la barre de navigation</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-white">
        {{ handleNavigationActiveName?.name }}
      </div>
      <a href="#">
        <span class="sr-only">Votre profil</span>
        <span v-if="!userInformations.avatar" class="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
          <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
        <img v-else class="h-8 w-8 rounded-full bg-gray-800" :src="userInformations.avatar"
          :alt="userInformations.pseudo" />
      </a>
    </div>

    <div class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8">
        <slot name="connected-area"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
  PencilIcon,
} from '@heroicons/vue/24/outline'
import { useRoute } from 'vue-router';
import { useAuthStore } from '../store/auth';
const route = useRoute()
const authStore = useAuthStore()

const navigations = ref([
  { name: 'Tableau de bord', href: '/tableau-de-bord', icon: HomeIcon, current: false, admin: false },
  { name: 'Mes articles', href: '/mes-articles', icon: PencilIcon, current: false, admin: true },
  { name: 'Retour vers le site', href: '/', icon: ArrowLeftStartOnRectangleIcon, current: false, admin: false },
])

const sidebarOpen = ref(false)

function handleActiveLink() {
  navigations.value.forEach((link) => {
    link.current = link.href === route.path
  })
}

const handleNavigationActiveName = computed(() => {
  return navigations.value.find((link) => link.current)
})

const isLoggedUserAdmin = computed(() => {
  return authStore.isAdmin
})

const userInformations = computed(() => {
  return authStore.getUserInformations
})
onMounted(() => {
  handleActiveLink()
})

watch(route, () => {
  handleActiveLink()
})

</script>