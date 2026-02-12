import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    // Dummy widget data to simulate the Bento Grid layout
    widgets: [
      // Example widgets mapping to conceptual sizes (e.g., on a 12-col grid, 3 cols = 1 unit)
      { id: 'ls', component: 'LiveStandings', cols: 6, rows: 2, order: 1 },    // Conceptual 2x2
      { id: 'mh', component: 'MatchHero', cols: 6, rows: 2, order: 2 },       // Conceptual 2x2
      { id: 'hc', component: 'H2HComparison', cols: 6, rows: 1, order: 3 },   // Conceptual 2x1
      { id: 'nt', component: 'NewsTicker', cols: 6, rows: 1, order: 4 },      // Conceptual 2x1
      { id: 'ad1', component: 'NewsTicker', cols: 3, rows: 1, order: 5 },     // Conceptual 1x1 (reusing NewsTicker for now)
      { id: 'ad2', component: 'NewsTicker', cols: 3, rows: 1, order: 6 },     // Conceptual 1x1 (reusing NewsTicker for now)
    ],
  }),
  getters: {
    getWidgets: (state) => state.widgets,
  },
});

