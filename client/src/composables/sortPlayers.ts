import { computed, ref } from "vue";

interface Player {
  id: string;
  rank: number;
  battletag: string;
  victory: number;
  defeat: number;
}

const playersList = ref<Player[]>([]);

const arrowrank = ref({
  isArrowNotSelected: false,
  isArrowDown: true,
});
const arrowbattletag = ref({
  isArrowNotSelected: true,
  isArrowDown: false,
});
const arrowVictory = ref({
  isArrowNotSelected: true,
  isArrowDown: false,
});
const arrowDefeat = ref({
  isArrowNotSelected: true,
  isArrowDown: false,
});
const arrowRankDirection = computed(() => ({
  down: arrowrank.value.isArrowDown,
  up: !arrowrank.value.isArrowDown,
  none: arrowrank.value.isArrowNotSelected,
}));
const arrowBattletagDirection = computed(() => ({
  down: arrowbattletag.value.isArrowDown,
  up: !arrowbattletag.value.isArrowDown,
  none: arrowbattletag.value.isArrowNotSelected,
}));
const arrowVictoryDirection = computed(() => ({
  down: arrowVictory.value.isArrowDown,
  up: !arrowVictory.value.isArrowDown,
  none: arrowVictory.value.isArrowNotSelected,
}));
const arrowDefeatDirection = computed(() => ({
  down: arrowDefeat.value.isArrowDown,
  up: !arrowDefeat.value.isArrowDown,
  none: arrowDefeat.value.isArrowNotSelected,
}));
export function useSortPlayers() {
  function switchTableHeader(tableHeaderName: string) {
    switch (tableHeaderName) {
      case "rank":
        arrowrank.value.isArrowNotSelected = false;
        arrowbattletag.value.isArrowNotSelected = true;
        arrowVictory.value.isArrowNotSelected = true;
        arrowDefeat.value.isArrowNotSelected = true;
        arrowrank.value.isArrowDown = !arrowrank.value.isArrowDown;
        break;

      case "battletag":
        arrowbattletag.value.isArrowNotSelected = false;
        arrowrank.value.isArrowNotSelected = true;
        arrowVictory.value.isArrowNotSelected = true;
        arrowDefeat.value.isArrowNotSelected = true;
        arrowbattletag.value.isArrowDown = !arrowbattletag.value.isArrowDown;
        break;

      case "victory":
        arrowVictory.value.isArrowNotSelected = false;
        arrowrank.value.isArrowNotSelected = true;
        arrowbattletag.value.isArrowNotSelected = true;
        arrowDefeat.value.isArrowNotSelected = true;
        arrowVictory.value.isArrowDown = !arrowVictory.value.isArrowDown;
        break;

      case "defeat":
        arrowDefeat.value.isArrowNotSelected = false;
        arrowrank.value.isArrowNotSelected = true;
        arrowbattletag.value.isArrowNotSelected = true;
        arrowVictory.value.isArrowNotSelected = true;
        arrowDefeat.value.isArrowDown = !arrowDefeat.value.isArrowDown;
        break;

      default:
        break;
    }
  }

  function sortPlayers(column: string) {
    switch (column) {
      case "rank":
        if (arrowRankDirection.value.down) {
          playersList.value.sort((a, b) => {
            return a.rank - b.rank;
          });
        } else {
          playersList.value.sort((a, b) => {
            return b.rank - a.rank;
          });
        }
        break;

      case "battletag":
        if (arrowBattletagDirection.value.down) {
          playersList.value.sort((a, b) => {
            return a.battletag.localeCompare(b.battletag);
          });
        } else {
          playersList.value.sort((a, b) => {
            return b.battletag.localeCompare(a.battletag);
          });
        }
        break;

      case "victory":
        if (arrowVictoryDirection.value.down) {
          playersList.value.sort((a, b) => {
            return a.victory - b.victory;
          });
        } else {
          playersList.value.sort((a, b) => {
            return b.victory - a.victory;
          });
        }
        break;

      case "defeat":
        if (arrowDefeatDirection.value.down) {
          playersList.value.sort((a, b) => {
            return a.defeat - b.defeat;
          });
        } else {
          playersList.value.sort((a, b) => {
            return b.defeat - a.defeat;
          });
        }

        break;
      default:
        break;
    }
  }

  return {
    playersList,
    sortPlayers,
    arrowRankDirection,
    arrowBattletagDirection,
    arrowVictoryDirection,
    arrowDefeatDirection,
    switchTableHeader,
  };
}
