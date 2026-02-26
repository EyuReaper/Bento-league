import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    widgets: [
      { id: 'll',   component: 'LeagueLogo',           gridArea: 'span 2 / span 3',  order: 1 },
      { id: 'nt',   component: 'NewsTicker',           gridArea: 'span 2 / span 6',  order: 2 },
      { id: 'ls',   component: 'LiveStandings',        gridArea: 'span 6 / span 3',  order: 3 },
      { id: 'tm',   component: 'TransferMarket',       gridArea: 'span 4 / span 3',  order: 4 },
      { id: 'mh',   component: 'MatchHero',            gridArea: 'span 3 / span 3',  order: 5 },
      { id: 'pr',   component: 'Predictions',          gridArea: 'span 3 / span 3',  order: 12 },
      { id: 'ir',   component: 'InjuryReport',         gridArea: 'span 3 / span 3',  order: 13 },
      { id: 'ns',   component: 'NewsSource',           gridArea: 'span 1 / span 3',  order: 6 },
      { id: 'cng',  component: 'CurrentMatchNextGame', gridArea: 'span 2 / span 3',  order: 7 },
      { id: 'potw', component: 'PlayerOfTheWeek',      gridArea: 'span 2 / span 3',  order: 8 },
      { id: 'hc',   component: 'H2HComparison',        gridArea: 'span 3 / span 3',  order: 9 },
      { id: 'totw', component: 'TeamOfTheWeek',        gridArea: 'span 4 / span 6',  order: 10 },
      { id: 'gsv',  component: 'GraphicalSeasonView',  gridArea: 'span 4 / span 6',  order: 14 },
      { id: 'ad',   component: 'AdPlacement',          gridArea: 'span 1 / span 12', order: 11 },
    ],
  }),
  getters: {
    getWidgets: (state) => state.widgets,
  },
});