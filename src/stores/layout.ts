import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    widgets: [
      // === Top hero section – most prominent ===
            { id: 'mh',   component: 'MatchHero',              gridArea: '20 / 11/ span 10 / span 28',    order: 1 },
      
            // === Very important live information – next row ===
            { id: 'ls',   component: 'LiveStandings',          gridArea: '1 / 80/ span 55 / span 20',   order: 2 },
            { id: 'cng',  component: 'CurrentMatchNextGame',   gridArea: '25 / 60 / span 10 / span 18',    order: 3 },
      
            // === Full-width dynamic element ===
            { id: 'nt',   component: 'NewsTicker',             gridArea: '1 / 3/ span 20 / span 90',    order: 4 },
      
            // === Medium + smaller complementary cards ===
            { id: 'hc',   component: 'H2HComparison',          gridArea: '30 / 10 / span 28 / span 28',    order: 5 },
            { id: 'potw', component: 'PlayerOfTheWeek',        gridArea: '1 / 1 / span 18 / span 28',    order: 6 },
            { id: 'tm',   component: 'TransferMarket',         gridArea: '20 / 1 / span 38 / span 28',    order: 7 },
      
            // === Small accent / utility blocks ===
            { id: 'll',   component: 'LeagueLogo',             gridArea: '20 / 40 / span 18 / span 18',    order: 8  },
            { id: 'gsv',  component: 'GraphicalSeasonView',    gridArea: '38 / 60 / span 20 / span 35',    order: 9 },
            { id: 'ns',   component: 'NewsSource',             gridArea: '20 / 27 / span 10 / span 18',    order: 10 },
      
            // === Advertisement – always last ===
            { id: 'ad',   component: 'AdPlacement',            gridArea: '45 / 1 / span 15 / span 78',    order: 11 },    ],  }),
  getters: {
    getWidgets: (state) => state.widgets,
  },
});