<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-6 text-center lg:px-8 border rounded-xl">
      <div class="mx-auto max-w-2xl">
      </div>
      <ul grade="list"
        class="mx-auto mt-5 mb-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <li v-for="teamUser in teamUsers" :key="teamUser.pseudo">
          <span v-if="!teamUser.avatar" class="inline-block h-56 w-56 overflow-hidden rounded-full bg-gray-100">
            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <img v-else class="mx-auto h-56 w-56 rounded-full" :src="teamUser.avatar" :alt="teamUser.pseudo" />
          <h3 class="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{{ teamUser.pseudo }}</h3>
          <p class="text-sm leading-6 text-gray-600">{{ teamUser.grade }}</p>
          <ul grade="list" class="mt-6 flex justify-center gap-x-6">
            <li>
              <a @click="navigate(teamUser, 'twitter')"
                :class="teamUser.twitter ? 'cursor-pointer' : 'cursor-not-allowed'"
                class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">Twitter</span>
                <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 31.812 26">
                  <path
                    d="M20.877,2.000 C22.519,2.000 24.382,2.652 25.426,3.738 C26.724,3.486 27.949,3.025 29.050,2.386 C28.625,3.687 27.718,4.779 26.540,5.469 C27.693,5.332 28.797,5.035 29.820,4.590 C29.054,5.707 28.087,6.690 26.971,7.477 C26.981,7.715 26.987,7.955 26.987,8.195 C26.987,15.562 21.445,24.000 10.939,24.000 C7.715,24.000 4.507,23.133 1.982,21.551 C2.428,21.605 2.883,21.631 3.343,21.631 C6.019,21.631 8.482,20.740 10.439,19.242 C7.937,19.199 5.827,17.586 5.103,15.373 C5.450,15.437 5.810,15.473 6.178,15.473 C6.696,15.473 7.203,15.406 7.681,15.277 C5.068,14.768 3.100,12.514 3.100,9.813 C3.100,9.787 3.100,9.764 3.100,9.740 C3.871,10.158 4.750,10.410 5.687,10.440 C4.154,9.437 3.147,7.734 3.147,5.799 C3.147,4.777 3.428,3.818 3.919,2.998 C6.735,6.367 10.945,8.588 15.693,8.822 C15.594,8.414 15.543,7.984 15.543,7.553 C15.543,4.473 17.721,2.000 20.877,2.000 M29.820,4.590 L29.825,4.590 M20.877,-0.000 C17.033,-0.000 14.060,2.753 13.614,6.552 C10.425,5.905 7.524,4.204 5.440,1.711 C5.061,1.257 4.503,0.998 3.919,0.998 C3.867,0.998 3.815,1.000 3.763,1.004 C3.123,1.055 2.547,1.413 2.216,1.966 C1.525,3.122 1.159,4.447 1.159,5.799 C1.159,6.700 1.321,7.579 1.625,8.400 C1.300,8.762 1.113,9.238 1.113,9.740 L1.113,9.813 C1.113,11.772 1.882,13.589 3.160,14.952 C3.087,15.294 3.103,15.655 3.215,15.998 C3.657,17.348 4.459,18.510 5.499,19.396 C4.800,19.552 4.079,19.631 3.343,19.631 C2.954,19.631 2.577,19.609 2.222,19.565 C2.141,19.556 2.061,19.551 1.981,19.551 C1.148,19.551 0.391,20.078 0.108,20.886 C-0.202,21.770 0.140,22.753 0.932,23.249 C3.764,25.023 7.318,26.000 10.939,26.000 C17.778,26.000 22.025,22.843 24.383,20.195 C27.243,16.984 28.907,12.718 28.972,8.455 C29.899,7.682 30.717,6.790 31.410,5.792 C31.661,5.458 31.810,5.041 31.810,4.590 C31.810,3.909 31.473,3.308 30.958,2.946 C31.181,2.176 30.925,1.342 30.303,0.833 C29.940,0.537 29.496,0.386 29.049,0.386 C28.708,0.386 28.365,0.474 28.056,0.654 C27.391,1.040 26.680,1.344 25.931,1.562 C24.555,0.592 22.688,-0.000 20.877,-0.000 L20.877,-0.000 Z">
                  </path>
                </svg>
              </a>
            </li>
            <li>
              <a @click="navigate(teamUser, 'esl')" :class="teamUser.esl ? 'cursor-pointer' : 'cursor-not-allowed'"
                class="text-gray-400 hover:text-gray-500">
                <span class="sr-only">ESL</span>
                <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 24 24" grade="img">
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12c0 6.628 5.373 12 12 12s12-5.372 12-12c0-6.627-5.373-12-12-12zm.455 2.163a9.8 9.8 0 0 1 5.789 2.222L4.384 18.244a9.862 9.862 0 0 1-1.06-1.582zm7.191 3.632a9.802 9.802 0 0 1 2.192 5.806l-14.45 9.1a9.834 9.834 0 0 1-1.592-1.055zm1.979 8.292c-.888 4.45-5.619 8.892-11.9 7.494Z">
                  </path>
                </svg>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IUser } from '../types/user.ts';
import { userService } from '../services/user.service.ts';

const teamUsers = ref<IUser[]>([])

onMounted(async () => {
  try {
    const teamUsersData = await userService.getTeamUser();
    teamUsers.value = teamUsersData.teamUsers.sort((a, b) => a.grade.localeCompare(b.grade));
  } catch (error) {
    console.error(error)
  }
})

function navigate(teamUser: IUser, link: string) {
  switch (link) {
    case 'esl':
      if (!teamUser.esl) {
        return;
      }
      window.open(teamUser.esl);
      break;

    case 'twitter':
      if (!teamUser.twitter) {
        return;
      }
      window.open(teamUser.twitter);

      break;

    default:
      break;
  }
}
</script>